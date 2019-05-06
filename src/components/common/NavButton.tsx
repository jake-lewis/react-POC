import * as React from 'react';
import './NavButton.css'

export interface NavButtonProps {
    text: string;
    href: string;
}

export default class NavButton extends React.Component<NavButtonProps> {
    constructor(props: NavButtonProps) {
        super(props);
    }

    render() {
        return (
            <a href={this.props.href}>
                <button className='navButton'>
                    {this.props.text}
                </button>
            </a>
        );
    }
}
