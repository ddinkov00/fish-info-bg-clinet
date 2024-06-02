export type CloseSeasonData = {
  id: number;
  fishSpeciesName: string;
  startDate: string;
  endDate: string;
  altitudeMin?: number;
  altitudeMax?: number;
};

export type CloseSeasonsResponse = CloseSeasonData[];
