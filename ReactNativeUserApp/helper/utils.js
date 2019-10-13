import { Dimensions } from 'react-native';
export const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export const isCloseToBottom = ({
  layoutMeasurement,
  contentOffset,
  contentSize
}) => {
  const paddingToBottom = 5;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};

export const shortenText = (text, maxLeng = 36) => {
  if (text && text.length > maxLeng) {
    return `${text.substring(0, maxLeng)} ...`;
  }
  return text;
};

export const calculateLatLong = (delta, long_user, lat_user) => {
  var long_max = long_user + delta;
  var long_min = long_user - delta;
  var lat_max = lat_user + delta;
  var lat_min = lat_user - delta;
  return {
    latMin: lat_min,
    latMax: lat_max,
    longMin: long_min,
    longMax: long_max
  };
};

export const wp = percentage => {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
};
