/* eslint-disable react-native/no-inline-styles */
import * as React from "react"
import {
  Animated,
  Dimensions,
  Image,
  ImageBackground,
  Modal,
  Pressable,
  ScrollView,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native"
import Slider from "react-native-slider"
import { Button, Icon, Screen, Text } from "../../components"
import { Dropdown } from "../../components/dropdown/dropdown-component"
// import { useStores } from "../models/root-store"
import { color, typography } from "../../theme"
import { Popable } from "react-native-popable"
import { palette } from "../../theme/palette"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.mainBgColor,
}
export interface ResistancePromptProps {
  onPressButton
  personalRecords
  duration
  onFeedbackPressButton
  selectedProfile
  navigateToFeedback
  getRLRChnage
}

export const Presentation = ({
  onPressButton,
  personalRecords,
  duration,
  onFeedbackPressButton,
  selectedProfile,
  navigateToFeedback,
  getRLRChnage,
}: ResistancePromptProps) => {
  const [length, setLength] = React.useState(duration)
  const [timeFrame, setTimeFrame] = React.useState("All Time")
  const [lengthModalVisible, setLengthModalVisible] = React.useState(false)
  const [timeFrameModalVisible, setTimeFrameModalVisible] = React.useState(false)

  const [totalRecords, setTotalRecords] = React.useState(0)
  const [totalPRs, setTotalPRs] = React.useState(0)
  const [resistanceChange, setResistanceChange] = React.useState(0)
  const [improvement, setImprovement] = React.useState("0")
  const [sortedRides, setSortedRides] = React.useState([])

  const timeDurations = [10, 15, 20, 30, 45, 60, 75, 90]
  const timeframes = ["All Time", "1 week", "1 month", "3 months", "6 months", "1 year"]

  const getpreviosTimeStamp = (duration) => {
    const date = new Date()
    date.setDate(date.getDate() - duration)
    return duration === -1 ? 0 : date.valueOf()
  }

  React.useEffect(() => {
    let previousDate = 0
    let PRCount = 0
    let totalRides = 0

    switch (timeFrame) {
      case "All Time":
        previousDate = -1
        break
      case "1 week":
        previousDate = 7
        break
      case "1 month":
        previousDate = 30
        break
      case "3 months":
        previousDate = 90
        break
      case "6 months":
        previousDate = 180
        break
      case "1 year":
        previousDate = 365
        break
      default:
        break
    }

    console.log(personalRecords)

    const durationData = personalRecords.filter((pr) => {
      if (
        pr.date > getpreviosTimeStamp(previousDate) &&
        pr.profileId === selectedProfile.anonymous_id
      ) {
        totalRides++
        if (pr.isPR) {
          PRCount++
        }
      }

      return (
        pr.duration === length &&
        pr.date > getpreviosTimeStamp(previousDate) &&
        pr.profileId === selectedProfile.anonymous_id
      )
    })
    const sortedRecords = durationData.sort((a, b) => b.date - a.date)
    console.log(sortedRecords)
    if (sortedRecords.length === 1) {
      setImprovement(`First Ride \n From here we grow stronger`)
    } else {
      let improvement = 0
      // for (let i = sortedRecords.length - 1; i >= 1; i--) {
      //   if (sortedRecords[i].total_output !== 0) {
      //     improvement =
      //       ((sortedRecords[0]?.total_output - sortedRecords[i].total_output) /
      //         sortedRecords[i].total_output) *
      //       100
      //     break
      //   }
      // }

      if (sortedRecords.length > 3) {
        let totalOutputSum = 0
        let validRecordsCount = 0

        for (let i = sortedRecords.length - 1; i >= sortedRecords.length - 3; i--) {
          if (sortedRecords[i].total_output !== 0) {
            totalOutputSum += sortedRecords[i].total_output
            validRecordsCount++
          }
        }

        if (validRecordsCount > 0) {
          improvement =
            ((sortedRecords[0]?.total_output - totalOutputSum / validRecordsCount) /
              (totalOutputSum / validRecordsCount)) *
            100
        }
      } else {
        let totalOutputSum = 0
        let validRecordsCount = 0

        for (let i = sortedRecords.length - 1; i >= 0; i--) {
          if (sortedRecords[i].total_output !== 0) {
            totalOutputSum += sortedRecords[i].total_output
            validRecordsCount++
          }
        }

        if (validRecordsCount > 0) {
          improvement =
            ((sortedRecords[0]?.total_output - totalOutputSum / validRecordsCount) /
              (totalOutputSum / validRecordsCount)) *
            100
        }
      }

      if (isNaN(improvement)) {
        improvement = 0
      }
      setImprovement(improvement.toString())
    }

    setSortedRides(sortedRecords)
    setTotalRecords(totalRides)
    setTotalPRs(PRCount)
  }, [timeFrame, length])

  React.useEffect(() => {
    let previousDate = 0
    let PRCount = 0
    let totalRides = 0

    const RLRValues = getRLRChnage("GETRLRCHANGE", {})

    const sortedRLR = [...RLRValues]
      .filter((a) => a.Post_Workout_Rating === 0)
      .sort((a, b) => b.RLR - a.RLR)

    switch (timeFrame) {
      case "All Time":
        previousDate = -1
        break
      case "1 week":
        previousDate = 7
        break
      case "1 month":
        previousDate = 30
        break
      case "3 months":
        previousDate = 90
        break
      case "6 months":
        previousDate = 180
        break
      case "1 year":
        previousDate = 365
        break
      default:
        break
    }

    const durationData = personalRecords.filter((pr) => {
      if (
        pr.date > getpreviosTimeStamp(previousDate) &&
        pr.profileId === selectedProfile.anonymous_id
      ) {
        totalRides++
        if (pr.isPR) {
          PRCount++
        }
      }

      return (
        pr.date > getpreviosTimeStamp(previousDate) && pr.profileId === selectedProfile.anonymous_id
      )
    })
    const sortedRecords = durationData.sort((a, b) => b.date - a.date)
    // const allTimeRLRSort = durationData.sort((a, b) => b.RLR - a.RLR)

    if (sortedRLR.length <= 1) {
      setResistanceChange(`Establishing \n Baseline`)
    } else {
      // const change =
      //   ((sortedRecords[0]?.RLR - allTimeRLRSort[allTimeRLRSort.length - 1].RLR) /
      //     allTimeRLRSort[allTimeRLRSort.length - 1].RLR) *
      //   100
      let previousThreeSum = 0
      const previousThreeCount = Math.min(3, sortedRLR.length - 1)

      for (let i = sortedRLR.length - 2; i >= sortedRLR.length - 1 - previousThreeCount; i--) {
        previousThreeSum += sortedRLR[i].RLR
      }

      const previousThreeAverage =
        previousThreeCount > 0 ? previousThreeSum / previousThreeCount : 0
      if (previousThreeAverage !== 0) {
        const change = ((sortedRecords[0]?.RLR - previousThreeAverage) / previousThreeAverage) * 100
        setResistanceChange(isNaN(change) || change === Infinity ? 0 : Math.round(change))
      }
    }
    // setSortedRides(sortedRecords)
    // setTotalRecords(totalRides)
    // setTotalPRs(PRCount)
  }, [timeFrame])

  function getDurationString(duration) {
    if (duration.years > 0) {
      return `${duration.years} year${duration.years === 1 ? "" : "s"}`
    } else if (duration.months > 0) {
      return `${duration.months} month${duration.months === 1 ? "" : "s"}`
    } else if (duration.days > 0) {
      return `${duration.days} day${duration.days === 1 ? "" : "s"}`
    } else if (duration.hours > 0) {
      return `${duration.hours} hour${duration.hours === 1 ? "" : "s"}`
    } else if (duration.minutes > 0) {
      return `${duration.minutes} minute${duration.minutes === 1 ? "" : "s"}`
    } else {
      return `${duration.seconds} second${duration.seconds === 1 ? "" : "s"}`
    }
  }

  const getDurationFromFirstRide = () => {
    const dateString = sortedRides[sortedRides.length - 1]?.date
    const givenDate = new Date(dateString)
    const currentDate = new Date()

    // Calculate the time difference in milliseconds
    const timeDifference = currentDate - givenDate

    // Convert milliseconds to years, months, days, hours, minutes, and seconds
    const seconds = Math.floor(timeDifference / 1000) % 60
    const minutes = Math.floor(timeDifference / (1000 * 60)) % 60
    const hours = Math.floor(timeDifference / (1000 * 60 * 60)) % 24
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24)) % 30 // Assuming each month has 30 days
    const months = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 30)) % 12 // Assuming there are 12 months in a year
    const years = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 30 * 12))

    // Create an object to hold the duration
    const duration = {
      years,
      months,
      days,
      hours,
      minutes,
      seconds,
    }

    return getDurationString(duration)
  }

  return (
    <View style={{ flex: 1 }}>
      <Screen style={ROOT}>
        <TouchableOpacity
          onPress={navigateToFeedback}
          style={{
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
          }}
        >
          <Text
            style={{
              fontSize: 14,
              color: color.palette.textColor,
              fontWeight: "400",
              fontFamily: "NotoSans-Regular",
            }}
          >
            Feedback
          </Text>
        </TouchableOpacity>
        <Text
          preset="header"
          text="Workout History"
          style={{ margin: 20, alignSelf: "center", fontSize: 16 }}
        />
        {/* <View style={{ borderColor: color.primaryDarker, borderBottomWidth: 2 }} /> */}
        <View style={{ flex: 1, justifyContent: "center" }}>
          <View style={{ flex: 1, paddingBottom: 20, paddingHorizontal: 10 }}>
            <View style={{ justifyContent: "space-between", alignItems: "center", flex: 1 }}>
              <View></View>
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  width: "100%",
                  // flex: 1,
                  // justifyContent: "center",
                  // alignItems: "center",
                  paddingBottom: 20,
                }}
              >
                <View
                  style={{
                    backgroundColor: color.palette.secondaryBgColor,
                    flex: 1,
                    alignItems: "center",
                    paddingVertical: 12,
                    paddingHorizontal: 35,
                    borderRadius: 8,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: typography.primaryBold,
                        marginRight: 12,
                      }}
                    >
                      Total Improvement
                    </Text>
                    <TouchableOpacity
                      onPress={() => setLengthModalVisible(true)}
                      style={{
                        borderColor: color.palette.textColor,
                        borderWidth: 1,
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        opacity: 0.5,
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ color: color.palette.textColor }}>{length} min</Text>
                      <Image
                        source={require("./dropdown.png")}
                        style={{ width: 10, height: 5, marginLeft: 10 }}
                      ></Image>
                    </TouchableOpacity>
                  </View>
                  {improvement === `First Ride \n From here we grow stronger` ? (
                    <Text
                      style={{
                        marginTop: 14,
                        fontSize: 24,
                        fontFamily: typography.primaryBold,
                        color: color.palette.textColor,
                        textAlign: "center",
                      }}
                    >
                      {improvement}
                    </Text>
                  ) : (
                      <Text
                        style={{
                          marginTop: 14,
                          fontSize: 24,
                          fontFamily: typography.primaryBold,
                          color: color.palette.textColor,
                          textAlign: "center",
                          lineHeight: 38,
                        }}
                      >
                        {Number(improvement) !== 0 && Math.sign(Number(improvement)) === 1 ? (
                          <>
                            <Text
                              style={{
                                fontSize: 14,
                                fontFamily: typography.primaryBold,
                                marginBottom: 8,
                              }}
                            >
                              You just accomplished {"\n"}
                            </Text>
                            {Math.round(Number(improvement))}%{" "}
                            {Number(improvement) !== 0 && Math.sign(Number(improvement)) === 1
                              ? "more \n"
                              : "\n"}
                            <Text
                              style={{
                                fontSize: 14,
                                fontFamily: typography.primaryBold,
                                marginTop: 8,
                              }}
                            >
                              than your average ride{" "}
                              {timeFrame === "All Time" ? getDurationFromFirstRide() : timeFrame} ago.{" "}
                            </Text>
                          </>
                        ) : (
                            `No improvement - YET. \n Keep Going`
                          )}
                      </Text>
                    )}

                  {/* <Dropdown value={length} items={["10", "20"]} onValueChange={value => setLength(value)}/> */}
                </View>
                {/* TIME FRAME CONTROL */}
                {/* <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignSelf: "center",
                    alignItems: "center",
                    marginTop: 32,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      // fontFamily: typography.primaryBold,
                      marginRight: 12,
                    }}
                  >
                    Timeframe:
                  </Text>
                  <TouchableOpacity
                    onPress={() => setTimeFrameModalVisible(true)}
                    style={{
                      borderColor: color.palette.textColor,
                      borderWidth: 1,
                      paddingVertical: 5,
                      paddingHorizontal: 20,
                      opacity: 0.5,
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ color: color.palette.textColor }}>{timeFrame}</Text>
                    <Image
                      source={require("./dropdown.png")}
                      style={{ width: 10, height: 5, marginLeft: 20 }}
                    ></Image>
                  </TouchableOpacity>
                </View> */}
                {/* END */}

                <View style={{
                  width: "100%",
                  flexDirection: "row",
                  //  marginTop: 32 ,
                  marginTop: 70
                }}>
                  <View
                    style={{
                      backgroundColor: color.palette.secondaryBgColor,
                      flex: 1,
                      alignItems: "center",
                      padding: 12,
                      borderRadius: 8,
                      marginRight: 6,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: typography.primaryBold,
                        marginTop: 8,
                        color: palette.workoutText
                      }}
                    >
                      Total Workouts
                    </Text>
                    <Text
                      style={{
                        fontSize: 35,
                        fontFamily: typography.primaryBold,
                        // marginTop: 12,
                      }}
                    >
                      {totalRecords}
                    </Text>
                  </View>
                  {/* TOTAL CALORIES */}
                  {/* <View
                    style={{
                      backgroundColor: color.palette.secondaryBgColor,
                      flex: 0.5,
                      alignItems: "center",
                      padding: 12,
                      borderRadius: 8,
                      marginLeft: 6,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: typography.primaryBold,
                      }}
                    >
                      Total Calories
                    </Text>
                    <Text
                      style={{
                        fontSize: 35,
                        fontFamily: typography.primaryBold,
                        marginTop: 12,
                      }}
                    >
                      -
                    </Text>
                  </View> */}
                  {/* END */}
                </View>

                <View style={{ width: "100%", flexDirection: "row", marginTop: 12 }}>
                  {/* RES LEVEL CHANGE */}
                  {/* <View
                    style={{
                      backgroundColor: color.palette.secondaryBgColor,
                      flex: 0.5,
                      alignItems: "center",
                      padding: 12,
                      borderRadius: 8,
                      marginRight: 6,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: typography.primaryBold,
                      }}
                    >
                      Res. Level Change
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "baseline",
                        width: "100%",
                        justifyContent: "space-around",
                      }}
                    >
                      {resistanceChange === `Establishing \n Baseline` ? (
                        <Text
                          style={{
                            fontSize: 14,
                            fontFamily: typography.primaryBold,
                            marginTop: 12,
                            color: "#FAFAFA",
                            textAlign: "center",
                            flex: 1,
                          }}
                        >
                          {resistanceChange}
                        </Text>
                      ) : (
                          <Text
                            style={{
                              fontSize: 35,
                              fontFamily: typography.primaryBold,
                              marginTop: 12,
                              flex: 1,
                              textAlign: "center",
                            }}
                          >
                            {Math.sign(resistanceChange) === 1 ? (
                              <>
                                {resistanceChange !== 0 && Math.sign(resistanceChange) === 1
                                  ? "+"
                                  : ""}
                                {resistanceChange}%
                              </>
                            ) : (
                                `Establishing \n Baseline`
                              )}
                          </Text>
                        )}
                      <Popable
                        caretPosition="bottom"
                        backgroundColor={"transparent"}
                        style={{ width: 300, marginBottom: -40, backgroundColor: "transparent" }}
                        position="top"
                        content={
                          <View
                            style={{
                              // marginLeft: -100,
                              backgroundColor: color.palette.mainBgColor,
                              borderRadius: 16,
                              paddingVertical: 14,
                              paddingHorizontal: 14,
                              alignItems: "center",
                              borderWidth: 1,
                              borderColor: color.palette.primaryColor,
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 11,
                                fontWeight: "500",
                                textAlign: "auto",
                              }}
                            >
                              We use Tailored Resistance Levels - which are calibrated to your
                              specific fitness and exercise bicycle. As your fitness changes - your
                              resistance level calibration adjusts. This shows you how much more
                              resistance you cycle with now vs when you started.
                            </Text>
                          </View>
                        }
                      >
                        <View>
                          <Text
                            style={{
                              color: "#434648",
                              fontWeight: "900",
                              // backgroundColor: "#434648",
                              borderWidth: 1,
                              borderColor: "#434648",
                              paddingHorizontal: 8,
                              borderRadius: 40,
                              fontSize: 14,
                            }}
                          >
                            ?
                          </Text>
                        </View>
                      </Popable>
                    </View>
                  </View> */}
                  {/* END */}
                  <View
                    style={{
                      backgroundColor: color.palette.secondaryBgColor,
                      flex: 1,
                      alignItems: "center",
                      padding: 12,
                      borderRadius: 8,
                      marginLeft: 6,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: typography.primaryBold,
                        marginTop: 8,
                        color: palette.workoutText
                      }}
                    >
                      Personal Records
                    </Text>
                    <Text
                      style={{
                        fontSize: 35,
                        fontFamily: typography.primaryBold,
                        // marginTop: 12,
                      }}
                    >
                      {totalPRs}
                    </Text>
                  </View>
                </View>
                <Text
                  style={{
                    fontSize: 12,
                    color: color.palette.textColor,
                    textAlign: "center",
                    marginTop: 12,
                    opacity: 0.5,
                  }}
                >
                  ‘Total Improvement’ is filtered by ride length. {"\n"}
                  All other stats include all ride lengths.
                </Text>
              </ScrollView>
              <View
                style={{ width: "100%", flexDirection: "row", justifyContent: "space-between" }}
              >
                <Button
                  text={`Tweak\nRes. Lvl`}
                  preset="primary"
                  onPress={onFeedbackPressButton}
                  style={{
                    width: "20%",
                    borderColor: color.palette.primaryColor,
                    borderWidth: 1,
                    backgroundColor: "transparent",
                    maxHeight: 45,
                  }}
                  textStyle={{
                    opacity: 0.5,
                    fontSize: 14,
                    color: color.palette.textColor,
                    fontWeight: "400",
                    textAlign: "center",
                  }}
                />
                <Button
                  text="Back To Home"
                  preset="primary"
                  onPress={onPressButton}
                  style={{
                    width: "78%",
                    backgroundColor: color.palette.primaryColor,
                    maxHeight: 45,
                  }}
                  textStyle={{
                    fontSize: 14,
                    color: color.palette.textColor,
                    fontWeight: "400",
                  }}
                />
              </View>
            </View>
          </View>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={lengthModalVisible}
        // onRequestClose={() => {
        //   Alert.alert("Modal has been closed.");
        //   setModalVisible(!modalVisible);
        // }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#00000080",
            }}
          >
            <View
              style={{
                margin: 20,
                backgroundColor: color.palette.mainBgColor,
                borderRadius: 16,
                paddingVertical: 14,
                paddingHorizontal: 35,
                alignItems: "center",
                width: "50%",
              }}
            >
              <TouchableOpacity
                onPress={() => setLengthModalVisible(false)}
                style={{ position: "absolute", right: 14, top: 14, padding: 10 }}
              >
                <Image style={{ width: 16, height: 16 }} source={require("./cross.png")}></Image>
              </TouchableOpacity>
              <Text
                style={{
                  marginTop: 42,
                  marginBottom: 14,
                  fontSize: 19,
                  color: color.palette.textColor,
                }}
              >
                Ride Length
              </Text>
              {timeDurations.map((ele, i) => (
                <Pressable
                  onPress={() => {
                    setLength(ele)
                    setLengthModalVisible(false)
                  }}
                  style={{
                    width: "100%",
                    borderTopColor: color.palette.textColor,
                    borderTopWidth: i === 0 ? 0 : 1,
                    paddingVertical: 10,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: color.palette.textColor,
                      fontSize: 16,
                    }}
                  >
                    {ele} min
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={timeFrameModalVisible}
        // onRequestClose={() => {
        //   Alert.alert("Modal has been closed.");
        //   setModalVisible(!modalVisible);
        // }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#00000080",
            }}
          >
            <View
              style={{
                margin: 20,
                backgroundColor: color.palette.mainBgColor,
                borderRadius: 16,
                paddingVertical: 14,
                paddingHorizontal: 35,
                alignItems: "center",
                width: "50%",
              }}
            >
              <TouchableOpacity
                onPress={() => setTimeFrameModalVisible(false)}
                style={{ position: "absolute", right: 14, top: 14, padding: 10 }}
              >
                <Image style={{ width: 16, height: 16 }} source={require("./cross.png")}></Image>
              </TouchableOpacity>
              <Text
                style={{
                  marginTop: 42,
                  marginBottom: 14,
                  fontSize: 19,
                  color: color.palette.textColor,
                }}
              >
                Timeframe
              </Text>
              {timeframes.map((ele, i) => (
                <Pressable
                  onPress={() => {
                    setTimeFrame(ele)
                    setTimeFrameModalVisible(false)
                  }}
                  style={{
                    width: "100%",
                    borderTopColor: color.palette.textColor,
                    borderTopWidth: i === 0 ? 0 : 1,
                    paddingVertical: 10,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: color.palette.textColor,
                      fontSize: 16,
                    }}
                  >
                    {ele}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        </Modal>
      </Screen>
    </View>
  )
}
