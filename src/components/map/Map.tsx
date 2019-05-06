import * as React from 'react';
import * as leaflet from 'leaflet';
import * as sizeOf from 'image-size';
import './Map.css';
import '../../../node_modules/leaflet/dist/leaflet.css'

export interface MapProps {
  imageUrl: string
}

export default class Map extends React.Component<MapProps> {

  private readonly imgDimensions: Promise<void>;
  private imgHeight: number;
  private imgWidth: number;

  constructor(props: Readonly<MapProps>) {
    super(props);
    this.imgDimensions = this.getImageDimensions(props.imageUrl);
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
