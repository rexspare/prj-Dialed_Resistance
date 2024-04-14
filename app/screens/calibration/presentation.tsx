import * as React from "react"
import { Animated, Image, ImageBackground, Modal, Pressable, ScrollView, TouchableOpacity, View, ViewStyle } from "react-native"
import { Button, Card, Screen, Text, TextField } from "../../components"
// import { useStores } from "../models/root-store"
import { color, typography } from "../../theme"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "../../utils/responsiveDimensions"
import AnimatedEllipsis from "react-native-animated-ellipsis"
import { Observer } from "mobx-react-lite"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.mainBgColor,
}
export interface CalibrationProps {
  text: string
  opacity: Animated.Value
  onPressButton: () => void
  showText: number | "age" | "hr"
  opacityCalibrating: Animated.Value
  onPressWorkout: () => void
  onPressHome: () => void
  showLogs: boolean
  logs: string[] | null
  cadence: number
  heartRate: number
  onSetAge: (age: number) => void
  onSerHrR: (HrR: number) => void
  timeDurations: number[]
  age: number
  hrr: number
  trp: number
  duration: number
  onPressContinue: () => void
  onPressContinue2: () => void
  lengthModalVisible: boolean
  setLengthModalVisible: (visible: boolean) => void
  setDuration: (duration: number) => void
  onPressToCalibrating: () => void
  navigateToFeedback: () => void,
  targetRPM: number;
  targetCadence: number;
  initialCadence: number;
}

