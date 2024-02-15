import * as React from "react"
import { Presentation, WorkoutProps } from "./presentation"
import { observer } from "mobx-react-lite"
import SDK, { SDKContext } from "../../utils/bluetoothSdk"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { Alert } from "react-native"
import axios from "axios"
import { captureScreen } from "react-native-view-shot"
import { getCurrentUnixTime } from "../../utils/dateUtils"
import { storeLogs } from "../../services/storage/asyncServices"
// import { useStores } from "../models/root-store"

function formatSecondsToTime(seconds) {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60

  const formattedHours = hours.toString().padStart(2, "0")
  const formattedMinutes = minutes.toString().padStart(2, "0")
  const formattedSeconds = remainingSeconds.toString().padStart(2, "0")

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
}

export const Workout: React.FunctionComponent<WorkoutProps> = observer((props) => {
  // Pull in one of our MST stores
  const { params } = props.route
  const {
    applicationValues,
    insertPersonalRecord,
    updatePersonalRecord,
    personalRecords,
    postWorkoutFeedback,
    updatePostWorkoutFeedback,
    updateRLRChnage,
    getRLRChnage,
    getVar,
    getProfile,
    selectedProfile,
    variables
  } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()
  const { subscribe, disconnect, connected } = SDK()
  const error = subscribe("heartRateError")

  const [power, setPower] = React.useState(0)
  const [totalOutput, setTotalOutput] = React.useState(0)
  const [powerHistory, setPowerHistory] = React.useState([])
  const [personalRecord, setPersonalRecord] = React.useState({})
  const [timeInRide, setTimeInRide] = React.useState(0)

  React.useEffect(() => {
    const timeInRideInterval = setInterval(() => {
      setTimeInRide((prevState) => prevState + 1)
    }, 1000)
    return () => {
      clearInterval(timeInRideInterval)
    }
  }, [])

  React.useEffect(() => {
    const durationData = personalRecords.filter(
      (pr) => pr.duration === params.duration && pr.profileId === selectedProfile.anonymous_id,
    )
    const sortedRecords = durationData.sort((a, b) => b.total_output - a.total_output)
    setPersonalRecord(sortedRecords[0] ? sortedRecords[0] : {})

    const updatePower = () => {
      const data =
        (Number(subscribe("cadence")) * applicationValues?.resistanceLevel * selectedProfile.RLR) /
        1000
      setPower(isNaN(data) ? 0 : data)

      setTimeout(updatePower, 1000)
    }

    updatePower()

    // const powerInterval = setInterval(() => {
    //   var data = (Number(subscribe("cadence")) * applicationValues?.resistanceLevel * selectedProfile.RLR) / 1000
    //   setPower(isNaN(data) ? 0 : data)
    // }, 1000)
    // return () => {
    //   clearInterval(powerInterval)
    // }
  }, [])

  React.useEffect(() => {
    setPowerHistory((prevState) => [...prevState, power])
  }, [power])

  React.useEffect(() => {
    const data = Math.floor(powerHistory.reduce((partialSum, a) => partialSum + a, 0) / 1000)
    setTotalOutput(isNaN(data) ? 0 : data)
  }, [powerHistory])
  // React.useEffect(() => {
  //   if (!subscribe('heartRate')) {
  //     Alert.alert(subscribe('heartRateError').toString(), '', [{ text: 'ok', onPress: () => navigation.navigate('home') }])
  //   }
  // }, [])



  const onRideComplete = () => {
    const isRideValidfor60Seconds = variables?.find((x) => x?.title == '60 second ride')
    const TIME_VALIDATION = isRideValidfor60Seconds?.value == 'No' ? 0.85 : 0.1
    if (timeInRide >= params.duration * 60 * TIME_VALIDATION) {
      // if (true) {
      const notSentOnline = personalRecords.filter((pr) => !pr.onlineStored)
      const storedPendingChanges = getRLRChnage("GETRLRCHANGE", {})
      const pendingChanges = [...storedPendingChanges] || []
      console.log(notSentOnline)

      const datatostore = {
        duration: params.duration,
        timeInRide: timeInRide,
        date: new Date(),
        total_output: totalOutput,
        RLR: Number(selectedProfile.RLR),
        isPR: !(totalOutput <= (personalRecord.total_output ? personalRecord.total_output : 0)),
        profileId: selectedProfile.anonymous_id,
        onlineStored: false,
      }

      const pendingRidesData = notSentOnline
        .map((nso) => {
          const profile = getProfile("GetProfile", nso.profileId)
          return {
            Ride_Length: nso.duration,
            Ride_Time: formatSecondsToTime(nso.timeInRide),
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
        ?.reverse()

      const datatosend = [
        ...pendingChanges?.reverse(),
        ...pendingRidesData,
        {
          Ride_Length: params.duration,
          Ride_Time: formatSecondsToTime(timeInRide),
          Date: `${new Date().getMonth() + 1}/${new Date().getDate()}/${new Date().getFullYear()}`,
          Ride_Total_Output: totalOutput,
          RLR: Number(selectedProfile.RLR),
          Personal_Record: (!(
            totalOutput <= (personalRecord.total_output ? personalRecord.total_output : 0)
          )).toString(),
          Identifier: selectedProfile.anonymous_id,
          Record_Type: "Ride Record",
          Age: selectedProfile.age,
          Sex: selectedProfile.gender,
          Weight: selectedProfile.weight,
          Resting_Heart_Rate: selectedProfile.restingHeartRate,
          Stationary_Bike: selectedProfile.bike,
          Ride_Preference: selectedProfile.ridePreference,
        },
      ]

      console.log(datatosend)
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
            updateRLRChnage("Updatring RLR to", [])
            insertPersonalRecord("insertNew", {
              ...datatostore,
              onlineStored: true,
            })
          } else {
            insertPersonalRecord("insertNew", datatostore)
          }
        })
        .catch(async (e) => {
          console.log(e)

          insertPersonalRecord("insertNew", datatostore)
          const createdAt = getCurrentUnixTime()
          await storeLogs(JSON.stringify({
            screen: 'workout-screen',
            id: 'onRideComplete',
            log: e,
            createdAt
          }))
        })
    }

    try {
      disconnect("puck")
      disconnect("wahoo")
    } catch (e) {
      console.log(e)
    }

    if (totalOutput <= (personalRecord.total_output ? personalRecord.total_output : 0)) {
      if (postWorkoutFeedback?.isRight) {
        navigation.navigate("workouthistory", { duration: params.duration, totalOutput })
      } else {
        navigation.navigate("workoutfeedback", { duration: params.duration, totalOutput })
      }
    } else {
      let sendToFeedback = false
      if (!postWorkoutFeedback?.isRight) {
        sendToFeedback = true
      }
      navigation.navigate("output", {
        totalOutput,
        duration: params.duration,
        sendToFeedback,
        previousPR: personalRecord.total_output ? personalRecord.total_output : 0,
      })
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
      navigation.navigate("feedback", {
        fromScreen: "Workout",
        imageBase64: uri,
      })
    } catch (error) {
      console.error("Failed to save image:", error)
    }
  }

  return (
    <Presentation
      heartRate={subscribe("heartRate")}
      cadence={subscribe("cadence")}
      resistanceLevel={
        isNaN(applicationValues?.resistanceLevel) ? 0 : applicationValues?.resistanceLevel
      }
      power={Math.floor(power)}
      totalOutput={totalOutput}
      personalRecord={personalRecord.total_output}
      onRideComplete={onRideComplete}
      onDecrementResistance={() => Alert.alert("pressed minus")}
      onIncrementResistance={() => Alert.alert("pressed plus")}
      navigateToFeedback={navigateToFeedback}
    // enableIncrements
    />
  )
})
