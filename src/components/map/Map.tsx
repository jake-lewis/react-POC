import * as React from 'react';
import * as leaflet from 'leaflet';
import './Map.css';
import '../../../node_modules/leaflet/dist/leaflet.css'

const mapImage = require('../../images/metrunui.png');

export default class Map extends React.PureComponent {

  componentDidMount() {
    const map = leaflet.map('map', {
      crs: leaflet.CRS.Simple
    });
    const bounds = new leaflet.LatLngBounds([[0, 0], [1522/2, 780/2]]);
    const image = leaflet.imageOverlay(mapImage, bounds).addTo(map);
    map.fitBounds(bounds);
    map.setMaxZoom(2);
  }

  render() {
    return (
      <div className="mapContainer" >
        <div className='map' id='map' />
      </div>
    );
  }
}
