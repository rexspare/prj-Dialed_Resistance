import { Dimensions, Platform, PixelRatio } from 'react-native'
export const windowWidth = Dimensions.get('window').width
export const windowHeight = Dimensions.get('window').height
const scale = windowWidth / 375
const scaleX = windowHeight / 760

export const responsiveWidth = percentage => percentage
export const responsiveHeight = percentage => percentage

export function responsiveFontSize(size) {
  const newSize = size * scale
  // if (Platform.OS === 'ios') {
  //   return Math.round(PixelRatio.roundToNearestPixel(newSize))
  // } else {
  //   return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
  // }
  return size
}
