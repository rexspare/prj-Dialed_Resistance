import { responsiveHeight } from './../../utils/responsiveDimensions'
import { TextStyle } from "react-native"
import { color, typography } from "../../theme"
import { responsiveFontSize } from "../../utils/responsiveDimensions"

/**
 * All text will start off looking like this.
 */
const BASE: TextStyle = {
  fontFamily: typography.primary,
  color: color.text,
  fontSize: 15,
}

/**
 * All the variations of text styling within the app.
 *
 * You want to customize these to whatever you need in your app.
 */
export const presets = {
  /**
   * The default text styles.
   */
  default: BASE,

  /**
   * A bold version of the default text.
   */
  bold: { ...BASE, fontWeight: "bold" } as TextStyle,

  /**
   * Large headers.
   */
  header: { ...BASE, fontFamily: typography.primary, fontSize: responsiveFontSize(30) } as TextStyle,

  subheader: { ...BASE, fontSize: responsiveFontSize(20) } as TextStyle,
  button: { ...BASE, fontSize: responsiveFontSize(18), fontWeight: "bold" } as TextStyle,
  calibration: {
    ...BASE,
    fontSize: responsiveFontSize(19),
    fontWeight: "500",
    textAlign: "center",
  } as TextStyle,
  congratulations: {
    ...BASE,
    fontSize: responsiveFontSize(30),
    fontWeight: "500",
    textAlign: "center",
  } as TextStyle,
  cardTitle: {
    ...BASE,
    fontSize: responsiveFontSize(16),
    fontWeight: "500",
    textAlign: "center",
    color: color.palette.darkestGrey,
    textDecorationLine: "underline",
    textTransform: "uppercase",
  } as TextStyle,
  cardTitleResistanceCadence: {
    ...BASE,
    fontSize: responsiveFontSize(16),
    fontWeight: "500",
    textAlign: "center",
    postion: "absolute",
    top: -80,
    width: "100%",
    color: color.palette.darkestGrey,
    textDecorationLine: "underline",
    textTransform: "uppercase",
  } as TextStyle,
  cardValueSmall: { fontSize: responsiveFontSize(42), textAlign: "center", fontWeight: "500" },
  cardValueLarge: {
    fontSize: responsiveFontSize(90),
    textAlign: "center",
    fontWeight: "500",
    paddingBottom: responsiveHeight(45),
  },
  cardValueLargeRpm: {
    fontSize: responsiveFontSize(90),
    width: '100%',
    textAlign: "center",
    fontWeight: "500",
    // paddingBottom: responsiveHeight(45),
    position: "absolute",
    left: 0,
    top: -83,
  },
  valueStyleSymbol: {
    fontSize: responsiveFontSize(90),
    textAlign: "center",
    fontWeight: "500",
    paddingBottom: 15,
    color: color.palette.darkGrey,
  },
  cardValue: {
    ...BASE,
    fontSize: responsiveFontSize(30),
    fontWeight: '500',
    justifyContent: "center"
  },
  cardRpm: {
    ...BASE,
    fontSize: responsiveFontSize(80),
    fontWeight: '500',
    justifyContent: "center"
  },
  fieldLabel: { ...BASE, fontSize: 13, color: color.dim } as TextStyle,

  /**
   * A smaller piece of secondard information.
   */
  secondary: { ...BASE, fontSize: 9, color: color.dim } as TextStyle,
}

/**
 * A list of preset names.
 */
export type TextPresets = keyof typeof presets
