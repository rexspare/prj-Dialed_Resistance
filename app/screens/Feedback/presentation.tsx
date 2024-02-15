/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import * as React from "react"
import { Image, ImageBackground, Picker, ScrollView, TextInput, TouchableOpacity, View, ViewStyle, TouchableWithoutFeedback, Modal, Keyboard, Linking, Pressable, ActivityIndicator } from "react-native"
import { Button, Checkbox, Icon, Screen, Text, TextField } from "../../components"
import { Dropdown } from "../../components/dropdown/dropdown-component"
// import { useStores } from "../models/root-store"
import { color } from "../../theme"
import DropDownPicker from 'react-native-dropdown-picker'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "../../utils/responsiveDimensions"
import { observer } from "mobx-react-lite"
import { Popable, Popover } from "react-native-popable"

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
}

export const Presentation = observer(({
  goBack, profile, onContinuePress
}: DevelopmentToolsProps) => {
  const [profileName, setProfileName] = React.useState("")
  const [controllers, setControllers] = React.useState([])
  const [age, setAge] = React.useState(null)
  const [weight, setWeight] = React.useState(null)
  const [anonymousId, setAnonymousId] = React.useState(stringGen(8))

  const [gender, setGender] = React.useState("")

  const [category, setCategory] = React.useState("")
  const [urgency, setUrgency] = React.useState("")
  const [feedback, setFeedback] = React.useState("")
  const [includeScreenshot, setIncludeScreenshot] = React.useState(false)
  const [contactMe, setContactMe] = React.useState(false)
  const [email, setEmail] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)


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
          <View style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",

          }}>
            <View style={{
              flexDirection: "row",
              marginVertical: 20,
              alignItems: "center",
              justifyContent: "center"
            }}>

              <TouchableOpacity style={{ marginLeft: -20, borderWidth: 1, borderColor: "#0399A5", borderRadius: 21, width: 21, height: 21, justifyContent: "center", alignItems: "center" }} onPress={goBack}>

                <Image source={require("../../../assets/backArrow.png")} style={{
                  width: 6,
                }} ></Image>
              </TouchableOpacity>
              <Text preset='header' text="Feedback" style={{ marginLeft: 12, alignSelf: 'center', fontSize: 16 }} />
            </View>
          </View>
          {/* <View style={{ borderColor: color.primaryDarker, borderBottomWidth: 2 }}/> */}
          <ImageBackground imageStyle={{ alignSelf: "center", resizeMode: "contain", left: "17.5%", width: "65%" }} style={{ flex: 1, padding: responsiveWidth(20) }} source={require("../../../assets/bgLogo.png")}>

            <ScrollView style={{ width: '100%', flex: 1 }} contentContainerStyle={{ paddingBottom: 20, }}>
              <TouchableOpacity activeOpacity={1} onPress={closeDropdown}>
                {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12 }}>
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
              <View style={{ width: '100%', borderBottomWidth: 1, borderColor: color.line, opacity: 0.2 }}/>

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
              <View style={{ width: '100%', borderBottomWidth: 1, borderColor: color.line, opacity: 0.2 }}/> */}

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12 }}>
                  <Text style={{ fontSize: responsiveFontSize(14), }}>Category *</Text>
                  <Dropdown updateControllers={updateControllers} placeholder="Select Category" value={category} items={[
                    "Bug",
                    "Feature Request",
                    "Questions",
                    "Feedback",
                    "Data Deletion Request"
                  ]} onValueChange={(value) => { setCategory(value) }} style={{ paddingVertical: 3, minWidth: 208, maxWidth: 208, height: "auto" }} />
                </View>

                {/* <View style={{ width: '100%', borderBottomWidth: 1, borderColor: color.line, opacity: 0.2 }}/> */}

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12 }}>
                  <Text style={{ fontSize: responsiveFontSize(14), }}>Urgency *</Text>
                  <Dropdown updateControllers={updateControllers} placeholder="Select Urgency" value={urgency} items={[
                    "Trivial",
                    "Minor",
                    "Major",
                    "Unable to use app"

                  ]} onValueChange={(value) => { setUrgency(value) }} style={{ paddingVertical: 3, minWidth: 208, maxWidth: 208, height: "auto" }} />
                </View>

                {/* <View style={{ width: '100%', borderBottomWidth: 1, borderColor: color.line, opacity: 0.2 }}/> */}

                <View style={{ paddingVertical: 12 }}>
                  <Text style={{ fontSize: responsiveFontSize(14), }}>Feedback *</Text>
                  <TextInput
                    maxLength={300}
                    multiline={true}
                    numberOfLines={8}
                    value={feedback}
                    onChangeText={(value) => { setFeedback(value) }}
                    placeholderTextColor={color.palette.lighterGrey}
                    underlineColorAndroid={color.transparent}
                    style={{ backgroundColor: color.palette.textColor, color: "#000", width: "100%", borderRadius: 8, fontSize: 12, paddingVertical: 3, paddingHorizontal: 10, marginTop: 16, textAlignVertical: 'top', }}
                  />
                </View>

                {/* <View style={{ width: '100%', borderBottomWidth: 1, borderColor: color.line, opacity: 0.2 }}/> */}

                {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12 }}>
                <Text style={{ fontSize: responsiveFontSize(14), }}>Resting Heart Rate</Text> */}
                {/* <Pressable style={{ flexDirection: "row", marginBottom: 24, width: "100%", justifyContent: "space-between", marginTop: 12 }} onPress={() => setIncludeScreenshot(prevState => !prevState)}>
                    <View style={{ flex: 0.8 }}>
                      <Text>Include Screenshot</Text>
                    <Text style={{ fontSize: 10 }}>If including screenshot- data may be used</Text>
                    </View>
                    <View style={{ width: 20, height: 20, borderRadius: 25, borderColor: includeScreenshot ? color.palette.primaryColor : color.palette.secondaryColor, borderWidth: 1, justifyContent: "center", alignItems: "center", backgroundColor: includeScreenshot ? color.palette.primaryColor : "transparent" }}>
                        {includeScreenshot && <Icon icon="checkmarkBold" style={{ width: 30 }} />}
                    </View>
                  </Pressable> */}

                <Pressable style={{ flexDirection: "row", marginBottom: 24, width: "100%", justifyContent: "space-between", marginTop: 12 }} onPress={() => setContactMe(prevState => !prevState)}>
                  <View style={{ flex: 0.8 }}>
                    <Text>Contact me about this</Text>
                    <Text style={{ fontSize: 10 }}>We may reach our for more details, to troubleshoot, or to let you know when new software with your request is ready.</Text>
                  </View>
                  <View style={{ width: 20, height: 20, borderRadius: 25, borderColor: contactMe ? color.palette.primaryColor : color.palette.secondaryColor, borderWidth: 1, justifyContent: "center", alignItems: "center", backgroundColor: contactMe ? color.palette.primaryColor : "transparent" }}>
                    {contactMe && <Icon icon="checkmarkBold" style={{ width: 30 }} />}
                  </View>
                </Pressable>
                {/* </View> */}
                {/* <View style={{ width: '100%', borderBottomWidth: 1, borderColor: color.line, opacity: 0.2 }}/> */}

                {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12 }}>
                <Text style={{ fontSize: responsiveFontSize(14), }}>Ride Preference *</Text>
                 <Dropdown updateControllers={updateControllers} value={ridePreference} items={["Light", "Average", "Heavy"]} onValueChange={(value) => { setRidePreference(value) }} style={{ paddingVertical: 3, minWidth: 208, maxWidth: 208, height: "auto" }} />
              </View>
              <View style={{ width: '100%', borderBottomWidth: 1, borderColor: color.line, opacity: 0.2 }}/> */}

                {contactMe &&
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 12 }}>
                    <Text style={{ fontSize: responsiveFontSize(14), color: "#88939E" }}>Email:</Text>
                    <TextInput
                      value={email}
                      onChangeText={(value) => { setEmail(value) }}
                      placeholderTextColor={color.palette.lighterGrey}
                      underlineColorAndroid={color.transparent}
                      style={{ backgroundColor: color.palette.textColor, color: "#000", width: 208, borderRadius: 8, fontSize: 14, paddingVertical: 3, paddingHorizontal: 10, marginLeft: 12 }}
                    />
                  </View>
                }

              </TouchableOpacity>
            </ScrollView>
          </ImageBackground>
          <View style={{ marginHorizontal: 10, marginVertical: 20, display: isKeyboardVisible ? "none" : "flex" }}>
            <Button text='Submit' preset='primary' onPress={() => {
              onContinuePress({
                category,
                urgency,
                feedback,
                includeScreenshot,
                contactMe,
                email,
              }, setIsLoading)
            }} style={{
              width: "100%",
              alignSelf: "center",
              backgroundColor: color.palette.primaryColor,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center"
            }}
              textStyle={{
                color: color.palette.textColor,
                fontWeight: "400",
                fontSize: 14
              }} >
              {
                isLoading &&
                <ActivityIndicator
                  size="small"
                  color="#fff"
                  style={{ marginRight: 16 }} />
              }
              <Text text="Submit" /></Button>
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
