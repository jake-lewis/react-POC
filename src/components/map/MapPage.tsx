import * as React from 'react';
import Page from '../common/Page'
import Map from './Map'
import "./MapPage.css"
import Textbox from "./Textbox";

const mapImage = require('../../images/metrunui.png');

export default () => {
  return (
    <Page title='PROJECT SHADE' tagline='A Digital "Enhancement" for Doronai Nui'>
      <Map imageUrl={mapImage} />
      <Textbox />
    </Page>
  );
}
