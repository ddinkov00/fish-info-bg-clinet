export type PostPostRequest = {
  description: string;
  imagesUrl: string[];
  locationLatitude?: number;
  locationLongitude?: number;
};

export type GetPostResponse = {
  id: number;
  description: string;
  imagesUrl: string[];
  username: string;
  created: string;
  locationLatitude?: number;
  locationLongitude?: number;
};
