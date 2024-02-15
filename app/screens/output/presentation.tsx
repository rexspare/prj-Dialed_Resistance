/* eslint-disable react-native/no-inline-styles */
import * as React from "react"
import { Image, TextStyle, View, ViewStyle } from "react-native"
import { Button, Card, Screen, Text } from "../../components"
// import { useStores } from "../models/root-store"
import { color } from "../../theme"
import { responsiveHeight, responsiveWidth } from "../../utils/responsiveDimensions"
import { TouchableOpacity } from "react-native"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
}
export interface OutputProps {
  goHome: ()=>void
  totalOutput: number
  previousPR: number
  navigateToFeedback: ()=>void
}

export const Presentation = (props: OutputProps) => {
  const { goHome, totalOutput, previousPR, navigateToFeedback } = props
  const [isDisabled, setIsDisabled] = React.useState(true)
  const styles = {
    headerText: { margin: 20, alignSelf: 'center' } as TextStyle,
    line: { borderColor: color.primaryDarker, borderBottomWidth: 2 } as ViewStyle,
    container: { paddingHorizontal: responsiveWidth(20), flex: 1 } as ViewStyle,
    topCard: { flex: 2 } as ViewStyle,
    bottomCard: { flex: 1 } as ViewStyle,
    buttonContainer: { flex: 0.5, marginBottom: 15,marginHorizontal: 0 } as ViewStyle
  }

  React.useEffect(() => {
    const disabledTimeout = setTimeout(() => {
      setIsDisabled(false)
    }, 5000)
    return () => {
      clearTimeout(disabledTimeout)
    }
  }, [])
  return (
    <Screen style={ROOT}>
        <TouchableOpacity onPress={navigateToFeedback} style={{
          borderWidth: 0,
          borderColor: color.palette.textColor,
          alignSelf: "flex-end",
          paddingVertical: 3,
          paddingHorizontal: 15,
          borderRadius: 8,
          top: 15,
          left: 15,
          position: "absolute",
          backgroundColor: "#0399A5D9",
          padding: 4,
        }}>
           <Text style={{
             fontSize: 14,
             color: color.palette.textColor,
             fontWeight: "400",
             fontFamily: "NotoSans-Regular"
           }}>Feedback</Text>
        </TouchableOpacity>
      <View style={styles.container}>
        {/* <Card preset="secondary" style={styles.topCard} title="Congratulations!" value="You just set a new personal record for this length of ride."/> */}
        <View style={{
          flex: 3,
          justifyContent: "center",
          alignItems: "center",
          marginVertical: 34,
        }}>
          <Image
          source={require("./PR-Award.gif")}
          resizeMode="contain"
          style={{
            height: "70%",
            maxHeight: 300
            // marginBottom: responsiveHeight(40),
          }}
        />
        <Text style={{
          marginBottom: 18,
          marginTop: 40,
          fontSize: 20,
          color: color.palette.textColor,
          fontWeight: "bold"
        }}>Congratulations!</Text>
        <Text style={{
          fontSize: 18,
          color: color.palette.outputText,
          fontWeight: "bold",
          textTransform: "capitalize"
        }}>You set a new Personal Record</Text>
        </View>
        <Card style={styles.bottomCard} preset="resistanceCard" title="total output" subTitle={`Previous Record: ${previousPR}`} value={totalOutput}/>
        <View style={styles.buttonContainer}>
          <Button preset={isDisabled ? "inactive" :"primary"} style={{borderWidth: 0}} textStyle={{
            fontSize: 14,
            fontWeight: "400"
          }} disabled={isDisabled} onPress={goHome} text="Continue"/>
        </View>
      </View>
    </Screen>
  )
}
