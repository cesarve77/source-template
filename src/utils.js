/**
 * Created by cesar on 21/3/18.
 */
import doctrine from "doctrine"
import SimpleSchema from 'simpl-schema'
import Handlebars from 'handlebars'


const getOnlyComments = (template) => {
    return template.match(/\/\*\*[\s\S]+?\*\//g) || []
}
export const removeComments = (template) => {
    return template.replace(/\/\*\*[\s\S]+?\*\/\n?/g, '')
}
const buildSchemaObjFromHandlebarAST = (program, prefix = '') => {
    let obj = {}
    if (prefix) prefix = prefix + '.'
    program.body.forEach((statement) => {
        if (statement.type === 'MustacheStatement') {
            obj[prefix + statement.path.original] = {type: String}
        }
        if (statement.type === 'BlockStatement' && statement.path.original === 'each') {
            obj[prefix + statement.params[0].original] = {type: Array}
            obj[prefix + statement.params[0].original + '.$'] = {type: Object}
            obj = {...obj, ...buildSchemaObjFromHandlebarAST(statement.program, statement.params[0].original + '.$')}
        }
        if (statement.type === 'BlockStatement' && statement.path.original === 'if') {
            obj[prefix + statement.params[0].original] = Boolean
        }
    })
    return obj
}

const getType = (type) => {
    if (!type) return String
    type = type.toLowerCase()
    switch (type) {
        case 'string':
            return String

        case 'boolean':
            return Boolean

        case 'number':
            return Number

        case 'object':
            return Object

        case 'array':
            return Array
        default:
            return String
    }
}
const improveSchemaObjFromDoctrine = (schemaObj, template) => {
    const onlyComments = getOnlyComments(template)
    onlyComments.forEach((comment) => {
        const ast = doctrine.parse(comment, {
            recoverable: true,
            sloppy: true,
            unwrap: true,
        })
        ast.tags.forEach((tag) => {
            const optional = tag.type.type === 'OptionalType'
            const name = tag.name.replace(/\[\]/gi, '.$')
            schemaObj[name].optional = optional

            if (tag.type.type === 'UnionType') {
                const allowedValues = tag.type.elements.map((ele) => ele.value)
                schemaObj[name].allowedValues = allowedValues
                schemaObj[name].defaultValue = allowedValues[0]
            }
            let type = schemaObj[name].type
            if (type !== Array) {
                type = getType(tag.type.name || tag.type.expression && tag.type.expression.name)
            } else {
                if (!optional) {
                    schemaObj[name].minCount = 1
                }
            }
            schemaObj[name].type = type
            schemaObj[name].label = tag.description

        })
    })
}

export const solveTemplate = (template, data) => {
    return Handlebars.compile(template)(data)
}

export const getSchema = (template) => {
    const ast = Handlebars.parse(template);
    const schemaObj = buildSchemaObjFromHandlebarAST(ast)
    improveSchemaObjFromDoctrine(schemaObj, template)
    return new SimpleSchema(schemaObj)

}

const fallbackCopyTextToClipboard = (text) => {
    return new Promise((resolve, reject) => {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.height = '0'
        textArea.style.width = '0'
        textArea.style.position = 'absolute'
        textArea.style.top = '-100000px'
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            const successful = document.execCommand('copy');
            resolve()
        } catch (err) {
            reject(err)
        }
        document.body.removeChild(textArea);

    })

}
export const copyTextToClipboard = (text) => {
    if (!navigator.clipboard) {
        return fallbackCopyTextToClipboard(text);
    }
    return navigator.clipboard.writeText(text)
}