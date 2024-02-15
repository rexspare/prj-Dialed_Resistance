/* eslint-disable react-native/no-inline-styles */
import * as React from "react"
import { Animated, ImageBackground, Pressable, View, ViewStyle } from "react-native"
import { Button, Icon, Screen, Text } from "../../components"
// import { useStores } from "../models/root-store"
import { color } from "../../theme"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.mainBgColor,
}
export interface ResistancePromptProps {
  onPressButton
}

const timeDurations = [10, 15, 20, 30, 45, 60, 75, 90]

export const Presentation = ({
  onPressButton
}:ResistancePromptProps) => {
  const [step, setStep] = React.useState(0)

  return (
    <View style={{ flex: 1 }}>
      <Screen style={ROOT}>
        <Text preset='header' text="Starting Workout" style={{ margin: 20, alignSelf: 'center', fontSize: 16 }}/>
        {/* <View style={{ borderColor: color.primaryDarker, borderBottomWidth: 2 }} /> */}
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <View style={{ flex: 1, paddingBottom: 20, paddingHorizontal: 10 }}>
          <ImageBackground imageStyle={{ alignSelf: "center", resizeMode: "contain", left: "17.5%", width: "65%" }} style={{ width: "100%", flex: 1 }} source={require("../../../assets/bgLogo.png")}>
             <Animated.View style={{ justifyContent: 'space-between', flex: 1 }}>
                <View></View>
                <Text preset='calibration' style={{
                  fontSize: 19,
                  width: "95%",
                  textAlign: "center",
                  textTransform: "capitalize"
                }}>Please turn the resistance knob {"\n"}  all the way to the left and press {"\n"}  Continue to begin your ride.</Text>
                <Button text='CONTINUE' preset='primary' onPress={onPressButton}
                  style={{
                    width: "100%",
                    alignSelf: "center",
                    backgroundColor: color.palette.primaryColor,
                  }}
                  textStyle={{
                    fontSize: 14,
                    color: color.palette.textColor,
                    fontWeight: "400"
                  }} />
              </Animated.View>
             </ImageBackground>
          </View>
        </View>
      </Screen>
    </View>
  )
}
