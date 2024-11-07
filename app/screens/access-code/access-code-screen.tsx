import { useIsFocused, useRoute } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { captureScreen } from "react-native-view-shot"
import { useStores } from "../../models"
import SDK from "../../utils/bluetoothSdk"
import { HomeProps, Presentation } from "./presentation"
import { AppContext } from "../../context/appContext"
// import { useStores } from "../models/root-store"¸

export const AccessCode: React.FunctionComponent<HomeProps> = observer((props) => {
  // Pull in one of our MST stores
  const {
    applicationValues,
    getVar,
    resetAppvalues,
    personalRecords,
    insertProfile,
    profiles,
    selectedProfile,
    setSelectedProfile,
  } = useStores()
  // updateOption("data","haa")
  // insertPersonalRecord("dd", {
  //   duration: "10",
  //   total_output: 200,
  //   date: new Date(),
  //   RLR: 100
  // })
  // console.log(personalRecords)
  // Pull in navigation via hook
  const isFocused = useIsFocused()
  const navigation = props.navigation
  const SDKStore = SDK()
  const { subscribeAccessCode } = React.useContext(AppContext)
  const [code, setcode] = React.useState("")




  const navigateToFeedback = async () => {
    try {
      // Capture the screen
      const uri = await captureScreen({
        format: "png",
        quality: 0.8,
        result: "zip-base64",
      })

      navigation.navigate("feedback", {
        fromScreen: "Home",
        imageBase64: uri,
      })
    } catch (error) {
      console.error("Failed to save image:", error)
    }
  }

  const onProceed = async () => {
    if (code) {
      await subscribeAccessCode(code)
    }
  }

  const goBack = () => {
    navigation.goBack()
  }


  return (
    <Presentation
      navigateToFeedback={navigateToFeedback}
      onProceed={onProceed}
      goBack={goBack}
      code={code}
      setcode={setcode}
    />
  )
})
