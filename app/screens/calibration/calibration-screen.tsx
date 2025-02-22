import * as React from "react"
import { Presentation, CalibrationProps } from "./presentation"
import { observer } from "mobx-react-lite"
import { Alert, Animated } from "react-native"
import { get, has } from "mobx"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import SDK from "../../utils/bluetoothSdk"
import { boolean, number } from "mobx-state-tree/dist/internal"
import { captureScreen } from "react-native-view-shot"
import axios from "axios"
import { getCurrentUnixTime } from "../../utils/dateUtils"
import { storeLogs } from "../../services/storage/asyncServices"
// import { useStores } from "../models/root-store"
const timeDurations = [10, 15, 20, 30, 45, 60, 75, 90]

export const Calibration: React.FunctionComponent<CalibrationProps> = observer((props) => {
  // Pull in one of our MST stores
  const {
    applicationValues,
    selectedProfile,
    variables,
    setHRi,
    setHRa,
    getVar,
    updateUEL,
    updatePostWorkoutFeedback,
    updateProfile,
    insertPersonalRecord,
    updatePersonalRecord,
    personalRecords,
    postWorkoutFeedback,
    updateRLRChnage,
    getRLRChnage,
    getProfile,
  } = useStores()
  const [opacity, setOpacity] = React.useState(new Animated.Value(1))
  const [opacityCalibrating, setOpacityCalibrating] = React.useState(new Animated.Value(0))
  const [duration, setDuration] = React.useState(10)
  const [lengthModalVisible, setLengthModalVisible] = React.useState(false)
  const [showText, setShow] = React.useState<number | "age" | "hr">(1)
  // Pull in navigation via hook
  const navigation = useNavigation()
  const transition: (
    showText: number,
    showCalibrating: boolean,
    hideCalibrating: boolean,
    callback?: () => void,
  ) => void = (showText, showCalibrating, hideCalibrating, callback) => {
    // Hide
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: false,
      }),
      hideCalibrating &&
      Animated.timing(opacityCalibrating, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: false,
      }),
    ]).start(({ finished }) => {
      // Switch text
      setShow(showText)
      // Show
      if (showCalibrating) {
        Animated.parallel([
          Animated.timing(opacity, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false,
          }),
          Animated.timing(opacityCalibrating, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false,
          }),
        ]).start(({ finished }) => {
          if (callback) callback()
        })
      } else {
        Animated.timing(opacity, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: false,
        }).start(({ finished }) => {
          if (callback) callback()
        })
      }
    })
  }

  const firstTransition = () => {
    transition(99, false, false)
  }
  const newTransition = () => {
    transition(2, false, false)
  }
  const secondTransition = () => {
    transition(3, true, false)
  }
  const thirdTransition = () => {
    transition(4, false, false)
  }
  const fourthTransition = () => {
    transition(5, false, true)
  }
  const onPressContinue = () => {
    firstTransition()
  }
  const checkStability = (interval, timeRange, acceptedRange, minimumVal, maximumVal, timeout) =>
    new Promise<boolean>((resolve) => {
      const lastCadenceValues: { cadence: number; time: number }[] = []
      const checkStability = (
        cadenceArr: { cadence: number; time: number }[],
        interval: number,
        timeRange: number,
        acceptedRange: number,
        minimumVal: number,
        maximumVal,
      ) => {
        const stableLength = timeRange / interval
        let stableArray = []
        let firstValidCadence
        for (const item of cadenceArr) {
          if (
            item.cadence - acceptedRange <= firstValidCadence &&
            item.cadence + acceptedRange >= firstValidCadence &&
            (item.cadence >= minimumVal || !minimumVal) &&
            (item.cadence <= maximumVal || !maximumVal) &&
            item.cadence !== 0
          ) {
            stableArray.push(item.cadence)
          } else {
            const newValidIndex = stableArray.findIndex(
              (curr) =>
                item.cadence - acceptedRange <= curr &&
                item.cadence + acceptedRange >= curr &&
                (curr >= minimumVal || !minimumVal) &&
                (curr <= maximumVal || !maximumVal) &&
                curr !== 0,
            )
            // console.log(newValidIndex)
            if (newValidIndex === -1) {
              stableArray = [item.cadence]
              firstValidCadence = item.cadence
            } else {
              firstValidCadence = stableArray[newValidIndex]
              stableArray.splice(0, newValidIndex)
              stableArray.push(item.cadence)
            }
          }
        }
        return stableArray.length >= stableLength
      }
      const appendAndCheckStability = (
        interval,
        timeRange,
        acceptedRange,
        minimumVal,
        maximumVal,
        timeout,
      ) => {
        // const cadence = 55
        const timeoutLength = timeout / interval
        const cadence = Number(Number(subscribe("cadence")).toFixed(0))
        const time = Date.now()
        lastCadenceValues.push({
          cadence,
          time,
        })
        const stable = checkStability(
          lastCadenceValues,
          interval,
          timeRange,
          acceptedRange,
          minimumVal,
          maximumVal,
        )
        // console.log(stable)
        if (stable || lastCadenceValues.length >= timeoutLength) {
          return resolve(stable)
        }
        setTimeout(() => {
          appendAndCheckStability(
            interval,
            timeRange,
            acceptedRange,
            minimumVal,
            maximumVal,
            timeout,
          )
        }, interval)
      }
      appendAndCheckStability(interval, timeRange, acceptedRange, minimumVal, maximumVal, timeout)
    })
  const onStartCalibration = async () => {
    secondTransition()
    const upperStable = await checkStability(
      Number(getVar("Cadence poll time (ms)")),
      Number(getVar("Screen 3 Time range (s)")) * 1000,
      Number(getVar("Screen 3 RPM range")),
      90,
      undefined,
      Number(getVar("Final Cadence Auto Advance")) * 1000,
    )
    thirdTransition()
    const lowerStable = await checkStability(
      Number(getVar("Cadence poll time (ms)")),
      Number(getVar("Initial Cadence Time")) * 1000,
      Number(getVar("Final Cadence Range")),
      undefined,
      Number(getVar("Final Cadence Target")),
      Number(getVar("Final Cadence Auto Advance")) * 1000,
    )
    const rotation = subscribe("rotation")
    const targetCadence = Number(getVar("Final Cadence Target"))
    const cadence = Number(Number(subscribe("cadence")).toFixed(0))
    const strengthRating = Number(getVar("Strength Rating"))
    applicationValues.logValue(`
    TRP: ${rotation}
    targetCadence: ${targetCadence}
    actualCadence: ${cadence}
    `)

    if (lowerStable) {
      const RLR = (rotation / strengthRating) * selectedProfile.ridePreferenceValue
      updateUEL(RLR)
      updateProfile("update Profile", { ...selectedProfile, RLR })
    } else {
      // const RLR = ((rotation * (cadence / strengthRating)) / strengthRating) * selectedProfile.ridePreferenceValue
      const RLR = (rotation / strengthRating) * selectedProfile.ridePreferenceValue
      updateUEL(RLR)
      updateProfile("update Profile", { ...selectedProfile, RLR })
    }
    fourthTransition()
  }
  const [start, setStart] = React.useState(false)
  const { subscribe } = SDK()
  React.useEffect(() => {
    applicationValues.resetLogs()
  }, [])

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
        fromScreen: "Calibration",
        imageBase64: uri
      })
    } catch (error) {
      console.error("Failed to save image:", error)
    }
  }

  const onPressWorkout = () => {
    const updatedRLR = Number(selectedProfile.RLR)
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
        Ride_Length: null,
        RLR: updatedRLR,
        Post_Workout_Rating: null,
        Ride_Total_Output: null,
        Record_Type: "Calibration",
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
                Ride_Length: null,
                RLR: updatedRLR,
                Post_Workout_Rating: null,
                Ride_Total_Output: null,
                Record_Type: "Calibration",
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
              Ride_Length: null,
              RLR: updatedRLR,
              Post_Workout_Rating: null,
              Ride_Total_Output: null,
              Record_Type: "Calibration",
            },
          ])
          console.log(e)
          const createdAt = getCurrentUnixTime()
          await storeLogs(JSON.stringify({
            screen: 'workout-Fine-Tune-RLR',
            id: 'onPressButton',
            log: e,
            createdAt
          }))

        })
    }
    updatePostWorkoutFeedback("option", {
      isRight: false,
      remainingRides: 5
    })
    navigation.navigate("workout", { duration }
    )
  }

  return (
    <Presentation
      opacity={opacity}
      opacityCalibrating={opacityCalibrating}
      onPressButton={onStartCalibration}
      showText={showText}
      duration={duration}
      setDuration={setDuration}
      lengthModalVisible={lengthModalVisible}
      timeDurations={timeDurations}
      setLengthModalVisible={setLengthModalVisible}
      // onSerHrR={HrR => applicationValues.setHrR(HrR)}
      // onSetAge={age => applicationValues.setAge(age)}
      // age={applicationValues.age}
      // hrr={applicationValues.HrR}
      onPressContinue={onPressContinue}
      onPressContinue2={newTransition}
      showLogs={getVar("Show logs") === "Yes"}
      // heartRate={(((subscribe('heartRate') - applicationValues.HrR) / (220 - applicationValues.age - applicationValues.HrR)) * 100).toFixed(0)}
      cadence={Number(Number(subscribe("cadence")).toFixed(0))}
      trp={subscribe("rotation")}
      targetCadence={Number(getVar("Final Cadence Target"))}
      initialCadence={Number(getVar("Initial Cadence Target"))}
      targetRPM={Number(getVar("Final Cadence Range"))}
      logs={applicationValues.log}
      onPressWorkout={onPressWorkout}
      navigateToFeedback={navigateToFeedback}
    />
  )
})
