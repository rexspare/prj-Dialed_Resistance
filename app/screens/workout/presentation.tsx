import { observer } from "mobx-react-lite"
import * as React from "react"
import { TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { Button, Card, Screen, Text } from "../../components"
// import { useStores } from "../models/root-store"
import { color } from "../../theme"
import { responsiveHeight, responsiveWidth } from "../../utils/responsiveDimensions"
import KeepAwake from "react-native-keep-awake"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.workoutBg,
}
export interface WorkoutProps {
  resistanceLevel: number
  cadence: number
  heartRate: number
  output: number
  power: number
  totalOutput: number
  personalRecord: number
  enableIncrements: boolean
  onRideComplete: () => void
  onIncrementResistance: () => void
  onDecrementResistance: () => void
  navigateToFeedback: () => void
}

export const Presentation = observer(
  ({
    resistanceLevel,
    cadence,
    heartRate,
    onIncrementResistance,
    onDecrementResistance,
    enableIncrements,
    personalRecord,
    output,
    power,
    totalOutput,
    onRideComplete,
    navigateToFeedback
  }: WorkoutProps) => {
    const styles = {
      headerText: {
        marginTop: 20,
        marginBottom: responsiveHeight(50),
        alignSelf: "center",
        fontSize: 16,
        fontWeight: "500",
        fontFamily: "Poppins-Regular",
      } as TextStyle,
      line: { borderColor: color.palette.textColor, borderWidth: 1, height:"80%", width:2, opacity:0.5 } as ViewStyle,
      container: { paddingHorizontal: responsiveWidth(20), flex: 1 } as ViewStyle,
      row: { flex: 1, flexDirection: "row" } as ViewStyle,
      rowCardLeft: { marginTop: 0, borderRadius:0 } as ViewStyle,
      rowCardRight: { marginTop: 0, borderRadius:0 },
      buttonContainer: {
        // backgroundColor: color.palette.workoutBtnBg,
        marginTop: responsiveHeight(30),
        marginBottom: responsiveHeight(20),
        flex: 0.5,
        flexDirection: "row",
        // borderRadius: 8,
        justifyContent: "space-between",
        // alignItems: "center",
      },
      button: {
        backgroundColor: color.palette.workoutBtnBg,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        flex:1,
        // marginLeft:24
      },
      pipbutton:{flex:0.2, backgroundColor: "transparent", borderWidth: 1, borderColor: color.palette.primaryColor },
      btnText: {
        color: color.palette.workoutText,
        fontFamily: "Poppins-Regular",
        fontWeight: "400",
        fontSize: 14,
      },
    }
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
        <Text preset="header" text="Workout" style={styles.headerText} />
        <KeepAwake />
        {/* <View style={styles.line} /> */}
        <View style={styles.container}>
          <Card
            title="ResistAnce Level"
            preset="resistanceCard"
            value={Math.floor(Number(resistanceLevel))}
            showResistanceButtons={enableIncrements}
            onIncrementResistance={onIncrementResistance}
            onDecrementResistance={onDecrementResistance}
          />
          <Card title="Cadence" preset="resistanceCard" value={Number(cadence).toFixed()} />
          <View style={[styles.row,{
            flex: 1.2,
            backgroundColor:color.palette.secondaryBgColor,
            borderRadius: 10
          }]}>
            <Card
              title="POWER"
              preset="cardSmall"
              value={power}
              style={styles.rowCardLeft}
              subTitle="(EFQs)"
            />
            <View style={{
              height:"100%",
              alignItems:"center",
              justifyContent:'center'
            }}>
            <View style={styles.line} />
            </View>
            <Card
              title="TOTAL OUTPUT"
              preset="cardSmall"
              value={
                // isNaN(Number(heartRate)) || heartRate <= 0 ? " - " : Number(heartRate).toFixed()
                totalOutput
              }
              subTitle={personalRecord ? `PR: ${personalRecord}` : "No PR"}
              
              style={styles.rowCardRight}
            />
          </View>
          <View style={styles.buttonContainer}>
            {/* <Button
              style={styles.pipbutton}
              textStyle={[styles.btnText]}
              text="PIP"
            /> */}
            <Button
              style={styles.button}
              textStyle={styles.btnText}
              text="Ride Complete"
              onPress={onRideComplete}
            />
          </View>
        </View>
      </Screen>
    )
  },
)
