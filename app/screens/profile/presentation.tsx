/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import * as React from "react"
import { Image, ImageBackground, Picker, ScrollView, TextInput, TouchableOpacity, View, ViewStyle, TouchableWithoutFeedback, Modal, Keyboard, Linking } from "react-native"
import { Button, Checkbox, Icon, Screen, Text, TextField } from "../../components"
import { Dropdown } from "../../components/dropdown/dropdown-component"
// import { useStores } from "../models/root-store"
import { color } from "../../theme"
import DropDownPicker from 'react-native-dropdown-picker'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "../../utils/responsiveDimensions"
import { observer } from "mobx-react-lite"
import { Popable, Popover } from "react-native-popable"
import { flatten } from "ramda"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1
}

function stringGen(len) {
  let text = ""
  const charset = "abcdefghijklmnopqrstuvwxyz0123456789"
  for (let i = 0; i < len; i++) { text += charset.charAt(Math.floor(Math.random() * charset.length)) }
  return text
}

export interface DevelopmentToolsProps {
  goBack: () => void
  profile: () => Record<string, unknown>
  onContinuePress: () => void
  navigateToFeedback: () => void
}

export const Presentation = observer(({
  goBack, profile, onContinuePress, navigateToFeedback
}: DevelopmentToolsProps) => {
  const [profileName, setProfileName] = React.useState("")
  const [controllers, setControllers] = React.useState([])
  const [age, setAge] = React.useState(null)
  const [weight, setWeight] = React.useState(null)
  const [anonymousId, setAnonymousId] = React.useState(stringGen(8))

  const [gender, setGender] = React.useState("")
  const [heartRatio, setHeartRatio] = React.useState(null)
  const [ridePreference, setRidePreference] = React.useState("Average")
  const [bike, setBike] = React.useState("")
  const [idPopOver, setIdPopOver] = React.useState(false)
  const [howModal, setHowModal] = React.useState(false)
  const [isAllowed, setIsAllowed] = React.useState(true)
  const [isKeyboardVisible, setKeyboardVisible] = React.useState(false)

  const updateControllers = (instance) => {
    setControllers(prevState => [...prevState, instance])
  }

  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true) // or some other action
      }
    )
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false) // or some other action
      }
    )

    return () => {
      keyboardDidHideListener.remove()
      keyboardDidShowListener.remove()
    }
  }, [])

  React.useEffect(() => {
    console.log(profile)
    if (profile) {
      setProfileName(profile.name)
      setAge(profile.age)
      setWeight(profile.weight)
      setGender(profile.gender)
      setHeartRatio(profile.restingHeartRate)
      setRidePreference(profile.ridePreference)
      setBike(profile.bike)
      setAnonymousId(profile.anonymous_id)
      setIsAllowed(profile.allow_logs)
    }
  }, [])

  const closeDropdown = () => {
    controllers.map(controller => {
      controller.close()
    })
  }

  return (
    <TouchableWithoutFeedback onPress={closeDropdown} style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Screen style={ROOT}>
          {/* <View style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",

        }}>

        <TouchableOpacity style={{ marginLeft: 20, padding: 10 }} onPress={goBack}>

        <Image source={require("../../../assets/backArrow.png")} ></Image>
        </TouchableOpacity>
          <Text preset='header' text="Profile" style={{ margin: 20, marginLeft: -20, alignSelf: 'center', fontSize: 16 }}/>
          <View></View>
        </View> */}
          <View style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",

          }}>
            <View style={{
              flexDirection: "row",
              marginVertical: 20,
              alignItems: "center"
            }}>

              <TouchableOpacity style={{ marginLeft: -20, borderWidth: 1, borderColor: "#0399A5", borderRadius: 21, width: 21, height: 21, justifyContent: "center", alignItems: "center" }} onPress={goBack}>

                <Image source={require("../../../assets/backArrow.png")} style={{
                  width: 6,
                }} ></Image>
              </TouchableOpacity>
              <Text preset='header' text="Profile" style={{ marginLeft: 12, alignSelf: 'center', fontSize: 16 }} />
            </View>
          </View>


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
          {/* <View style={{ borderColor: color.primaryDarker, borderBottomWidth: 2 }}/> */}
          <ImageBackground imageStyle={{ alignSelf: "center", resizeMode: "contain", left: "17.5%", width: "65%" }} style={{ flex: 1, padding: responsiveWidth(20) }} source={require("../../../assets/bgLogo.png")}>

            <ScrollView style={{ width: '100%', flex: 1 }} contentContainerStyle={{ paddingBottom: 20, }}>
              <TouchableOpacity activeOpacity={1} onPress={closeDropdown}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12 }}>
                  <View>
                    <Text style={{ fontSize: responsiveFontSize(14), }}>Profile Name *</Text>
                    <Text style={{ fontSize: responsiveFontSize(10), color: "#4F5153" }}>Max 10 characters</Text>
                  </View>
                  <TextInput
                    maxLength={10}
                    value={profileName}
                    onChangeText={(value) => { setProfileName(value) }}
                    placeholderTextColor={color.palette.lighterGrey}
                    underlineColorAndroid={color.transparent}
                    style={{ backgroundColor: color.palette.textColor, color: "#000", width: 208, borderRadius: 8, fontSize: 14, paddingVertical: 3, paddingHorizontal: 10 }}
                  />
                </View>
                <View style={{ width: '100%', borderBottomWidth: 1, borderColor: color.line, opacity: 0.2 }} />

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12 }}>
                  <Text style={{ fontSize: responsiveFontSize(14), }}>Age</Text>
                  <TextInput
                    keyboardType="numeric"
                    value={(age === null) ? "" : age.toString()}
                    onChangeText={(value) => { setAge(value) }}
                    placeholderTextColor={color.palette.lighterGrey}
                    underlineColorAndroid={color.transparent}
                    style={{ backgroundColor: color.palette.textColor, color: "#000", width: 208, borderRadius: 8, fontSize: 14, paddingVertical: 3, paddingHorizontal: 10 }}
                  />
                </View>
                <View style={{ width: '100%', borderBottomWidth: 1, borderColor: color.line, opacity: 0.2 }} />

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12 }}>
                  <Text style={{ fontSize: responsiveFontSize(14), }}>Sex</Text>
                  <Dropdown updateControllers={updateControllers} placeholder="Select Sex" value={gender} items={["Male", "Female"]} onValueChange={(value) => { setGender(value) }} style={{ paddingVertical: 3, minWidth: 208, maxWidth: 208, height: "auto" }} />
                </View>

                <View style={{ width: '100%', borderBottomWidth: 1, borderColor: color.line, opacity: 0.2 }} />

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12 }}>
                  <Text style={{ fontSize: responsiveFontSize(14), }}>Weight</Text>
                  <TextInput
                    keyboardType="numeric"
                    value={(weight === null) ? "" : weight?.toString()}
                    onChangeText={(value) => { setWeight(value) }}
                    placeholderTextColor={color.palette.lighterGrey}
                    underlineColorAndroid={color.transparent}
                    style={{ backgroundColor: color.palette.textColor, color: "#000", width: 208, borderRadius: 8, fontSize: 14, paddingVertical: 3, paddingHorizontal: 10 }}
                  />
                </View>

                <View style={{ width: '100%', borderBottomWidth: 1, borderColor: color.line, opacity: 0.2 }} />

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12 }}>
                  <Text style={{ fontSize: responsiveFontSize(14), }}>Resting Heart Rate</Text>
                  <TextInput
                    keyboardType="numeric"
                    value={(heartRatio === null) ? "" : heartRatio.toString()}
                    onChangeText={(value) => { setHeartRatio(value) }}
                    placeholderTextColor={color.palette.lighterGrey}
                    underlineColorAndroid={color.transparent}
                    style={{ backgroundColor: color.palette.textColor, color: "#000", width: 208, borderRadius: 8, fontSize: 14, paddingVertical: 3, paddingHorizontal: 10 }}
                  />
                </View>
                <View style={{ width: '100%', borderBottomWidth: 1, borderColor: color.line, opacity: 0.2 }} />

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12 }}>
                  <Text style={{ fontSize: responsiveFontSize(14), }}>Ride Preference *</Text>
                  <Dropdown updateControllers={updateControllers} value={ridePreference} items={["Light", "Average", "Heavy"]} onValueChange={(value) => { setRidePreference(value) }} style={{ paddingVertical: 3, minWidth: 208, maxWidth: 208, height: "auto" }} />
                </View>
                <View style={{ width: '100%', borderBottomWidth: 1, borderColor: color.line, opacity: 0.2 }} />

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12 }}>
                  <Text style={{ fontSize: responsiveFontSize(14), }}>Stationary Bike</Text>
                  <TextInput
                    value={bike}
                    onChangeText={(value) => { setBike(value) }}
                    placeholderTextColor={color.palette.lighterGrey}
                    underlineColorAndroid={color.transparent}
                    style={{ backgroundColor: color.palette.textColor, color: "#000", width: 208, borderRadius: 8, fontSize: 14, paddingVertical: 3, paddingHorizontal: 10 }}
                  />
                </View>

                <View style={{ width: '100%', borderBottomWidth: 1, borderColor: color.line, opacity: 0.2 }} />

                <View style={{paddingBottom: 12}}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 12, paddingBottom:6 }}>
                    <Text style={{ fontSize: responsiveFontSize(14), }}>Anonymous ID</Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                      <Text
                        style={{ color: "#A2ABB8", fontWeight: "500", width: 208 - 15, borderRadius: 8, fontSize: 14, paddingVertical: 3, paddingHorizontal: 10, textAlign:'center' }}
                      >
                        {anonymousId}
                      </Text>
                      {/* <View style={{position:"relative"}}> */}
                      <Popable backgroundColor={color.palette.mainBgColor} style={{ width: 300,borderRadius: 16 }} position="left" content={<View style={{
                        // margin: 20,
                        backgroundColor: color.palette.mainBgColor,
                        borderRadius: 16,
                        paddingVertical: 14,
                        paddingHorizontal: 14,
                        alignItems: "center",
                        borderWidth: 1,
                        borderColor: color.palette.primaryColor
                      }}>
                        <Text style={{
                          fontSize: 13,
                          fontWeight: "500",
                          textAlign: "auto"
                        }}>
                          {`This Randomized Anonymous Identifier can be used to restore your ride history, log bugs, or anonymously collect calibration statistics to improve the calibration process.

We do NOT know what user’s Anonymous IDs are associated with your app or Play account.
                      
This ID CANNOT be used to identify you.
                      
You can however, request the removal of specific Anonymous ID information from our logs at any time`}
                        </Text>
                      </View>}>
                        <Text style={{ color: "#fff", fontWeight: "900", backgroundColor: "#0399A5", paddingHorizontal: 8, borderRadius: 40, fontSize: 14 }}>?</Text>
                      </Popable>
                      {/* <TouchableOpacity onPress={() => { setIdPopOver(prevState => !prevState) }}>
                    <Text style={{ color: "#fff", fontWeight: "900", backgroundColor: "#0399A5", paddingHorizontal: 8, borderRadius: 40, fontSize: 14 }}>?</Text>
                </TouchableOpacity>
                 <Popover position="left" caretPosition="right" visible={idPopOver}>@morning_cafe</Popover> */}
                      {/* </View> */}

                    </View>
                  </View>
                  <Text style={{ fontSize: responsiveFontSize(10), color: "#FAFAFA", fontWeight: "500",}}>{`Save this ID. It is required to restore your ride history from backup.`}</Text>
                </View>

                <View style={{ width: '100%', borderBottomWidth: 1, borderColor: color.line, opacity: 0.2 }} />

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 15 }}>
                  <Text style={{ fontSize: responsiveFontSize(12), color: "#A2ABB8", fontWeight: "500", width: '85%' }}>{`How this information is used in the app`}</Text>
                  <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Popable caretPosition="right" backgroundColor={color.palette.mainBgColor} style={{ width: 300,borderRadius: 16 }} position="left" content={<View style={{
                      // margin: 20,
                      backgroundColor: color.palette.mainBgColor,
                      borderRadius: 16,
                      paddingVertical: 14,
                      paddingHorizontal: 14,
                      alignItems: "center",
                      borderWidth: 1,
                      borderColor: color.palette.primaryColor
                    }}>
                      <Text style={{
                        fontSize: 13,
                        fontWeight: "500",
                        textAlign: "auto"
                      }}>All this information can help improve the accuracy of our calibration process. {'\n'}{'\n'}Additionally it is used for calculating Caloric Burn & Heart Rate Zones.</Text>
                    </View>}>
                      <Text style={{ color: "#fff", fontWeight: "900", backgroundColor: "#0399A5", paddingHorizontal: 8, borderRadius: 40, fontSize: 14 }}>?</Text>
                    </Popable>
                    {/* <TouchableOpacity onPress={() => { setHowModal(prevState => !prevState) }}>

                <Text style={{ color: "#fff", fontWeight: "900", backgroundColor: "#0399A5", paddingHorizontal: 8, borderRadius: 40, fontSize: 14 }}>?</Text>
                </TouchableOpacity> */}
                  </View>
                </View>

                <View style={{ width: '100%', borderBottomWidth: 1, borderColor: color.line, opacity: 0.2 }} />

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12 }}>
                  <TouchableWithoutFeedback onPress={() => { setIsAllowed(prevState => !prevState) }}>


                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Popable caretPosition="right" backgroundColor={color.palette.mainBgColor} style={{ width: 300 ,borderRadius: 16,}} position="right" content={<View style={{
                          backgroundColor: color.palette.mainBgColor,
                          borderRadius: 16,
                          paddingVertical: 14,
                          paddingHorizontal: 14,
                          alignItems: "center",
                          borderWidth: 1,
                          borderColor: color.palette.primaryColor,
                        }}>
                          <Text style={{
                            fontSize: 13,
                            fontWeight: "500",
                            textAlign: "auto"
                          }}>{`Your ride history and personalized calibrations will be backed up and associated with your Anonymous ID.

To restore your ride history and calibrations you’ll need to provide your Anonymous ID. Please store this somewhere where you can access it should you lose access to your phone.`}</Text>
                        </View>}>
                          <Text style={{ color: "#fff", fontWeight: "900", backgroundColor: "#0399A5", paddingHorizontal: 8, borderRadius: 40, fontSize: 14 }}>?</Text>
                        </Popable>
                      </View>

                      <Text style={{ fontSize: responsiveFontSize(12), color: "#FAFAFA", fontWeight: "500", paddingLeft: 10 }}>Enable ride history & calibration backups</Text>
                    
                    </View>

                  </TouchableWithoutFeedback>
                  <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Checkbox outlineStyle={{
                      width: 30,
                      height: 30,
                      borderRadius: 6,
                      borderColor: isAllowed ? "#0399A5" : "#fff"
                    }}

                      fillStyle={{
                        width: 20,
                        height: 20,
                        borderRadius: 3,
                        backgroundColor: "#0399A5",
                      }} onToggle={() => { setIsAllowed(prevState => !prevState) }} value={isAllowed} />
                  </View>
                </View>

                <Text style={{
                  fontSize: 13, marginTop: 24, paddingHorizontal: 15
                }}>
                  By creating a profile I have read and agree to the  {" "}
                  <Text onPress={() => { Linking.openURL('https://www.dialedresistance.com/terms-conditions') }} style={{ fontSize: 13, color: "#4D8EFF", textDecorationLine: "underline" }}>Terms & Conditions</Text> and <Text onPress={() => { Linking.openURL('https://www.dialedresistance.com/privacy-policy') }} style={{ fontSize: 13, color: "#4D8EFF", textDecorationLine: "underline" }}>Privacy Policy </Text>
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </ImageBackground>
          <View style={{ marginHorizontal: 10, marginVertical: 20, display: isKeyboardVisible ? "none" : "flex" }}>

            {/* BUTTONS */}
            <View style={{
              flexDirection: 'row',
              borderWidth: 2,
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <Button text='Recalibrate' preset='primary' onPress={() => {
                onContinuePress({
                  name: profileName,
                  age: age ? Number(age) : null,
                  gender,
                  restingHeartRate: heartRatio ? Number(heartRatio) : null,
                  ridePreference,
                  bike,
                  id: Math.floor(Math.random() * 1000),
                  anonymous_id: anonymousId,
                  weight: weight ? Number(weight) : null,
                  allow_logs: isAllowed
                }, true)
              }} style={{
                width: "38%",
                alignSelf: "center",
                borderColor: color.palette.primaryColor,
                borderWidth: 2,
                backgroundColor: 'rgba(0,0,0,0)'
              }}
                textStyle={{
                  color: color.palette.textColor,
                  fontWeight: "500",
                  fontSize: 14
                }} />

              <Button text='Save' preset='primary' onPress={() => {
                onContinuePress({
                  name: profileName,
                  age: age ? Number(age) : null,
                  gender,
                  restingHeartRate: heartRatio ? Number(heartRatio) : null,
                  ridePreference,
                  bike,
                  id: Math.floor(Math.random() * 1000),
                  anonymous_id: anonymousId,
                  weight: weight ? Number(weight) : null,
                  allow_logs: isAllowed
                }, false)
              }} style={{
                width: "60%",
                alignSelf: "center",
                backgroundColor: color.palette.primaryColor,
                borderColor: color.palette.primaryColor,
                borderWidth: 2,
              }}
                textStyle={{
                  color: color.palette.textColor,
                  fontWeight: "500",
                  fontSize: 14
                }} />
            </View>

            {/* END */}

          </View>

          {/* <Modal
        animationType="slide"
        transparent={true}
        // visible={idPopOver}
        visible={false}
        // onRequestClose={() => {
        //   Alert.alert("Modal has been closed.");
        //   setModalVisible(!modalVisible);
        // }}
      >
        <View style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#00000095"
        }}>
                <View style={{
                  margin: 20,
                  backgroundColor: color.palette.mainBgColor,
                  borderRadius: 16,
                  paddingVertical: 14,
                  paddingHorizontal: 14,
                  alignItems: "center",
                  width: "70%",
                  borderWidth: 1,
                  // borderColor: color.palette.primaryColor
                }}>

                  <TouchableOpacity style={{ position: "absolute", right: 24, top: 24 }} onPress={ () => { setIdPopOver(false) }}>
                    <Image style={{ width: 16, height: 16 }} source={require("./cross.png")}></Image>
                  </TouchableOpacity>
               <Text style={{
                 fontSize: 11,
                 fontWeight: "500",
                 marginTop: 36,
                 textAlign: "auto"
               }}>This Randomized Anonymous Identifier will  be used to log bugs and anonymously collect calibration statistics to improve the calibration process. We do NOT know what user’s Anonymous IDs are associate to it and this  CANNOT be used to identify you. You can however, request the removal ofyour specific Anonymous ID information from our logs at any time
</Text>

      
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={howModal}
        // onRequestClose={() => {
        //   Alert.alert("Modal has been closed.");
        //   setModalVisible(!modalVisible);
        // }}
      >
        <View style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#00000095"
        }}>
                <View style={{
                  margin: 20,
                  backgroundColor: color.palette.mainBgColor,
                  borderRadius: 16,
                  paddingVertical: 14,
                  paddingHorizontal: 14,
                  alignItems: "center",
                  width: "70%",
                  borderWidth: 1,
                  // borderColor: color.palette.primaryColor
                }}>

                  <TouchableOpacity style={{ position: "absolute", right: 24, top: 24 }} onPress={ () => { setHowModal(false) }}>
                    <Image style={{ width: 16, height: 16 }} source={require("./cross.png")}></Image>
                  </TouchableOpacity>
               <Text style={{
                 fontSize: 11,
                 fontWeight: "500",
                 marginTop: 36,
                 textAlign: "auto"
               }}>All this information can help improve the accuracy of our calibration process.
{"\n"} {"\n"}
Additionally:
{"\n"} {"\n"}
Age / Sex / Weight is used to calculate Caloric burn. {"\n"} {"\n"}

Age / Resting Heart Rate is used to calculate Heart Rate Zones.
</Text>

          </View>
        </View>
      </Modal> */}

        </Screen>
      </View>
    </TouchableWithoutFeedback>
  )
})
