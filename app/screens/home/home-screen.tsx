import * as React from "react"
import { Presentation, HomeProps } from "./presentation"
import { observer, useObserver } from "mobx-react-lite"
import SDK, { SDKContext } from "../../utils/bluetoothSdk"
import { useIsFocused, useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { Alert, CameraRoll, PermissionsAndroid, Platform } from "react-native"
import { BluetoothStatus } from "react-native-bluetooth-status"
import { captureScreen } from "react-native-view-shot"
import RNFS from "react-native-fs"
import { storeLogs } from "../../services/storage/asyncServices"
import { getCurrentUnixTime } from "../../utils/dateUtils"
// import { useStores } from "../models/root-store"

export const Home: React.FunctionComponent<HomeProps> = observer((props) => {
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
  const { connect, connected, disconnect } = SDKStore
  const context = React.useContext(SDKContext)
  const [statusPuck, setStatusPuck] = React.useState<"connected" | "disconnected" | "connecting">(
    SDKStore.connected.includes("puck") ? "connected" : "disconnected",
  )
  const [statusWahoo, setStatusWahoo] = React.useState<"connected" | "disconnected" | "connecting">(
    SDKStore.connected.includes("wahoo") ? "connected" : "disconnected",
  )
  const [statusWahooHR, setStatusWahooHR] = React.useState<
    "connected" | "disconnected" | "connecting"
  >(SDKStore.connected.includes("wahooHR") ? "connected" : "disconnected")
  const [puckTimeout, setPuckTimeout] = React.useState<NodeJS.Timeout>()
  const [wahooTimeout, setWahooTimeout] = React.useState<NodeJS.Timeout>()
  const [wahooHRTimeout, setWahooHRTimeout] = React.useState<NodeJS.Timeout>()
  console.log(PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN)

  const connectPuck = async () => {
    PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      "android.permission.BLUETOOTH_SCAN",
      "android.permission.BLUETOOTH_ADVERTISE",
      "android.permission.BLUETOOTH_CONNECT",
    ])

    setStatusPuck("connecting")
    clearTimeout(puckTimeout)
    const isEnabled = await BluetoothStatus.state()
    const timeout = setTimeout(() => {
      Alert.alert("Resistance Monitor", "Connection timed out, make sure device is in range", [
        {
          text: "Try again",
          onPress: () => {
            connectPuck()
          },
        },
        {
          text: "Cancel",
          onPress: () => {
            disconnect("puck")
            setStatusPuck("disconnected")
          },
        },
      ])
    }, getVar("Connection timeout (s)") * 1000)
    setPuckTimeout(timeout)
    if (!isEnabled) {
      setStatusPuck("disconnected")
      clearTimeout(timeout)
      Alert.alert("Please turn Bluetooth on.")
      return
    }

    connect("puck", Number(getVar("Connection timeout (s)")) * 1000)
      .then((result) => {
        console.log("result", result)
        if (result.includes("puck")) {
          setStatusPuck("connected")
          clearTimeout(timeout)
        } else {
          setStatusPuck("disconnected")
          clearTimeout(timeout)
        }
        console.log("puckConnectionResult", result)
      })
      .catch(async (result) => {
        console.log(result)
        console.log("disconnected")

        setStatusPuck("disconnected")
        clearTimeout(timeout)
        Alert.alert("Please turn Bluetooth on.")
        const createdAt = getCurrentUnixTime()
        await storeLogs(JSON.stringify({
          screen: 'home-screen',
          id: 'puckConnect',
          log: result,
          createdAt
        }))
      })
    console.log(connected)
  }

  const connectWahoo = async () => {
    PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      "android.permission.BLUETOOTH_SCAN",
      "android.permission.BLUETOOTH_ADVERTISE",
      "android.permission.BLUETOOTH_CONNECT",
    ])
    setStatusWahoo("connecting")
    clearTimeout(wahooTimeout)
    const isEnabled = await BluetoothStatus.state()
    const timeout = setTimeout(() => {
      Alert.alert("Cadence Monitor", "Connection timed out, make sure device is in range", [
        {
          text: "Try again",
          onPress: () => {
            connectWahoo()
          },
        },
        {
          text: "Cancel",
          onPress: () => {
            disconnect("wahoo")
            setStatusWahoo("disconnected")
          },
        },
      ])
    }, getVar("Connection timeout (s)") * 1000)
    setWahooTimeout(timeout)
    if (!isEnabled) {
      setStatusWahoo("disconnected")
      clearTimeout(timeout)
      Alert.alert("Please turn Bluetooth on.")
      return
    }
    connect("wahoo", Number(getVar("Connection timeout (s)")) * 1000)
      .then((result) => {
        if (result.includes("wahoo")) {
          setStatusWahoo("connected")
          clearTimeout(timeout)
        } else {
          setStatusWahoo("disconnected")
          clearTimeout(timeout)
        }
        console.log("wahooConnectionResult", result)
      })
      .catch(async (result) => {
        setStatusWahoo("disconnected")
        clearTimeout(timeout)
        Alert.alert("Please turn Bluetooth on.")
        const createdAt = getCurrentUnixTime()
        await storeLogs(JSON.stringify({
          screen: 'home-screen',
          id: 'wahooConnect',
          log: result,
          createdAt
        }))
      })
  }

  const connectWahooHR = async () => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
    setStatusWahooHR("connecting")
    clearTimeout(wahooHRTimeout)
    const isEnabled = await BluetoothStatus.state()
    const timeout = setTimeout(() => {
      Alert.alert("Heart Rate Monitor", "Connection timed out, make sure device is in range", [
        {
          text: "Try again",
          onPress: () => {
            connectWahooHR()
          },
        },
        {
          text: "Cancel",
          onPress: () => {
            disconnect("wahooHR")
            setStatusWahooHR("disconnected")
          },
        },
      ])
    }, getVar("Connection timeout (s)") * 1000)
    setWahooHRTimeout(timeout)
    if (!isEnabled) {
      setStatusWahooHR("disconnected")
      clearTimeout(timeout)
      Alert.alert("Please turn Bluetooth on.")
      return
    }
    connect("wahooHR", Number(getVar("Connection timeout (s)")) * 1000)
      .then((result) => {
        if (result.includes("wahooHR")) {
          setStatusWahooHR("connected")
          clearTimeout(timeout)
        } else {
          setStatusWahooHR("disconnected")
          clearTimeout(timeout)
        }
        console.log("wahooHRConnectionResult", result)
      })
      .catch(async (result) => {
        setStatusWahooHR("disconnected")
        clearTimeout(timeout)
        Alert.alert("Please turn Bluetooth on.")
        const createdAt = getCurrentUnixTime()
        await storeLogs(JSON.stringify({
          screen: 'home-screen',
          id: 'wahooConnectHR',
          log: result,
          createdAt
        }))

      })
  }
  React.useEffect(() => {
    if (!selectedProfile && profiles.length > 0) {
      const data = profiles[0]
      console.log(data)
      setSelectedProfile("setSelectedProfile", data)
    }
  }, [])

  React.useEffect(() => {
    setStatusWahoo(SDKStore.connected.includes("wahoo") ? "connected" : "disconnected")
    setStatusPuck(SDKStore.connected.includes("puck") ? "connected" : "disconnected")
  }, [isFocused])

  const navigateToSettigs = () => {
    navigation.navigate("settings")
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
        fromScreen: "Home",
        imageBase64: uri,
      })
    } catch (error) {
      console.error("Failed to save image:", error)
    }
  }
  const navigateToWorkout = () => {
    /*
    REMOVE THIS AFTER TESTING
    */
    // navigation.navigate("feedback", { next: "workout" })
    // console.log('====================================');
    // console.log("HERE");
    // console.log('====================================');
    /*
  REMOVE THIS AFTER TESTING
  */
    if (profiles.length > 0) {
      if (selectedProfile.RLR !== 0 && getVar("Always Continue to Calibration") !== "Yes") {
        navigation.navigate("workoutlength", { next: "workout" })
      } else {
        navigation.navigate("calibration")
        // navigation.navigate('workoutlength', { totalOutput: 0, duration: 10, sendToFeedback: 10, previousPR: 28 })
      }
    } else {
      navigation.navigate("profile", {
        startWorkout: statusPuck === "connected" && statusWahoo === "connected",
      })
    }
  }

  const recalibrate = () => {
    resetAppvalues()
    navigation.navigate("calibration")
  }

  const ChangeSelectedProfile = (data) => {
    setSelectedProfile("setSelectedProfile", data)
  }

  // const SDKState = React.useContext(SDKContext)
  return (
    <Presentation
      connectPuck={connectPuck}
      connectWahoo={connectWahoo}
      connectWahooHR={connectWahooHR}
      statusWahooHR={statusWahooHR}
      connectedDevices={SDKStore.connected}
      statusPuck={statusPuck}
      statusWahoo={statusWahoo}
      heartRateError={SDKStore.heartRateError}
      onPressSettings={navigateToSettigs}
      onPressContinue={navigateToWorkout}
      onPressRecalibrate={recalibrate}
      profiles={profiles}
      setSelectedProfile={ChangeSelectedProfile}
      selectedProfile={selectedProfile}
      onPressProfile={(data) => {
        navigation.navigate("profile", { data: data })
      }}
      navigateToFeedback={navigateToFeedback}
    />
  )
})
