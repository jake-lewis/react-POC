import * as React from 'react';
import "./MapPoint.css"

export interface MapPointProps {
  x: number;
  y: number;
  hovertext: string;
  onClick: () => any;
}

export default class MapPoint extends React.Component<MapPointProps> {
  constructor(props: MapPointProps) {
    super(props);
  }

  render() {
    const style = {
      left: this.props.x + '%',
      top: this.props.y + '%'
    }

    return (
      <label className="mapPoint" title={this.props.hovertext} style={style}>
        <input type="radio" name="mapPoint" onClick={() => this.props.onClick()} />
        <span className="checkmark" />
      </label>
    );
  }
}