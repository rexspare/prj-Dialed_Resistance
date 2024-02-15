import React, { useEffect, useState } from "react"
import { View, Image, ViewStyle, TextStyle, ImageStyle, SafeAreaView, NativeModules } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Button, Header, Screen, Text, TextField, Wallpaper } from "../../components"
import { color, spacing, typography } from "../../theme"
import BleManager from 'react-native-ble-manager'
import { useStores } from "../../models"

const bowserLogo = require("./bowser.png")

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}
const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.primary,
}
const BOLD: TextStyle = { fontWeight: "bold" }
const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[4] + spacing[1],
  paddingHorizontal: 0,
}
const HEADER_TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
}
const TITLE_WRAPPER: TextStyle = {
  ...TEXT,
  textAlign: "center",
}
const TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 28,
  lineHeight: 38,
  textAlign: "center",
}
const ALMOST: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 26,
  fontStyle: "italic",
}
const BOWSER: ImageStyle = {
  alignSelf: "center",
  marginVertical: spacing[5],
  height: 200,
  maxWidth: "100%",
}
const CONTENT: TextStyle = {
  ...TEXT,
  color: "#BAB6C8",
  fontSize: 15,
  lineHeight: 22,
  marginBottom: spacing[5],
}
const CONTINUE: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: "#5D2555",
}
const CONTINUE_TEXT: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 13,
  letterSpacing: 2,
}
const FOOTER: ViewStyle = { backgroundColor: "#20162D", marginBottom: 64 }
const FOOTER_CONTENT: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],

}

export const Presentation = observer(function WelcomeScreen() {
  // const navigation = useNavigation()
  const { PuckJS } = NativeModules
  const { getVar } = useStores()
  // const nextScreen = () => navigation.navigate("demo")

  const [resistance, setResistance] = useState('0')
  const [numOfLevels, setLevels] = useState('10')
  // const [TRP, setTRP] = useState(false)
  const [isConnected, setConnected] = useState(false)
  const [running, setRunning] = useState(false)
  const [interval, setIntervalVar] = useState(false)

  const start = async () => {
    const num = await PuckJS.GetValue().then(value => value / numOfLevels)
    console.log(num)
    setRunning(true)
    const interval = setInterval(() => getData(num), 1000)
    setIntervalVar(interval)
  }
  const stop = () => {
    clearInterval(interval)
    setRunning(false)
  }
  const connect = () => {
    // PuckJS.GetValue().then(value => console.log(value))
    PuckJS.connect(Number(getVar('Connection timeout (s)')) * 1000).then(result => {
      if (result === true) {
        setConnected(true)
      }
    })
  }
  const disconnect = () => {
    // PuckJS.GetValue().then(value => console.log(value))
    PuckJS.disconnect().then(result => {
      if (result === true) {
        setConnected(false)
      }
    })
  }
  const getData = (num) => {
    if (isConnected === true) {
      // console.log('isConnected', isConnected)
      PuckJS.GetValue().then(value => {
        console.log(value, num)
        setResistance((value / num).toFixed(0))
      })
    }
  }
  // React.useEffect(() => {
  //   if (isConnected === false) { connect() }
  // }, [])

  return (
    <View testID="WelcomeScreen" style={FULL}>
      <Wallpaper />
      <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
        <Header headerTx="welcomeScreen.poweredBy" style={HEADER} titleStyle={HEADER_TITLE} />
        <Text style={TITLE_WRAPPER}>
          <Text style={TITLE} text="Your new app, " />
          <Text style={ALMOST} text="almost" />
          <Text style={TITLE} text="!" />
        </Text>
        <Text style={TITLE} preset="header" tx="welcomeScreen.readyForLaunch" />
        <Image source={bowserLogo} style={BOWSER} />
        <Text preset='header' text={`Connected: ${isConnected}`} />
        <Text preset='header' text={`Running: ${running}`}/>
        <Text preset='header' text={`Value: ${resistance}`} />
        <TextField label={'Number of levels'} value={numOfLevels} onChangeText={value => setLevels(value)}/>
      </Screen>
      <SafeAreaView style={FOOTER}>
        <View style={FOOTER_CONTENT}>

          {running == true && <Button
            testID="next-screen-button"
            style={CONTINUE}
            textStyle={CONTINUE_TEXT}
            text={ 'Restart'}
            onPress={() => { stop(); start() }}
          />}
          {isConnected === true && <Button
            testID="next-screen-button"
            style={CONTINUE}
            textStyle={CONTINUE_TEXT}
            text={ running ? 'Stop' : 'Start'}
            onPress={running ? stop : start}
          />}
          <Button
            testID="next-screen-button"
            style={CONTINUE}
            textStyle={CONTINUE_TEXT}
            text={!isConnected ? 'Connect' : 'Disconnect'}
            onPress={isConnected ? disconnect : connect}
          />
        </View>
      </SafeAreaView>
    </View>
  )
})
