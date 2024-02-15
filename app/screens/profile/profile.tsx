import React, { useEffect } from "react"
import { Presentation, DevelopmentToolsProps, DevOption } from "./presentation"
import { observer } from "mobx-react-lite"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { Alert, ToastAndroid, View } from "react-native"
import { captureScreen } from "react-native-view-shot"
// import { useStores } from "../models/root-store"

export const Profile: React.FunctionComponent = observer((props) => {
  // Pull in one of our MST stores
  const { insertProfile, profiles, setSelectedProfile, updateProfile, applicationValues, getVar } = useStores()
  // Pull in navigation via hook
  const navigation = props.navigation
  // return <View/>
  useEffect(() => {
    console.log(props.route.params.data, props.route.params.startWorkout)
  }, [])

  const onContinuePress = (data, isCalibrate) => {
    console.log(JSON.stringify(data, null, 2))
    console.log(JSON.stringify(props.route.params.data, null, 2))
    if (data.name.trim() === "") {
      ToastAndroid.showWithGravityAndOffset(
        "Profile Name is required",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      )
    } else if (data.ridePreference.trim() === "") {
      ToastAndroid.showWithGravityAndOffset(
        "Ride Preference is required",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      )
    } else {
      let ridePreferenceValue = 1

      switch (data.ridePreference) {
        case "Light":
          ridePreferenceValue = 0.9
          break
        case "Average":
          ridePreferenceValue = 1
          break
        case "Heavy":
          ridePreferenceValue = 1.1
      }

      if (props.route.params.data) {
        if (isCalibrate == false) {
          updateProfile("updateProfile", { ...data, anonymous_id: props.route.params.data.anonymous_id, ridePreferenceValue, RLR: props?.route?.params?.data?.RLR || 0 })
        } else {
          updateProfile("updateProfile", { ...data, anonymous_id: props.route.params.data.anonymous_id, ridePreferenceValue, RLR: 0 })
        }
      } else {
        if (isCalibrate == false) {
          insertProfile("newProfile", { ...data, ridePreferenceValue, RLR: props?.route?.params?.data?.RLR || 0})
          setSelectedProfile("setSelectedProfile", { ...data, ridePreferenceValue, RLR: props?.route?.params?.data?.RLR || 0})
        } else {
          insertProfile("newProfile", { ...data, ridePreferenceValue, RLR: 0 })
          setSelectedProfile("setSelectedProfile", { ...data, ridePreferenceValue, RLR: 0 })
        }
      }
      if (props?.route?.params?.startWorkout) {
        if (applicationValues?.resistanceLevelRatio !== 0 && getVar('Always Continue to Calibration') !== 'Yes') {
          navigation.navigate('workoutlength', { next: "workout" })
        } else {
          navigation.navigate('calibration')
        }
      } else {
        navigation.navigate("home")
      }
    }
  }




  const navigateToFeedback = async () => {
    try {
      // Capture the screen
      const uri = await captureScreen({
        format: "png",
        quality: 0.8,
        result: "zip-base64",
      })

      // Store the base64 data to a file
      // const base64Data = uri.replace("data:image/png;base64,", "")
      // const destPath = `${RNFS.DocumentDirectoryPath}/captured_image.png`

      // await RNFS.writeFile(destPath, base64Data, "base64")

      // console.log("Image saved successfully at:", destPath)
      navigation.navigate('feedback', {
        fromScreen: "Profile",
        imageBase64: uri
      })
    } catch (error) {
      console.error("Failed to save image:", error)
    }
  }


  return (
    <Presentation onContinuePress={onContinuePress} profile={props.route.params.data} goBack={() => navigation.goBack()} navigateToFeedback={navigateToFeedback} />
  )
})
