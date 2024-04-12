import * as React from "react"
import { Presentation } from "./presentation"
import { observer } from "mobx-react-lite"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { captureScreen } from "react-native-view-shot"
// import { useStores } from "../models/root-store"

export const WorkoutHistory: React.FunctionComponent = observer((props) => {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  const { personalRecords, selectedProfile, getRLRChnage } = useStores()

  // Pull in navigation via hook

  const navigation = useNavigation()

  const onPressButton = () => {
    navigation.navigate("home")
  }

  const onFeedbackPressButton = () => {
    navigation.navigate("workoutfeedback", {
      duration: props?.route?.params?.duration,
      totalOutput: props?.route?.params?.duration?.totalOutput,
      next: "home",
    })
  }

  const navigateToFeedback = async () => {
    try {
      // Capture the screen
      const uri = await captureScreen({
        format: "png",
        quality: 0.8,
        result: "zip-base64",
      })

      navigation.navigate("feedback", {
        fromScreen: "Workout History",
        imageBase64: uri,
      })
    } catch (error) {
      console.error("Failed to save image:", error)
    }
  }

  return (
    <Presentation
      selectedProfile={selectedProfile}
      onPressButton={onPressButton}
      onFeedbackPressButton={onFeedbackPressButton}
      personalRecords={personalRecords}
      duration={props.route?.params?.duration}
      navigateToFeedback={navigateToFeedback}
      getRLRChnage={getRLRChnage}
    />
  )
})
