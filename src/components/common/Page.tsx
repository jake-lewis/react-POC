import * as React from 'react';
import Header from './Header';
import Footer from './Footer';

export interface PageProps {
  title: string,
  tagline: string,
  children: JSX.Element[] | JSX.Element
}

export default (props: PageProps) => {
  return (
    <div>
      <Header title={props.title} tagline={props.tagline} />
      {props.children}
      <Footer />
    </div>
  );
}