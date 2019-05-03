import * as React from 'react';
import './Header.css'

export interface HeaderProps {
  title: string,
  tagline: string
}

export default (props: HeaderProps) => {
  return (
    <header>
      <h1>{props.title}</h1>
      <h2>{props.tagline}</h2>
    </header>
  );
}