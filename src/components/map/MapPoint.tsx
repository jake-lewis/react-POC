import * as React from 'react';

export interface MapPointProps {
  x: number;
  y: number;
  hovertext: string;
  onClick: () => any;
}

export default class MapPoint {

  public x = 0;
  public y = 0;
  public hoverText = '';
  public onClick: any;

  constructor(props: MapPointProps) {
    this.x = props.x;
    this.y = props.y;
    this.hoverText = props.hovertext;
    this.onClick = props.onClick;
  }
}