export const Presentation = ({
  text,
  opacity,
  onPressButton,
  opacityCalibrating,
  showText,
  onPressWorkout,
  timeDurations,
  showLogs,
  logs,
  duration,
  onPressContinue,
  onPressContinue2,
  setLengthModalVisible,
  lengthModalVisible,
  setDuration,
  onPressToCalibrating,
  onSerHrR,
  onSetAge,
  age,
  trp,
  hrr,
  targetCadence,
  initialCadence,
  cadence,
  heartRate,
  navigateToFeedback,
  onPressHome,
  targetRPM
}: CalibrationProps) => {
  const scrollViewRef = React.useRef()
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
        <Text preset="header" text="Calibration" style={{ margin: 20, fontSize: 16, alignSelf: "center" }} />
        {/* <View
          style={{
            borderColor: color.primaryDarker,
            borderBottomWidth: 2,
            marginBottom: responsiveHeight(100),
          }}
        /> */}
        <ImageBackground imageStyle={{ resizeMode: "contain", marginHorizontal: "17.5%", width: "65%", marginTop: -70 }} style={{ width: "100%", flex: 1 }} source={require("../../../assets/bgLogo.png")}>
          <View style={{ justifyContent: "center", flex: 1, marginTop: -70 }}>
            <View style={{ paddingHorizontal: responsiveWidth(10), flex: 1, marginTop: -70 }}>
              {showText === 1 && (
                <Animated.View
                  style={{
                    opacity: opacity,
                    justifyContent: "space-between",
                    flex: 1,
                    paddingBottom: 20,
                    // marginTop: responsiveHeight(60),
                  }}
                >
                  <View style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 100
                  }}>
                    <Text preset="calibration" style={{
                      fontSize: 19,
                      fontWeight: "600",
                      fontFamily: typography.primaryBold,
                      paddingHorizontal: 10,
                      textTransform: "capitalize"

                      // backgroundColor:"#fff"
                    }}>
                      Help Us Tailor The Resistance {"\n"} Levels To You And Your Bike.
                    </Text>
                  </View>
                  <Button
                    text="OK"
                    preset="primary"
                    onPress={onPressContinue}
                    style={{
                      width: "100%",
                      alignSelf: "center",
                      // marginTop: responsiveHeight(150),
                      backgroundColor: color.palette.primaryColor,
                    }}
                    textStyle={{
                      color: color.palette.textColor,
                      fontWeight: "400",
                      fontSize: 14
                    }}
                  />
                </Animated.View>
              )}

              {showText === 99 && (
                <Animated.View
                  style={{
                    opacity: opacity,
                    justifyContent: "flex-start",
                    // marginTop: responsiveHeight(60),
                    flex: 1,
                    paddingBottom: 20
                  }}
                >
                  <ScrollView style={{
                    flex: 1,
                    marginTop: 150
                  }}>

                    <View style={{
                      flex: 1,
                      justifyContent: 'flex-start',
                      paddingHorizontal: '5%'

                    }}>
                      <Text preset="calibration" style={{
                        fontSize: 19,
                        fontWeight: "600",
                        fontFamily: typography.primaryBold,
                        textTransform: "capitalize",
                        marginVertical: 40
                      }}>
                        A Few Tips:
                      </Text>

                      <Text preset="calibration" style={{
                        fontSize: 16,
                        fontFamily: typography.primary,
                        fontWeight: "400",
                        textAlign: 'left',
                        lineHeight: 27
                      }}>
                        {`During Calibration You Will Accelerate And Then Gradually Add On Resistance.

Allow Your Cadence To Gradually Slow In Response To The Added Resistance.

Your Goal Is To Maintain The Target Cadence With Light Effort Applied.

If Your Cadence Falls Below The Target - Lessen The Resistance.

This is not the workout.
If It Feels Like A Workout You Are Trying Too Hard To Maintain The Cadence. 
Do Not Get Out Of The Saddle While Calibrating.
                       `}
                      </Text>

                      <Text preset="calibration" style={{
                        fontSize: 14,
                        fontWeight: "600",
                        fontFamily: typography.primary,
                        textAlign: 'left',
                        marginBottom: 10
                      }}>
                        {`Note: If Your Resistance Levels Feel A Little Off - That's Okay - The Calibration Will Be Honed Over The Next Couple Rides.
                        
Double Note: If Your Resistance Levels Feel Wildly Off - It's Best To Re-Calibrate. This Can Be Done From The Edit Menu Of Your Profile.
                        `}
                      </Text>
                    </View>
                    <Button
                      text="OK"
                      preset="primary"
                      onPress={onPressContinue2}
                      style={{
                        width: "98%",
                        alignSelf: "center",
                        backgroundColor: color.palette.primaryColor,
                        marginBottom: 50
                      }}
                      textStyle={{
                        color: color.palette.textColor,
                        fontWeight: "400",
                        fontSize: 14
                      }}
                    />
                  </ScrollView>

                </Animated.View>
              )}

              {showText === 2 && (
                <Animated.View
                  style={{
                    opacity: opacity,
                    justifyContent: "flex-start",
                    // marginTop: responsiveHeight(60),
                    flex: 1,
                    paddingBottom: 20
                  }}
                >
                  <View style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 100
                  }}>
                    <Text preset="calibration" style={{
                      fontSize: 19,
                      fontWeight: "600",
                      fontFamily: typography.primaryBold,
                      textTransform: "capitalize"

                      // backgroundColor:"#fff"
                    }}>
                      Turn the resistance knob {"\n"} all the way to the left.
                    </Text>
                  </View>
                  <Button
                    text="OK"
                    preset="primary"
                    onPress={onPressButton}
                    style={{
                      width: "100%",
                      alignSelf: "center",
                      // marginTop: responsiveHeight(113),
                      backgroundColor: color.palette.primaryColor,
                    }}
                    textStyle={{
                      color: color.palette.textColor,
                      fontWeight: "400",
                      fontSize: 14
                    }}
                  />
                </Animated.View>
              )}

              {(showText === 3 || showText === 4) && (
                <Animated.View
                  style={{
                    opacity: opacity,
                    justifyContent: "center",
                    // flex: 1,
                    marginTop: "80%",

                  }}
                >
                  <View style={{ flexDirection: "row", width: "100%" }}>
                    <Card
                      title="CADENCE"
                      preset="resistanceCard"
                      value={cadence}
                      style={{
                        // marginRight: "5%",
                        backgroundColor: "transparent",
                        height: responsiveHeight(150),
                        width: "50%",
                      }}
                    />
                  </View>

                </Animated.View>
              )}

              {((showText >= 3 && showText < 5) || showText === 6) && (
                <Animated.View
                  style={{
                    opacity: opacityCalibrating,
                    alignItems: "center",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    // flex:0.2,
                  }}
                >
                  {/* <View style={{ flexDirection: "row", width: responsiveWidth(150) }}>
                <Card
                  title="CADENCE"
                  preset="resistanceCard"
                  value={cadence}
                  style={{
                    backgroundColor: "transparent",
                    height: responsiveHeight(150),
                    width: "50%",
                  }}
                />
              </View> */}
                  {showText === 3 ? (
                    <Text preset="calibration" style={{
                      width: "90%",
                      fontSize: 19,
                      fontWeight: "600",
                      fontFamily: typography.primaryBold
                    }}>Accelerate To A Cadence {"\n"} Above {initialCadence}</Text>
                  ) : (
                    <Text
                      preset="calibration"
                      style={{
                        alignItems: "center",
                        width: "90%",
                        textAlign: "center",
                        fontSize: 19,
                        fontWeight: "600",
                        fontFamily: typography.primaryBold
                      }}
                    >
                      Adjust Resistance{"\n"}Until Your Cadence Is {Number(targetCadence) - Number(targetRPM)}-{Number(targetCadence) + Number(targetRPM)}
                    </Text>
                  )}
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      marginTop: responsiveHeight(24),
                    }}
                  >
                    <Text style={{ justifyContent: "center", fontSize: 16, color: color.palette.primaryColor }} preset="calibration">
                      Calibrating
                    </Text>
                    <AnimatedEllipsis
                      style={{
                        fontFamily: typography.primary,
                        color: color.palette.primaryColor,
                        fontSize: responsiveFontSize(16),
                        fontWeight: "bold",
                      }}
                    />
                  </View>
                </Animated.View>
              )}

              {showText === 5 && (
                <Animated.View
                  style={{
                    opacity: opacity,
                    justifyContent: "space-between",
                    // height: responsiveHeight(300),
                    marginTop: responsiveHeight(5),
                    flex: 1,
                    paddingBottom: 20
                  }}
                >
                  <View style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingTop: 20 }}>
                    <Text preset="congratulations" style={{
                      color: color.palette.primaryColor,
                      fontSize: 25,
                      marginTop: "50%"

                    }}>Congratulations!</Text>
                    <View
                      style={{
                        justifyContent: "center",
                        marginTop: responsiveHeight(10),
                        // marginBottom: responsiveHeight(110),
                      }}
                    >
                      <Text preset="calibration" style={{ textTransform: "capitalize" }}>calibration complete</Text>
                      <Text preset="calibration" style={{ textTransform: "capitalize" }}>enjoy your ride </Text>
                    </View>
                    <View style={{
                      width: "90%",
                      minWidth: 200,
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 70
                    }}>
                      <Text style={{
                        color: color.palette.textColor,
                        marginBottom: 12,
                        fontSize: 19,
                      }}>Workout Length</Text>
                      {
                        //   timeDurations.map(timeDuration => (
                        // <Pressable key={`${timeDuration}timeDuration`} style={{ flexDirection: "row", marginBottom: 24, width: "100%", justifyContent: "space-between" }} onPress={() => setSelectedDuration(timeDuration)}>
                        //   <Text> {timeDuration} min</Text>
                        //   <View style={{ width: 20, height: 20, borderRadius: 25, borderColor: selectedDuration === timeDuration ? color.palette.primaryColor : color.palette.secondaryColor, borderWidth: 1, justifyContent: "center", alignItems: "center", backgroundColor: selectedDuration === timeDuration ? color.palette.primaryColor : "transparent" }}>
                        //       {selectedDuration === timeDuration && (<Icon icon="checkmarkBold" style={{width: 8 }} />)}
                        //   </View>
                        // </Pressable>
                        //   ))
                      }
                      <Pressable onPress={() => { setLengthModalVisible(true) }} style={{ width: "90%", height: 60, borderWidth: 1, borderColor: "#FAFAFA", borderRadius: 16, display: "flex", justifyContent: "center", alignItems: "center" }} >
                        <Text style={{ fontSize: 16 }}>{duration} min</Text>
                        <Image style={{ position: "absolute", right: 24 }} source={require("./downarrow.png")}></Image>
                      </Pressable>
                    </View>
                  </View>

                  <Button style={{
                    width: "100%",
                    alignSelf: "center",
                    height: 48,
                    // marginTop: responsiveHeight(113),
                    backgroundColor: color.palette.primaryColor,
                  }}
                    textStyle={{
                      color: color.palette.textColor,
                      fontSize: 14,
                      fontWeight: "400"
                    }} preset="primary" text="Begin workout" onPress={onPressWorkout} />
                  {/* <Button preset='secondary' text='Home' onPress={onPressHome}/> */}
                </Animated.View>
              )}
              {showText === "age" && (
                <Animated.View style={{ opacity: opacity, justifyContent: "space-between", flex: 1 }}>
                  <Text preset="calibration" style={{ height: responsiveWidth(50) }}>
                    Plase enter your age
                  </Text>
                  <TextField
                    value={age.toString()}
                    style={{ marginTop: -responsiveWidth(50) }}
                    keyboardType="number-pad"
                    onChangeText={(text) => onSetAge(Number(text))}
                  />
                  <Button
                    text="Continue"
                    preset="primary"
                    onPress={onPressContinue}
                    style={{ width: responsiveWidth(150), alignSelf: "center" }}
                  />
                </Animated.View>
              )}
              {showText === "hr" && (
                <Animated.View style={{ opacity: opacity, justifyContent: "space-between", flex: 1 }}>
                  <Text preset="calibration" style={{ height: responsiveWidth(50) }}>
                    Plase enter your Resting Heartrate
                  </Text>
                  <TextField
                    value={hrr.toString()}
                    style={{ marginTop: -responsiveWidth(24) }}
                    keyboardType="numbers-and-punctuation"
                    onChangeText={(text) => onSerHrR(Number(text))}
                  />
                  <Button
                    text="Continue"
                    preset="primary"
                    onPress={onPressContinue}
                    style={{ width: responsiveWidth(150), alignSelf: "center" }}
                  />
                </Animated.View>
              )}
              {showText === 6 && (
                <Animated.View style={{ opacity: opacity, justifyContent: "space-around", flex: 1 }}>
                  <Text style={{ top: -70 }} preset="calibration">
                    This is taking longer than expected.
                  </Text>
                  <Text style={{ top: -50 }} preset="calibration">
                    Please check that the electrodes are making proper contact.
                  </Text>
                </Animated.View>
              )}

            </View>

          </View>
        </ImageBackground>
        {showLogs && (
          <Observer>
            {() => (
              <ScrollView
                ref={scrollViewRef}
                onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
                style={{
                  position: "absolute",
                  height: responsiveHeight(200),
                  width: responsiveWidth(375),
                  backgroundColor: "grey",
                  left: 0,
                  right: 0,
                  bottom: 0,
                }}
              >
                {logs !== null && logs.map((log, i) => <Text key={i}>{log}</Text>)}
              </ScrollView>
            )}
          </Observer>
        )}
        <Modal
          animationType="slide"
          transparent={true}
          visible={lengthModalVisible}
        // onRequestClose={() => {
        //   Alert.alert("Modal has been closed.");
        //   setModalVisible(!modalVisible);
        // }}
        >
          <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#00000080"
          }}>
            <View style={{
              margin: 20,
              backgroundColor: color.palette.mainBgColor,
              borderRadius: 16,
              paddingVertical: 14,
              paddingHorizontal: 35,
              alignItems: "center",
              width: "70%"
            }}>

              <TouchableOpacity onPress={() => setLengthModalVisible(false)} style={{ position: "absolute", right: 14, top: 14, padding: 10 }}>
                <Image style={{ width: 16, height: 16 }} source={require("./cross.png")}></Image>
              </TouchableOpacity>
              <Text style={{
                marginTop: 32,
                marginBottom: 14,
                fontSize: 19,
                color: color.palette.textColor
              }}>Workout Length</Text>
              {timeDurations.map((ele, i) => (
                <Pressable
                  onPress={() => { setDuration(ele); setLengthModalVisible(false) }}
                  style={{
                    width: "100%",
                    borderTopColor: color.palette.textColor,
                    borderTopWidth: i === 0 ? 0 : 1,
                    paddingVertical: 10,
                    alignItems: "center"
                  }}
                >
                  <Text style={{
                    color: color.palette.textColor,
                    fontSize: 16
                  }}>{ele} min</Text>
                </Pressable>
              ))}
            </View>
          </View>
        </Modal>
      </Screen>
    </View>
  )
}
