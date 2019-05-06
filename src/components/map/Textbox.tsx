import * as React from 'react';
import './Textbox.css';

export interface TextboxProps {
    readonly text?: string
}

interface TextboxState {
    text?: string
}

export default class Textbox extends React.Component<TextboxProps, TextboxState> {

    public readonly state: TextboxState = {
        text: this.props.text || ''
    };

    public setText(text: string) {
        this.setState({text});
    }

    render() {
        return (
            <div className='textBox'>
                {this.state.text}
            </div>
        );
    }
}
