import * as React from 'react';
import Page from '../common/Page'
import Map from './Map'
import "./MapPage.css"

export default () => {
  return (
    <Page title='PROJECT SHADE' tagline='A Digital "Enhancement" for Doronai Nui'>
      <Map />
      <div></div>
    </Page>
  );
}