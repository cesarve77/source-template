/**
 * Created by cesar on 21/3/18.
 */
let uniforms
let _style


try {

    uniforms = require('uniforms-semantic')
    _style = 'semantic'
} catch (e) {
}
try {
    uniforms = require('uniforms-material')
    _style = 'material'
} catch (e) {
}
try {
    uniforms = require('uniforms-bootstrap4')
    _style = 'bootstrap4'
} catch (e) {
}
try {
    uniforms = require('uniforms-bootstrap3')
    _style = 'bootstrap3'
} catch (e) {
}
try {
    uniforms = require('uniforms-antd')
    _style = 'antd'
} catch (e) {
}


if (!uniforms) {
    console.error("Install one of this npm pacakage 'uniforms-antd' , 'uniforms-bootstrap3' , 'uniforms-bootstrap4' , 'uniforms-material' , 'uniforms-semantic'")
}
export const style = _style
export const AutoForm = uniforms.AutoForm
export const ErrorsField = uniforms.ErrorsField
export const AutoFields = uniforms.AutoFields
export const ListField = uniforms.ListField
