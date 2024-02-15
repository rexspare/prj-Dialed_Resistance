import { responsiveHeight } from "./../../utils/responsiveDimensions"
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
  color: color.palette.workoutText,
  fontFamily: typography.primary,
  // marginTop:15
}
const BASE_SYMBOL_TEXT = {
  fontSize: responsiveFontSize(90),
  textAlign: "center",
  fontWeight: "bold",
  paddingBottom: 15,
  color: color.palette.workoutSecText,
}
const BASE_PLUS_BUTTON_CONTAINER = {
  flex: 1,
  backgroundColor: color.palette.workoutSecBg,
  height: "100%",
  justifyContent: "center",
  borderTopStartRadius: 10,
  borderBottomStartRadius: 10,
}
const BASE_MINUS_BUTTON_CONTAINER = {
  flex: 1,
  backgroundColor: color.palette.workoutSecBg,
  height: "100%",
  justifyContent: "center",
  borderTopEndRadius: 10,
  borderBottomEndRadius: 10,
}

/**
 * All the variations of this component
 *
 * You want to customize these to whatever you need in your app.
 */
export const cardPresets = {
  primary: {
    valueTextStyle: {
      fontFamily: typography.primary,
      color: color.text,
      fontSize: responsiveFontSize(30),
      fontWeight: "bold",
      justifyContent: "center",
    } as TextStyle,
    valueContainerStyle: { justifyContent: "center", height: "100%" } as ViewStyle,
    titleTextStyle: {} as TextStyle,
    titleContainerStyle: {} as ViewStyle,
    outerViewStyle: {} as ViewStyle,
    viewStyle: {
      alignItems: "center",
      // paddingVertical: responsiveHeight(15),
      height: "100%",
    } as ViewStyle,
    innerViewStyle: { flex: 2 },
    plusButtonContainerStyle: { ...BASE_PLUS_BUTTON_CONTAINER } as ViewStyle,
    plusButtonTextStyle: { ...BASE_SYMBOL_TEXT } as TextStyle,
    minusButtonContainerStyle: { ...BASE_MINUS_BUTTON_CONTAINER } as ViewStyle,
    minusButtonTextStyle: { ...BASE_SYMBOL_TEXT } as TextStyle,
  },
  secondary: {
    valueTextStyle: {
      ...BASE_TEXT,
      fontSize: responsiveFontSize(20),
      textAlign: "center",
      fontWeight: "bold",
      marginTop: -responsiveHeight(70),
    } as TextStyle,
    valueContainerStyle: { flex: 1 } as ViewStyle,
    titleTextStyle: { ...BASE_TEXT, color: color.palette.workoutSecText } as TextStyle,
    titleContainerStyle: { flex: 0.5 } as ViewStyle,
    outerViewStyle: {
      paddingHorizontal: responsiveWidth(40),
      justifyContent: "center",
    } as ViewStyle,
    viewStyle: {} as ViewStyle,
    innerViewStyle: { flex: 2 },
    plusButtonContainerStyle: { ...BASE_PLUS_BUTTON_CONTAINER } as ViewStyle,
    plusButtonTextStyle: { ...BASE_SYMBOL_TEXT } as TextStyle,
    minusButtonContainerStyle: { ...BASE_MINUS_BUTTON_CONTAINER } as ViewStyle,
    minusButtonTextStyle: { ...BASE_SYMBOL_TEXT } as TextStyle,
  },
  resistanceCard: {
    valueTextStyle: {
      fontFamily: typography.primary,
      color: color.text,
      fontSize: responsiveFontSize(80),
      fontWeight: "bold",
      justifyContent: "center",
    } as TextStyle,
    valueContainerStyle: { justifyContent: "center" } as ViewStyle,
    titleTextStyle: {
      fontFamily: typography.primary,
      fontSize: responsiveFontSize(16),
      fontWeight: "bold",
      textAlign: "center",
      color: color.palette.workoutSecText,
      textDecorationLine: "none",
      textTransform: "uppercase",
    } as TextStyle,
    titleContainerStyle: {} as ViewStyle,
    outerViewStyle: {} as ViewStyle,
    viewStyle: {
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "center",
      height: "100%",
      // paddingVertical: responsiveHeight(15),
    } as ViewStyle,
    innerViewStyle: { flex: 2, alignItems: "center" },
    plusButtonContainerStyle: { ...BASE_PLUS_BUTTON_CONTAINER } as ViewStyle,
    plusButtonTextStyle: { ...BASE_SYMBOL_TEXT } as TextStyle,
    minusButtonContainerStyle: { ...BASE_MINUS_BUTTON_CONTAINER } as ViewStyle,
    minusButtonTextStyle: { ...BASE_SYMBOL_TEXT } as TextStyle,
  },
  cardSmall: {
    valueTextStyle: {
      ...BASE_TEXT,
      fontSize: responsiveFontSize(42),
      textAlign: "center",
      fontWeight: "bold",
    } as TextStyle,
    valueContainerStyle: { flex: 1 } as ViewStyle,
    titleTextStyle: {
      fontSize: responsiveFontSize(16),
      color: color.palette.workoutSecText,
      textDecorationLine: "none",
    } as TextStyle,
    titleContainerStyle: {
      fontFamily: typography.primary,
      flex: 0.5,
    } as ViewStyle,
    outerViewStyle: { height: "100%" } as ViewStyle,
    viewStyle: {} as ViewStyle,
    innerViewStyle: { flex: 2 },
    plusButtonContainerStyle: { ...BASE_PLUS_BUTTON_CONTAINER } as ViewStyle,
    plusButtonTextStyle: { ...BASE_SYMBOL_TEXT } as TextStyle,
    minusButtonContainerStyle: { ...BASE_MINUS_BUTTON_CONTAINER } as ViewStyle,
    minusButtonTextStyle: { ...BASE_SYMBOL_TEXT } as TextStyle,
  },
}

/**
 * A list of preset names.
 */
export type CardPresetNames = keyof typeof cardPresets
