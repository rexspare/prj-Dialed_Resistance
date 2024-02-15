/* eslint-disable react-native/no-inline-styles */
import * as React from "react"
import { Animated, Image, ImageBackground, Modal, Pressable, TouchableOpacity, View, ViewStyle } from "react-native"
import { TextInput } from "react-native-gesture-handler"
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

const timeDurations = [10, 15, 20, 30, 45, 60, 75, 90]

export const Presentation = ({
  onPressButton,
  navigateToFeedback
}:ResistancePromptProps) => {
  const [step, setStep] = React.useState(0)
  const [selectedDuration, setSelectedDuration] = React.useState(10)
  const [lengthModalVisible, setLengthModalVisible] = React.useState(false)

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
        <Text preset='header' text="Starting Workout" style={{ margin: 20, alignSelf: 'center', fontSize: 16 }}/>
        {/* <View style={{ borderColor: color.primaryDarker, borderBottomWidth: 2 }} /> */}
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <View style={{ flex: 1, paddingBottom: 20, paddingHorizontal: 10 }}>
          <ImageBackground imageStyle={{ alignSelf: "center", resizeMode: "contain", left: "17.5%", width: "65%" }} style={{ width: "100%", flex: 1 }} source={require("../../../assets/bgLogo.png")}>
                 <Animated.View style={{ justifyContent: 'space-between', alignItems: "center", flex: 1 }}>
                <View></View>
                <View style={{
                  width: "90%",
                  minWidth: 200,
                  justifyContent: "center",
                  alignItems: "center"
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
                  <Pressable onPress={()=>{setLengthModalVisible(true)}} style={{width:"90%",height:60,borderWidth:1,borderColor:"#FAFAFA",borderRadius:16,display:"flex",justifyContent:"center",alignItems:"center"}} >
                    <Text style={{fontSize:16}}>{selectedDuration} min</Text>
                    <Image style={{position:"absolute", right: 24}} source={require("./downarrow.png")}></Image>
                  </Pressable>
                  <Text style={{marginTop: 47, textAlign:"center",fontSize: 19, textTransform:"capitalize"}}>
                    Please turn  resistance knob all {"\n"} the way to the left {"\n"} press Continue to begin your ride
                  </Text>
                </View>
                <Button text='Continue' preset='primary' onPress={() => { onPressButton(selectedDuration) }}
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

              <TouchableOpacity onPress={() => setLengthModalVisible(false)} style={{ position: "absolute", right: 14, top: 14,padding:10 }}>
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
              onPress={() => {setSelectedDuration(ele);setLengthModalVisible(false)}}
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
