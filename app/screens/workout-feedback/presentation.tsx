/* eslint-disable react-native/no-inline-styles */
import * as React from "react"
import { Animated, ImageBackground, Pressable, TouchableOpacity, View, ViewStyle } from "react-native"
import Slider from 'react-native-slider'
import { Button, Icon, Screen, Text } from "../../components"
// import { useStores } from "../models/root-store"
import { color } from "../../theme"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.mainBgColor,
}
export interface ResistancePromptProps {
  onPressButton
  navigateToFeedback
}

export const Presentation = ({
  onPressButton,
  navigateToFeedback
}:ResistancePromptProps) => {
  const [step, setStep] = React.useState(2)

  return (
    <View style={{ flex: 1 }}>
      <Screen style={ROOT}>
         <TouchableOpacity onPress={navigateToFeedback} style={{
          borderWidth: 0,
          borderColor: color.palette.textColor,
          alignSelf: "flex-end",
          paddingVertical: 3,
          paddingHorizontal: 15,
          borderRadius: 8,
          top: 15,
          left: 15,
          position: "absolute",
          backgroundColor: "#0399A5D9",
          padding: 4,
        }}>
           <Text style={{
             fontSize: 14,
             color: color.palette.textColor,
             fontWeight: "400",
             fontFamily: "NotoSans-Regular"
           }}>Feedback</Text>
        </TouchableOpacity>
        <Text preset='header' text="Post Workout" style={{ margin: 20, alignSelf: 'center', fontSize: 16 }}/>
        {/* <View style={{ borderColor: color.primaryDarker, borderBottomWidth: 2 }} /> */}
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <View style={{ flex: 1, paddingBottom: 20, paddingHorizontal: 10 }}>
          <ImageBackground imageStyle={{ alignSelf: "center", resizeMode: "contain", left: "17.5%", width: "65%" }} style={{ width: "100%", flex: 1 }} source={require("../../../assets/bgLogo.png")}>
                 <Animated.View style={{ justifyContent: 'space-between', alignItems: "center", flex: 1 }}>
                <View></View>
                <View style={{
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 30
                }}>
                  <Text style={{
                    color: color.palette.textColor,
                    marginBottom: 48,
                    fontSize: 19,
                  }}>Post Workout Feedback</Text>
                  <Text style={{
                    color: color.palette.textColor,
                    marginBottom: 24,
                    fontSize: 14,
                    fontWeight: "500"
                  }}>How accurate did the resistance levels feel</Text>
                <View style={{
                    flexDirection: "row",
                    width:"100%",
                    justifyContent:"space-between",
                    paddingHorizontal: 20,
                    marginBottom: 6
                }}>
                  {/* <View style={{
                    position: "absolute",
                    justifyContent: "space-between",
                    flexDirection: "row",
                    width: "100%",
                    paddingHorizontal: 10
                  }}>
                      <View style={{ height: 40, backgroundColor: color.palette.textColor, width: 2 }}></View>
                      <View style={{ height: 40, backgroundColor: color.palette.textColor, width: 2 }}></View>
                      <View style={{ height: 40, backgroundColor: color.palette.textColor, width: 2 }}></View>
                      <View style={{ height: 40, backgroundColor: color.palette.textColor, width: 2 }}></View>
                      <View style={{ height: 40, backgroundColor: color.palette.textColor, width: 2 }}></View>
                  </View>
                  <Slider onSlidingStart={(e) => { console.log(e) }} minimumValue={0} maximumValue={4} value={step} onValueChange={value => setStep(value)} step={1} minimumTrackTintColor={color.palette.textColor} maximumTrackTintColor={color.palette.textColor} thumbTintColor={color.palette.primaryColor} trackStyle={{ marginHorizontal: 10 }} /> */}
                  <Pressable onPress={()=>{setStep(0)}}>
                    <View style={{ width: 24, height: 24, borderRadius: 25, borderColor: step === 0 ? color.palette.primaryColor : color.palette.secondaryColor, borderWidth: 1, justifyContent: "center", alignItems: "center", backgroundColor: step === 0 ? color.palette.primaryColor : "transparent" }}>
                        {step === 0 && (<Icon icon="checkmarkBold" style={{width: 8 }} />)}
                    </View>
                  </Pressable>
                  <Pressable onPress={()=>{setStep(1)}}>
                    <View style={{ width: 24, height: 24, borderRadius: 25, borderColor: step === 1 ? color.palette.primaryColor : color.palette.secondaryColor, borderWidth: 1, justifyContent: "center", alignItems: "center", backgroundColor: step === 1 ? color.palette.primaryColor : "transparent" }}>
                        {step === 1 && (<Icon icon="checkmarkBold" style={{width: 8 }} />)}
                    </View>
                  </Pressable>
                  <Pressable onPress={()=>{setStep(2)}}>
                    <View style={{ width: 24, height: 24, borderRadius: 25, borderColor: step === 2 ? color.palette.primaryColor : color.palette.secondaryColor, borderWidth: 1, justifyContent: "center", alignItems: "center", backgroundColor: step === 2 ? color.palette.primaryColor : "transparent" }}>
                        {step === 2 && (<Icon icon="checkmarkBold" style={{width: 8 }} />)}
                    </View>
                  </Pressable>
                  <Pressable onPress={()=>{setStep(3)}}>
                    <View style={{ width: 24, height: 24, borderRadius: 25, borderColor: step === 3 ? color.palette.primaryColor : color.palette.secondaryColor, borderWidth: 1, justifyContent: "center", alignItems: "center", backgroundColor: step === 3 ? color.palette.primaryColor : "transparent" }}>
                        {step === 3 && (<Icon icon="checkmarkBold" style={{width: 8 }} />)}
                    </View>
                  </Pressable>
                  <Pressable onPress={()=>{setStep(4)}}>
                    <View style={{ width: 24, height: 24, borderRadius: 25, borderColor: step === 4 ? color.palette.primaryColor : color.palette.secondaryColor, borderWidth: 1, justifyContent: "center", alignItems: "center", backgroundColor: step === 4 ? color.palette.primaryColor : "transparent" }}>
                        {step === 4 && (<Icon icon="checkmarkBold" style={{width: 8 }} />)}
                    </View>
                  </Pressable>
                </View>
                 <View style={{
                   justifyContent: "space-between",
                   flexDirection: "row",
                   width: "100%",
                   paddingHorizontal: 10,
                 }}>
                     <Pressable onPress={()=>{setStep(0)}}>
                      <Text style={{
                       color: color.palette.textColor,
                       width: 48,
                       textAlign: "center",
                       fontSize: 16,
                     }}>Too Easy</Text>
                     </Pressable>
                     <Pressable onPress={()=>{setStep(2)}}>
                      <Text style={{
                        color: color.palette.textColor,
                        width: 48,
                        textAlign: "center",
                        fontSize: 16,
                      }}>About Right</Text>
                      </Pressable>
                     <Pressable onPress={()=>{setStep(4)}}>
                      <Text style={{
                        color: color.palette.textColor,
                        width: 48,
                        textAlign: "center",
                        fontSize: 16,
                      }}>Too Hard</Text>
                      </Pressable>
                  </View>
                  <Text style={{textAlign: "center", fontSize: 12, marginTop: 24, opacity:0.5}}>
                    This feedback helps fine tune your resistance level. {"\n"} {"\n"}
                    It can be accessed from the ‘Update Res Levl’ {"\n"} button on the Workout History Page.
                  </Text>
                </View>
                <Button text='Continue' preset='primary' onPress={() => { onPressButton(step) }}
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
