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
      <button className='navButton'>
        <a href={this.props.href}>{this.props.text}</a>
      </button>
    );
  }
}