/**
 * Created by cesar on 21/3/18.
 */
import React from 'react';
import {style} from './AutoForm'


export let Wrapper, Button


if (style === 'semantic') {
    Button = ({children, onClick}) => <button type="button" className="ui button" onClick={onClick}>{children}</button>
}

if (style === 'bootstrap3') {
    Button = ({children, onClick}) => <button type="button" className="btn btn-default" onClick={onClick}>{children}</button>
}
if (style === 'bootstrap4') {
    Button = ({children, onClick}) => <button type="button" className="btn btn-default" onClick={onClick}>{children}</button>
}

if (style === 'material') {
    const FlatButton = require('material-ui').FlatButton
    Button = ({children, onClick}) => <FlatButton label={children} onClick={onClick}/>
}

if (style === 'antd') {
    Button = require('antd').Button
}

Wrapper = ({children, onCopy, onDownload, onClose}) => {
    return (
        <div>
            {children}
            <Button onClick={onClose}>Dismiss</Button>
            <Button onClick={onCopy}>Copy</Button>
            <Button onClick={onDownload}>Download</Button>
        </div>)
}


