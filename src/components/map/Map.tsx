import * as React from 'react';
import * as leaflet from 'leaflet';
import './Map.css';
import '../../../node_modules/leaflet/dist/leaflet.css'

const mapImage = require('../../images/metrunui.png');

export default class Map extends React.PureComponent {

  componentDidMount() {
    const mapElement = document.getElementById('map');
    if (mapElement)
    {
      const map = leaflet.map(mapElement, {
        crs: leaflet.CRS.Simple
      });
      const heightRatio = Math.ceil(1522 / mapElement.clientHeight);
      const widthRatio = Math.ceil(780 / mapElement.clientWidth);
      const ratio = Math.max(heightRatio, widthRatio);

      const bounds = new leaflet.LatLngBounds([[0, 0], [1522/ratio, 780/ratio]]);
      const image = leaflet.imageOverlay(mapImage, bounds).addTo(map);
      map.fitBounds(bounds);
      map.setMaxZoom(2);
    }

  }

  render() {
    return (
      <div className="mapContainer" >
        <div className='map' id='map' />
      </div>
    );
  }
}
