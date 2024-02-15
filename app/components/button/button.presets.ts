import { ViewStyle, TextStyle } from "react-native"
import { color, spacing } from "../../theme"
import { responsiveFontSize, responsiveHeight } from "../../utils/responsiveDimensions"

/**
 * All text will start off looking like this.
 */
const BASE_VIEW: ViewStyle = {
  paddingVertical: responsiveHeight(13),
 // paddingHorizontal: spacing[2],
  borderRadius: 10,
  justifyContent: "center",
  alignItems: "center",
}

const BASE_TEXT: TextStyle = {
 // paddingHorizontal: spacing[3],
  fontSize: responsiveFontSize(18),
  fontWeight: 'bold'
}

/**
 * All the variations of text styling within the app.
 *
 * You want to customize these to whatever you need in your app.
 */
export const viewPresets = {
  /**
   * A smaller piece of secondard information.
   */
  primary: { ...BASE_VIEW, backgroundColor: color.palette.primaryColor } as ViewStyle,
  secondary: { ...BASE_VIEW, backgroundColor: color.palette.primaryColor } as ViewStyle,
  inactive: { ...BASE_VIEW, backgroundColor: color.palette.deviceBg, borderColor: color.primary, borderWidth: 1} as ViewStyle,

  /**
   * A button without extras.
   */
  link: {
    ...BASE_VIEW,
    paddingHorizontal: 0,
    paddingVertical: 0,
    alignItems: "flex-start",
  } as ViewStyle,
}

export const textPresets = {
  primary: { ...BASE_TEXT, fontSize: responsiveFontSize(18), color: color.palette.textColor } as TextStyle,
  secondary: { ...BASE_TEXT, fontSize: responsiveFontSize(18), color: color.primary } as TextStyle,
  inactive: { ...BASE_TEXT, fontSize: responsiveFontSize(18), color: '#999999' } as TextStyle,
  link: {
    ...BASE_TEXT,
    color: color.text,
    paddingHorizontal: 0,
    paddingVertical: 0,
  } as TextStyle,
}

/**
 * A list of preset names.
 */
export type ButtonPresetNames = keyof typeof viewPresets
