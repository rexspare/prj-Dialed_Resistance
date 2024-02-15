import * as React from "react"
import { Presentation } from "./presentation"
import { observer } from "mobx-react-lite"
import { useNavigation } from "@react-navigation/core"
import { captureScreen } from "react-native-view-shot"
// import { useStores } from "../models/root-store"

export const WorkoutLength: React.FunctionComponent = observer((props) => {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()

  


   const navigateToFeedback = async() => {
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
        fromScreen: "Workout Length",
        imageBase64: uri
      })
    } catch (error) {
      console.error("Failed to save image:", error)
    }
  }

  return (
    <Presentation onPressButton={(duration) => navigation.navigate(props.route?.params?.next, { duration })} navigateToFeedback={navigateToFeedback} />
  )
})
