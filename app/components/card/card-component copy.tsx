import * as React from "react"
import { Alert, Image, TouchableOpacity, View, ViewStyle } from "react-native"
import { Text } from "../"
import { color } from "../../theme"
import { responsiveFontSize, responsiveHeight } from "../../utils/responsiveDimensions"
import { CardPresetNames, cardPresets } from "./card.presets"

export interface CardProps {
  title: string
  value?: number | string
  style?: ViewStyle
  preset?: CardPresetNames
  onIncrementResistance?: () => void
  onDecrementResistance?: () => void
  showResistanceButtons?: boolean
}

/**
 * Stateless functional component for your needs
 *
 * Component description here for TypeScript tips.
 */
export function Card(props: CardProps) {
  // grab the props
  const {
    style,
    title,
    value,
    preset = "primary",
    onIncrementResistance,
    onDecrementResistance,
    showResistanceButtons,
  } = props
  const { titleTextStyle, titleContainerStyle, valueTextStyle, viewStyle, outerViewStyle, valueContainerStyle } = cardPresets[preset]
  const styles = {
    container: {
      marginTop: responsiveHeight(30),
      backgroundColor: color.dim,
      flex: 1,
      justifyContent: "space-around",
      alignItems: "center",
      // paddingVertical:15,
      borderRadius: 10,
      // position:"relative",
      elevation: 10,
      ...style,
    } as ViewStyle,
  }
  return (
    <View style={{ ...outerViewStyle, ...styles.container, }}>
      {/* <Text preset="cardTitle" style={titleTextStyle}>
        {title}
      </Text> */}

      {(preset !== "resistanceCard") && (
        <>
          <View style={viewStyle}>
            <View style={titleContainerStyle}>
              <Text preset="cardTitle" style={titleTextStyle}>
                {title}
              </Text>
            </View>
            <View style={valueContainerStyle}>
              <Text style={valueTextStyle}>
                {value}
              </Text>
            </View>
          </View>
          {preset === "secondary" && (
            <Image
              source={require("./cup.png")}
              resizeMode="contain"
              style={{ height: responsiveHeight(190), marginVertical: responsiveHeight(15), marginTop: -responsiveHeight(240) }}
            />
          )}
        </>
      )}
      {preset === "resistanceCard" && (
        <View style={viewStyle}>
          {showResistanceButtons == true && (
            <View
              style={{
                flex: 1,
                backgroundColor: "#d9d9d9",
                height: "100%",
                justifyContent: "center",
                borderTopStartRadius: 10,
                borderBottomStartRadius: 10,

              }}
            >
              <TouchableOpacity onPress={onDecrementResistance}>
                <Text preset="valueStyleSymbol">-</Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={{ flex: 2, marginTop: 70 }}>
            <Text preset={ "cardTitleResistanceCadence"} style={ showResistanceButtons ? { color: color.palette.white } : { color: color.palette.darkestGrey }}>
              {title}
            </Text>
            <Text preset="cardValueLargeRpm" style={valueTextStyle}>
              {value}
            </Text>
          </View>
          {showResistanceButtons == true && (
            <View
              style={{
                flex: 1,
                backgroundColor: "#d9d9d9",
                height: "100%",
                justifyContent: "center",
                borderTopEndRadius: 10,
                borderBottomEndRadius: 10,
              }}
            >
              <TouchableOpacity onPress={onIncrementResistance}>
                <Text preset="valueStyleSymbol">+</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </View>
  )
}
