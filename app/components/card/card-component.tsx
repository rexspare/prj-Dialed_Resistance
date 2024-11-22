import * as React from "react"
import { Alert, Image, TouchableOpacity, View, ViewStyle, Text as TextRn } from "react-native"
import { Text } from "../"
import { color } from "../../theme"
import { responsiveFontSize, responsiveHeight } from "../../utils/responsiveDimensions"
import { CardPresetNames, cardPresets } from "./card.presets"
import { useState } from "react"

export interface CardProps {
  title: string
  subTitle: string
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
    subTitle,
    value,
    preset = "primary",
    onIncrementResistance,
    onDecrementResistance,
    showResistanceButtons,
  } = props
  const {
    titleTextStyle,
    titleContainerStyle,
    valueTextStyle,
    viewStyle,
    outerViewStyle,
    valueContainerStyle,
    plusButtonContainerStyle,
    plusButtonTextStyle,
    minusButtonContainerStyle,
    minusButtonTextStyle,
    innerViewStyle,
  } = cardPresets[preset]
  const styles = {
    container: {
      marginBottom: responsiveHeight(47),
      backgroundColor: color.palette.secondaryBgColor,
      flex: 1,
      // justifyContent: "space-around",
      alignItems: "center",
      paddingVertical: 15,
      borderRadius: 10,
      // position:"relative",
      // elevation: 10,
      ...style,
    } as ViewStyle,
  }

  const [height, setheight] = useState(0)

  return (
    <View
      onLayout={(e) => {
        const { x, y, width, height } = e.nativeEvent.layout;
        setheight(height)
      }}
      style={{ ...outerViewStyle, ...styles.container }}>
      <View
        style={{
          ...viewStyle,
          ...(showResistanceButtons === true && {
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 0,
          }),
        }}
      >
        {showResistanceButtons === true && (
          // <View style={plusButtonContainerStyle}>
          <TouchableOpacity
            style={{
              backgroundColor: "rgba(3, 153, 165, 0.33)",
              width: '25%',
              height: height,
              justifyContent: 'center',
              alignItems: 'center',
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
            }}
            onPress={onDecrementResistance}>
            <TextRn
              style={{
                fontWeight: 'bold',
                fontSize: responsiveFontSize(15),
                color: "#FAFAFAA8"
              }}
            // style={plusButtonTextStyle}
            >Easier</TextRn>
          </TouchableOpacity>
          // </View>
        )}
        <View
          style={{
            ...innerViewStyle,
            ...(showResistanceButtons === true && { marginVertical: viewStyle.paddingVertical }),
          }}
        >
          <View style={titleContainerStyle}>
            <Text preset="cardTitle" style={titleTextStyle}>
              {title}
            </Text>
          </View>
          <View style={valueContainerStyle}>
            <Text style={valueTextStyle}>{value}</Text>
          </View>
        </View>
        {(preset === "cardSmall" || title === "total output") && (
          <Text style={{
            marginTop: 20,
            marginBottom: -10,
            fontSize: (subTitle === "(EFQs)" || title === "total output") ? 12 : 15,
            color: color.palette.textColor,
            opacity: (subTitle === "(EFQs)" || title === "total output") ? 0.6 : 0.5,
            textAlign: "center",
            fontWeight: (subTitle === "(EFQs)" || title === "total output") ? "400" : "bold"
          }}>{subTitle}</Text>
        )}
        {showResistanceButtons === true && (
          // <View style={minusButtonContainerStyle}>
          <TouchableOpacity
            style={{
              backgroundColor: "rgba(3, 153, 165, 0.33)",
              height: height,
              justifyContent: 'center',
              width: '25%',
              height: height,
              justifyContent: 'center',
              alignItems: 'center',
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10,
            }}
            onPress={onIncrementResistance}>
            <TextRn
              style={{
                fontWeight: 'bold',
                fontSize: responsiveFontSize(15),
                color: "#FAFAFAA8"
              }}
            // style={minusButtonTextStyle}
            >Harder</TextRn>
          </TouchableOpacity>
          // </View>
        )}
      </View>
      {preset === "secondary" && (
        <Image
          source={require("./cup.png")}
          resizeMode="contain"
          style={{
            height: responsiveHeight(190),
            marginVertical: responsiveHeight(15),
            marginTop: -responsiveHeight(240),
          }}
        />
      )}
    </View>
  )
}
