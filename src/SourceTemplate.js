import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {AutoForm, AutoFields, ErrorsField} from "./AutoForm";
import {Wrapper, Button} from './StyledComponets'
import AceEditor from 'react-ace'
import 'brace/mode/javascript';
import 'brace/theme/github';
import {copyTextToClipboard, getSchema, removeComments, solveTemplate} from "./utils";


class SourceTemplate extends Component {

    state = {data: this.props.data, template: this.props.template, showForm: false, editTemplate: !this.props.data}

    componentWillReceiveProps(nextProps) {
        const {userData} = nextProps
        if (userData) {
            this.setState({userData})
        }
    }

    getCode = (data) => {
        return solveTemplate(this.state.template, data)
    }

    onCopy = () => {
        this.output = 'copy'
        this.form.submit()
    }
    onDownload = () => {
        this.output = 'download'
        this.form.submit()
    }
    onSubmit = (data) => {
        const {onDataChange} = this.props
        onDataChange && onDataChange(data)
        return Promise.resolve(this.getCode())
    }
    onSubmitSuccess = (sourceCode) => {

        if (this.output === 'download') {
            const element = document.createElement('a');
            element.setAttribute('href', 'data:text/text;charset=utf-8,' + encodeURI(removeComments(sourceCode)));
            element.setAttribute('download', this.props.name);
            element.click();
        } else {
            copyTextToClipboard(removeComments(sourceCode)).then(() => console.log('copied')).catch((err) => console.error(err))
        }
        this.hideForm()


    }
    hideForm = () => {
        this.setState({showForm: false})
    }
    autoForm = () => {
        const {template, data} = this.state
        return (
            <Wrapper onCopy={this.onCopy} onDownload={this.onDownload} onClose={this.hideForm}>
                <AutoForm
                    ref={form => this.form = form}
                    schema={getSchema(template)}
                    model={{data}}
                    onSubmit={this.onSubmit}
                    onSubmitSuccess={this.onSubmitSuccess}
                >
                    <AutoFields />
                    <ErrorsField/>
                    <br/>

                </AutoForm>
            </Wrapper>
        )
    }

    onChange = (template, e) => {
        this.setState({template})
        const {onDataChange, onChange} = this.props
        onDataChange && onDataChange(template, e)
        onChange && onChange(template, e)
    }
    captureCopy = (copied) => {
        if (copied.length === this.code.length) this.showForm()
    }
    showForm = () => {
        this.setState({showForm: true})
    }

    render() {
        const {template, showForm, editTemplate} = this.state
        const {data, allowEdit, ...props} = this.props
        delete props.template
        delete props.onDataChange
        delete props.onTemplateChange
        return (
            <div style={{height: props.height, width: props.width}}>
                <AceEditor
                    style={{display: `${!showForm && !editTemplate ? '' : 'none'}`}}
                    editorProps={{$blockScrolling: true}}
                    {...props}
                    onChange={this.onChange}
                    readOnly
                    value={this.getCode(data)}
                    onCopy={this.captureCopy}
                />
                {allowEdit && <AceEditor
                    style={{display: `${!showForm && editTemplate ? '' : 'none'}`}}
                    onChange={this.onChange}
                    editorProps={{$blockScrolling: true}}
                    {...props}
                    value={template}
                />}
                <br/>
                {allowEdit && !showForm && !editTemplate && <Button onClick={() => this.setState({editTemplate: true})}>Edit template</Button>}
                {!showForm && editTemplate && <Button onClick={() => this.setState({editTemplate: false})}>Show code</Button>}
                {!showForm && <Button onClick={this.showForm}>Get code</Button>}
                {showForm && this.autoForm()}
            </div>

        )
    }

    static defaultProps = {
        name: 'file.js',
        mode: "javascript",
        theme: "github",
        allowEdit: true,
        fontSize: 14,
        showPrintMargin: true,
        showGutter: true,
        highlightActiveLine: true,
        height: '500px',
        width: '100%'
    }
    static propTypes = {
        template: PropTypes.string.isRequired,
        data: PropTypes.object,
        onDataChange: PropTypes.func,
        onTemplateChange: PropTypes.func,
        allowEdit: PropTypes.bool,

    }
}

export default SourceTemplate
