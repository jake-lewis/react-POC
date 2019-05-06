import * as React from 'react';
import Page from '../common/Page'
import Map from './Map'
import "./MapPage.css"
import Textbox from "./Textbox";
import MapPoint from "./MapPoint";

const mapImage = require('../../images/metrunui.png');
const desc = require('./markerData.json') as markerData[];

interface markerData {
    x: number,
    y: number,
    hovertext: string,
    desc: string
}

export default () => {
    const mapPoints = desc.map(point => new MapPoint({
        x: point.x,
        y: point.y,
        hovertext: point.hovertext,
        onClick: () => {
            document.getElementsByClassName('textBox')[0].innerHTML = point.desc;
        }
    }));

    return (
    <Page title='PROJECT SHADE' tagline='A Digital "Enhancement" for Doronai Nui'>
        <Map imageUrl={mapImage} mapPoints={mapPoints} />
        <Textbox/>
    </Page>
  );
}
