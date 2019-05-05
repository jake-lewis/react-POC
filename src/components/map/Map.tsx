import * as React from 'react';
import MapPoint from './MapPoint';
import './Map.css';

export default () => {
  return (
    <div className="mapContainer">
      <div className='map'>
        <MapPoint x={54} y={24} hovertext='blarg' onClick={() => console.log('clicked')} />
        <MapPoint x={33} y={63} hovertext='blarg2' onClick={() => console.log('clicked')} />
      </div>
    </div>
  );
}