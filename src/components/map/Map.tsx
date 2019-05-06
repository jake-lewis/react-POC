import * as React from 'react';
import * as leaflet from 'leaflet';
import * as sizeOf from 'image-size';
import './Map.css';
import '../../../node_modules/leaflet/dist/leaflet.css'
import MapPoint from "./MapPoint";

const markerIcon = require('../../images/ttv.svg');

export interface MapProps {
  imageUrl: string,
  mapPoints?: MapPoint[]
}

export default class Map extends React.Component<MapProps> {

  private readonly imgDimensions: Promise<void>;
  private imgHeight: number;
  private imgWidth: number;
  private mapPoints: MapPoint[];
  private icon: leaflet.Icon;

  constructor(props: Readonly<MapProps>) {
    super(props);
    this.imgDimensions = this.getImageDimensions(props.imageUrl);
    this.mapPoints = props.mapPoints || [];
    this.icon = leaflet.icon({
      iconUrl: markerIcon,
      iconSize: [50, 50],
      iconAnchor: [25, 25] //half iconSize
    });
  }

  private getImageDimensions(path: string): Promise<void> {
    return fetch(path).then(response => {
      return response.arrayBuffer();
    }).then(arrayBuffer => {
      return sizeOf(Buffer.from(arrayBuffer));
    }).then(dimensions => {
      this.imgHeight = dimensions.height;
      this.imgWidth = dimensions.width;
    });
  }

  async componentDidMount() {
    const mapElement = document.getElementById('map');
    if (mapElement)
    {
      const map = leaflet.map(mapElement, {
        crs: leaflet.CRS.Simple
      });
      await this.imgDimensions;
      const heightRatio = Math.ceil(this.imgHeight / mapElement.clientHeight);
      const widthRatio = Math.ceil(this.imgWidth / mapElement.clientWidth);
      const ratio = Math.max(heightRatio, widthRatio);

      const bounds = new leaflet.LatLngBounds([[0, 0], [this.imgHeight/ratio, this.imgWidth/ratio]]);
      const image = leaflet.imageOverlay(this.props.imageUrl, bounds).addTo(map);
      map.fitBounds(bounds);
      map.setMaxZoom(Math.log2(ratio));

      this.mapPoints.map(mapPoint => {
        const marker = leaflet.marker([mapPoint.y/ratio, mapPoint.x/ratio], {
          icon: this.icon,
          title: mapPoint.hoverText,
          alt: mapPoint.hoverText
        });
        marker.on('click', mapPoint.onClick);
        return marker;
      }).forEach(marker => marker.addTo(map));


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
