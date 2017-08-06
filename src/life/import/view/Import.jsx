import React from "react";
import cls from "classnames";

import { Dialog } from "../../../components/Dialog.jsx";
import { Button } from "../../../components/Button.jsx";
import { Icon, GLYPHS } from "../../../components/Icon.jsx";

import "./Import.scss"

export function Import({ error, importFile, importFromString }) {
    let directInput;
    let uploadInput;

    function handleImportClick() {
        const files = uploadInput.files;
        const pattern = directInput.value;

        if (files.length) {
            importFile(files[0]);
        } else if (pattern) {
            importFromString(pattern);
        }
    }

    return (
        <div className="import">
            <Dialog className="import-dialog">
                <Dialog.Title>Import pattern</Dialog.Title>
                <Dialog.Body>
                    { error && <ErrorMessage>{ error }</ErrorMessage> }
                    <Section className="direct-input">
                        <label>Enter a pattern to import:</label>
                        <textarea ref={ input => directInput = input } />
                    </Section>

                    <Divider />

                    <Section className="upload">
                        <UploadInput ref={ input => uploadInput = input } />
                    </Section>
                </Dialog.Body>
                <Dialog.Footer>
                    <Button label="Import" onClick={ handleImportClick } />
                </Dialog.Footer>
            </Dialog>
        </div>
    );
}

const ErrorMessage = ({ children }) => (
    <div className="error-msg">
        <Icon glyph={ GLYPHS.ALERT_OCTAGON } />
        { children }
    </div>
);

const Divider = () => (
    <div className="divider">
        <span className="spacer" />
        <span className="text">or</span>
        <span className="spacer" />
    </div>
);

const Section = ({ className, children}) => (
    <div className={ cls("section", className) }>{ children }</div>
);

class UploadInput extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            files: []
        };

        this.input = null;

        this.onInputChange = () => {
            const files = Array.from(this.input.files);

            this.setState({ files });
        };
    }

    get files() {
        return this.state.files;
    }

    componentDidMount() {
        this.input.addEventListener("change", this.onInputChange);
    }

    componentWillUnmount() {
        this.input.removeEventListener("change", this.onInputChange);
    }

    render() {
        const { files }= this.state;
        const label = files.length
            ? Array.from(files).map(f => f.name).join(" ")
            : "Choose a file";

        return (
            <div className="upload-input">
                <input type="file" id="upload-input" name="file" ref={ (el) => this.input = el } />
                <Button
                    theme={ Button.Theme.GREEN }
                    className="size-xl"
                    tagName="label"
                    htmlFor="upload-input"
                    icon={ GLYPHS.CLOUD_UPLOAD }
                    label={ label }
                />
            </div>
        );
    }
}