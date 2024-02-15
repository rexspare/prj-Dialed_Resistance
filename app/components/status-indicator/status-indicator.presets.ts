import { ViewStyle, TextStyle, ImageStyle } from "react-native"
import { color, spacing } from "../../theme"
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "../../utils/responsiveDimensions"
import { IconTypes } from "../icon/icons"

/**
 * All views will start off looking like this.
 */
const BASE_VIEW: ViewStyle = {
  flexDirection: 'row',
  justifyContent: "space-between",
  alignItems: "center",
}
const BASE_ICON = {
  tintColor: color.palette.textColor,
  height: responsiveWidth(10),
  width: responsiveWidth(10)
}
const BASE_CONTAINER = {
  width: responsiveWidth(15),
  height: responsiveWidth(15),
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 50,
}
const BASE_TEXT = {
  color: color.text,
  fontSize: responsiveFontSize(16)
} as TextStyle

/**
 * All the variations of this component
 *
 * You want to customize these to whatever you need in your app.
 */
export const statusIndicatorPresets = {
  connected: {
    viewStyle: { ...BASE_VIEW } as ViewStyle,
    iconStyle: { ...BASE_ICON } as ImageStyle,
    iconContainerStyle: { ...BASE_CONTAINER, backgroundColor: '#8CFF00', } as ViewStyle,
    textStyle: { ...BASE_TEXT, color: "#8CFF00" } as TextStyle,
    iconName: 'checkmark' as IconTypes,
    indicator: { marginLeft: responsiveWidth(10), opacity: 0 }
  },
  disconnected: {
    viewStyle: { ...BASE_VIEW } as ViewStyle,
    iconStyle: { ...BASE_ICON } as ImageStyle,
    iconContainerStyle: { ...BASE_CONTAINER, backgroundColor: '#E3505F', } as ViewStyle,
    textStyle: { ...BASE_TEXT, color:"#E3505F" } as TextStyle,
    iconName: 'cross' as IconTypes,
    indicator: { marginLeft: responsiveWidth(10), opacity: 0 }
  },
  connecting: {
    viewStyle: { ...BASE_VIEW } as ViewStyle,
    iconStyle: { ...BASE_ICON } as ImageStyle,
    iconContainerStyle: { ...BASE_CONTAINER, backgroundColor: 'yellow', } as ViewStyle,
    textStyle: { ...BASE_TEXT, color: "yellow" } as TextStyle,
    iconName: 'checkmark' as IconTypes,
    indicator: { marginLeft: responsiveWidth(10), opacity: 1 }
  },
}

/**
 * A list of preset names.
 */
export type StatusIndicatorPresetNames = keyof typeof statusIndicatorPresets
