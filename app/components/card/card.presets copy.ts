import { responsiveHeight } from './../../utils/responsiveDimensions'
import { ViewStyle, TextStyle } from "react-native"
import { color, spacing, typography } from "../../theme"
import { responsiveFontSize, responsiveWidth } from "../../utils/responsiveDimensions"

/**
 * All views will start off looking like this.
 */
const BASE_VIEW: ViewStyle = {
  paddingVertical: spacing[2],
  paddingHorizontal: spacing[2],
  borderRadius: 4,
  justifyContent: "center",
  alignItems: "center",
}
const BASE_TEXT = {
  color: color.text,
  // marginTop:15
}

/**
 * All the variations of this component
 *
 * You want to customize these to whatever you need in your app.
 */
export const cardPresets = {
  primary: {
    valueTextStyle: { fontFamily: typography.primary, color: color.text, fontSize: responsiveFontSize(30), fontWeight: 'bold', justifyContent: "center" } as TextStyle,
    valueContainerStyle: { justifyContent: "center", height: "100%" } as ViewStyle,
    titleTextStyle: {} as TextStyle,
    titleContainerStyle: { position: "absolute" } as ViewStyle,
    viewStyle: { alignItems: "center", marginTop: 15, height: "100%" } as ViewStyle
  },
  secondary: {
    valueTextStyle: { ...BASE_TEXT, fontSize: responsiveFontSize(40), textAlign: 'center', fontWeight: 'bold', marginTop: -responsiveHeight(70) } as TextStyle,
    valueContainerStyle: { flex: 1 } as ViewStyle,
    titleTextStyle: { ...BASE_TEXT, color: color.palette.darkestGrey } as TextStyle,
    titleContainerStyle: { flex: 0.5 } as ViewStyle,
    outerViewStyle: { paddingHorizontal: responsiveWidth(40), justifyContent: 'center' } as ViewStyle,
    viewStyle: { paddingVertical: responsiveHeight(15) } as ViewStyle
  },
  resistanceCard: {
    valueTextStyle: { ...BASE_TEXT, textAlign: 'center', } as TextStyle,
    valueContainerStyle: {} as ViewStyle,
    titleTextStyle: { ...BASE_TEXT, textAlign: 'center', marginTop: 30 } as TextStyle,
    titleContainerStyle: {} as ViewStyle,
    viewStyle: {
      height: '100%',
      flex: 3,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: responsiveHeight(35),
    } as ViewStyle
  },
  cardSmall: {
    valueTextStyle: { ...BASE_TEXT, fontSize: responsiveFontSize(42), textAlign: "center", fontWeight: "bold", } as TextStyle,
    valueContainerStyle: { flex: 1 } as ViewStyle,
    titleTextStyle: { } as TextStyle,
    titleContainerStyle: { flex: 0.5 } as ViewStyle,
    outerViewStyle: { height: '100%' } as ViewStyle,
    viewStyle: { paddingVertical: responsiveHeight(15), } as ViewStyle
  },
  cardRpm: {
    valueTextStyle: {
      fontFamily: typography.primary,
      color: color.text,
      fontSize: responsiveFontSize(80),
      fontWeight: 'bold',
      justifyContent: "center"
    } as TextStyle,
    valueContainerStyle: { justifyContent: "center", height: "100%" } as ViewStyle,
    titleTextStyle: {
      fontFamily: typography.primary,
      fontSize: responsiveFontSize(16),
      fontWeight: "bold",
      textAlign: "center",
      color: color.palette.darkestGrey,
      textDecorationLine: "underline",
      textTransform: "uppercase",
    } as TextStyle,
    titleContainerStyle: { position: "absolute" } as ViewStyle,
    viewStyle: { flex: 1, justifyContent: "flex-start", alignItems: "center", height: "100%" } as ViewStyle
  },
}

/**
 * A list of preset names.
 */
export type CardPresetNames = keyof typeof cardPresets
