export type WaterSourceProhibitionMarker = {
  id: number;
  latitude: number;
  longitude: number;
};

export enum WaterSourceProhibitionType {
  Prohibited = 0,
  CatchAndRelease = 1,
}

export type WaterSourceProhibitionResponse = {
  id: number;
  name: string;
  description: string;
  regionName: string;
  type: WaterSourceProhibitionType;
  markers: WaterSourceProhibitionMarker[];
};
