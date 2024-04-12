import * as React from "react"
import { Presentation } from "./presentation"
import { observer } from "mobx-react-lite"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import axios from "axios"
import { captureScreen } from "react-native-view-shot"
import { getCurrentUnixTime } from "../../utils/dateUtils"
import { storeLogs } from "../../services/storage/asyncServices"
// import { useStores } from "../models/root-store"

export const WorkoutFeedback: React.FunctionComponent = observer((props) => {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook

  const {
    postWorkoutFeedback,
    updatePostWorkoutFeedback,
    updateRLRChnage,
    getRLRChnage,
    updateUEL,
    updatePersonalRecord,
    updateProfile,
    selectedProfile,
    personalRecords,
    getProfile,
    applicationValues,
    variables,
    getVar,
  } = useStores()
  const navigation = useNavigation()

  const onPressButton = (sliderValue1) => {
    const sliderValue = sliderValue1 - 2
    const notSentOnline = personalRecords.filter((pr) => !pr.onlineStored)
    const storedPendingChanges = getRLRChnage("GETRLRCHANGE", {})
    console.log(storedPendingChanges, "eiurhfuehriufhurehu")
    const pendingChanges = [...storedPendingChanges] || []
    const datatosend = [
      ...pendingChanges?.reverse(),
      ...notSentOnline
        .map((nso) => {
          const profile = getProfile("GetProfile", nso.profileId)
          return {
            Ride_Length: nso.duration,
            Date: `${new Date(nso.date).getMonth() + 1}/${new Date(nso.date).getDate()}/${new Date(
              nso.date,
            ).getFullYear()}`,
            Ride_Total_Output: nso.total_output,
            RLR: Number(nso.RLR),
            Personal_Record: nso.isPR?.toString(),
            Identifier: nso.profileId,
            Record_Type: "Ride Record",
            Age: profile.age,
            Sex: profile.gender,
            Weight: profile.weight,
            Resting_Heart_Rate: profile.restingHeartRate,
            Stationary_Bike: profile.bike,
            Ride_Preference: profile.ridePreference,
          }
        })
        ?.reverse(),
      {
        Date: `${new Date().getMonth() + 1}/${new Date().getDate()}/${new Date().getFullYear()}`,
        Identifier: selectedProfile.anonymous_id,
        Age: selectedProfile.age,
        Sex: selectedProfile.gender,
        Weight: selectedProfile.weight,
        Resting_Heart_Rate: selectedProfile.restingHeartRate,
        Stationary_Bike: selectedProfile.bike,
        Ride_Preference: selectedProfile.ridePreference,
        Ride_Length: props.route.params.duration,
        RLR: selectedProfile.RLR,
        Post_Workout_Rating: sliderValue,
        // Ride_Total_Output: props.route.params.totalOutput,
        Record_Type: "RLR Change",
      },
    ]
    if (selectedProfile.allow_logs) {
      axios
        .post(
          "https://sheetdb.io/api/v1/aj7xnliblipem",
          {
            data: datatosend,
          },
          { headers: { Authorization: "Bearer 9yxqfka3hx71rb48ho4w9hef92vez8g2rsb7kzrp" } },
        )
        .then((response) => {
          if (response.data.created) {
            notSentOnline.map((nso) => {
              updatePersonalRecord("update Personal Record", nso)
            })
            updateRLRChnage("Updating RLR to", [])
          } else {
            updateRLRChnage("Updating RLR to", [
              ...pendingChanges?.reverse(),
              {
                Date: `${new Date().getMonth() + 1
                  }/${new Date().getDate()}/${new Date().getFullYear()}`,
                Identifier: selectedProfile.anonymous_id,
                Age: selectedProfile.age,
                Sex: selectedProfile.gender,
                Weight: selectedProfile.weight,
                Resting_Heart_Rate: selectedProfile.restingHeartRate,
                Stationary_Bike: selectedProfile.bike,
                Ride_Preference: selectedProfile.ridePreference,
                Ride_Length: props.route.params.duration,
                RLR: selectedProfile.RLR,
                Post_Workout_Rating: sliderValue,
                // Ride_Total_Output: props.route.params.totalOutput,
                Record_Type: "RLR Change",
              },
            ])
          }
        })
        .catch(async (e) => {
          updateRLRChnage("Updating RLR to", [
            ...pendingChanges?.reverse(),
            {
              Date: `${new Date().getMonth() + 1
                }/${new Date().getDate()}/${new Date().getFullYear()}`,
              Identifier: selectedProfile.anonymous_id,
              Age: selectedProfile.age,
              Sex: selectedProfile.gender,
              Weight: selectedProfile.weight,
              Resting_Heart_Rate: selectedProfile.restingHeartRate,
              Stationary_Bike: selectedProfile.bike,
              Ride_Preference: selectedProfile.ridePreference,
              Ride_Length: props.route.params.duration,
              RLR: selectedProfile.RLR,
              Post_Workout_Rating: sliderValue,
              // Ride_Total_Output: props.route.params.totalOutput,
              Record_Type: "RLR Change",
            },
          ])
          console.log(e)
          const createdAt = getCurrentUnixTime()
          await storeLogs(JSON.stringify({
            screen: 'workout-feedback',
            id: 'onPressButton',
            log: e,
            createdAt
          }))

        })
    }

    let data = {
      isRight: false,
      remainingRides: 5,
    }

    let multiplyRLR = 1

    switch (sliderValue) {
      case -2:
        multiplyRLR = 1.15
        break
      case -1:
        multiplyRLR = 1.05
        break
      case 0:
        data = {
          isRight: true,
          remainingRides: 5,
        }
        break
      case 1:
        multiplyRLR = 0.95
        break
      case 2:
        multiplyRLR = 0.85
        break
      default:
        multiplyRLR = 1
        break
    }
    updatePostWorkoutFeedback("option", data)
    updateUEL(Number(selectedProfile.RLR) * multiplyRLR * selectedProfile.ridePreferenceValue)
    updateProfile("Update Profile", {
      ...selectedProfile,
      RLR: Number(selectedProfile.RLR) * multiplyRLR * selectedProfile.ridePreferenceValue,
    })
    navigation.navigate("workouthistory", {
      duration: props.route.params.duration,
      totalOutput: props.route.params.totalOutput,
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

      // Store the base64 data to a file
      // const base64Data = uri.replace("data:image/png;base64,", "")
      // const destPath = `${RNFS.DocumentDirectoryPath}/captured_image.png`

      // await RNFS.writeFile(destPath, base64Data, "base64")

      // console.log("Image saved successfully at:", destPath)
      navigation.navigate("feedback", {
        fromScreen: "Workout Feedback",
        imageBase64: uri,
      })
    } catch (error) {
      console.error("Failed to save image:", error)
    }
  }

  return <Presentation
    onPressButton={onPressButton}
    navigateToFeedback={navigateToFeedback} />
})
