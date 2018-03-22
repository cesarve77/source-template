import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {AutoForm, AutoFields, ErrorsField} from "./AutoForm";
import {Wrapper, Button} from './StyledComponets'
import AceEditor from 'react-ace'
import 'brace/mode/javascript';
import 'brace/theme/github';
import {copyTextToClipboard, getSchema, removeComments, solveTemplate} from "./utils";


class SourceTemplate extends Component {
    constructor(props) {
        super(props)
        this.code = this.getCode(props.data)
    }

    state = {userData: this.props.userData, template: this.props.template, showForm: false, editTemplate: !this.props.data}

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
    onSubmit = (userData) => {
        const {onUserData} = this.props
        onUserData && onUserData(userData)
        return Promise.resolve(this.getCode(userData))
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
        const {template, userData} = this.state
        return (
            <Wrapper onCopy={this.onCopy} onDownload={this.onDownload} onClose={this.hideForm}>
                <AutoForm
                    ref={form => this.form = form}
                    schema={getSchema(template)}
                    model={{userData}}
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
        const {onChange} = this.props
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
        const {data, ...props} = this.props
        delete props.template
        delete props.userData
        return (
            <div style={{height: props.height, width: props.width}}>
                <AceEditor
                    style={{display: `${!showForm && !editTemplate ? '' : 'none'}`}}
                    onChange={this.onChange}
                    editorProps={{$blockScrolling: true}}
                    {...props}
                    readOnly
                    value={this.code}
                    onCopy={this.captureCopy}
                />
                <AceEditor
                    style={{display: `${!showForm && editTemplate ? '' : 'none'}`}}
                    onChange={this.onChange}
                    editorProps={{$blockScrolling: true}}
                    {...props}
                    value={template}
                />
                <br/>
                {!showForm && !editTemplate && <Button onClick={() => this.setState({editTemplate: true})}>Edit template</Button>}
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
        userData: PropTypes.object,


    }
}

export default SourceTemplate
