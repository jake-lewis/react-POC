import * as React from 'react';
import MapPoint from './MapPoint';
import * as leaflet from 'leaflet';
import './Map.css';
import '../../../node_modules/leaflet/dist/leaflet.css'

const mapImage = require('../../images/metrunui.png');

export default class Map extends React.Component {

  componentDidMount() {
    const map = leaflet.map('map', {
      crs: leaflet.CRS.Simple
    });
    console.log(mapImage);
    const bounds = new leaflet.LatLngBounds([[0, 0], [1522, 780]]);
    const image = leaflet.imageOverlay(mapImage, bounds).addTo(map);
    map.fitBounds(bounds);
  }

  render() {
    return (
      <div className="mapContainer" >
        <div className='map' id='map'>
          {/* <MapPoint x={54} y={24} hovertext='blarg' onClick={() => console.log('clicked')} />
          <MapPoint x={33} y={63} hovertext='blarg2' onClick={() => console.log('clicked')} /> */}
        </div>
      </div>
    );
  }
}