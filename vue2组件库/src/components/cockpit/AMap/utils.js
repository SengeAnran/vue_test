import { centroid, getCoord } from '@turf/turf';
export function getPopupPostion(feature) {
  const { type, coordinates } = feature.geometry;
  // console.log(coordinates);
  if (type === 'Point') {
    return coordinates;
  }
  if (type === 'Polygon') {
    return coordinates[0];
  }
  // console.log(getCoord(center(feature)));
  return getCoord(centroid(feature));
}
