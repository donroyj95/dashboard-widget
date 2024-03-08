export type LocationCoordinate = Pick<GeolocationCoordinates, 'longitude' | 'latitude'>;

export type Task = {
    id: number;
    content: string;
    status: boolean;
  };