/* eslint-disable react-native/no-inline-styles */
import * as React from "react"
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  Image,
  ImageBackground,
  Modal,
  Pressable,
  ScrollView,
  StatusBar,
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
import FineTuneCalModal from "../../components/modals/fine-tune-cal-modal"

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
  isVisible: boolean
  onClose: () => void
  onOpen: () => void
  setisFineTuneEnabled: () => void
}

export const Presentation = ({
  onPressButton,
  personalRecords,
  duration,
  onFeedbackPressButton,
  selectedProfile,
  navigateToFeedback,
  getRLRChnage,
  isVisible,
  onClose = () => { },
  onOpen = () => { },
  setisFineTuneEnabled = () => { },
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
  const [showMainCard, setshowMainCard] = React.useState(false)

  const timeDurations = [10, 15, 20, 30, 45, 60, 75, 90]
  const timeframes = ["All Time", "1 week", "1 month", "3 months", "6 months", "1 year"]

  const getpreviosTimeStamp = (duration) => {
    const date = new Date()
    date.setDate(date.getDate() - duration)
    return duration === -1 ? 0 : date.valueOf()
  }

  const getUnixTimeStamp = (input: any) => {
    let unixTimestamp;

    if (typeof input === 'string') {
      const date = new Date(input);
      unixTimestamp = date.getTime() / 1000; // Convert milliseconds to seconds
    } else if (input instanceof Date) {
      unixTimestamp = input.getTime() / 1000; // Convert milliseconds to seconds
    } else {
      return 0
    }

    return unixTimestamp;
  }

  React.useEffect(() => {
    let previousDate = 0;
    let PRCount = 0;
    let totalRides = 0;

    switch (timeFrame) {
      case "All Time":
        previousDate = -1;
        break;
      case "1 week":
        previousDate = 7;
        break;
      case "1 month":
        previousDate = 30;
        break;
      case "3 months":
        previousDate = 90;
        break;
      case "6 months":
        previousDate = 180;
        break;
      case "1 year":
        previousDate = 365;
        break;
      default:
        break;
    }



    const durationData = personalRecords.filter((pr) => {
      if (pr.date > getpreviosTimeStamp(previousDate) && pr.profileId === selectedProfile.anonymous_id) {
        totalRides++;
        if (pr.isPR) {
          PRCount++;
        }
      }

      return (
        pr.duration === length &&
        pr.date > getpreviosTimeStamp(previousDate) &&
        pr.profileId === selectedProfile.anonymous_id
      );
    });

    const oldestRecordInTimeFrame = durationData
      .filter((pr) => pr.date > getpreviosTimeStamp(previousDate) && pr.profileId === selectedProfile.anonymous_id)
      .reduce((oldest, current) => (current.date < oldest.date ? current : oldest), { date: Infinity });


    setTotalRecords(totalRides);
    setTotalPRs(PRCount);

    const sortedRecords = durationData.sort((a, b) => b.date - a.date);

    if (sortedRecords.length === 1) {
      // setImprovement(`First Ride \n From here we grow stronger`);
      setImprovement(`New Ride Length!\nSetting up baselines.\nKeep Going.`);
    } else {
      const improvement =
        ((sortedRecords[0]?.total_output - oldestRecordInTimeFrame.total_output) / oldestRecordInTimeFrame.total_output) *
        100;

      if (isNaN(improvement)) {
        setImprovement("0");
      } else {
        setImprovement(improvement.toString());
      }
    }

    setSortedRides(sortedRecords);

  }, [timeFrame, length, personalRecords, selectedProfile, personalRecords?.length]);




  React.useEffect(() => {
    const intervalId = setInterval(() => {
      let previousDate = 0;
      let PRCount = 0;
      let totalRides = 0;

      switch (timeFrame) {
        case "All Time":
          previousDate = -1;
          break;
        case "1 week":
          previousDate = 7;
          break;
        case "1 month":
          previousDate = 30;
          break;
        case "3 months":
          previousDate = 90;
          break;
        case "6 months":
          previousDate = 180;
          break;
        case "1 year":
          previousDate = 365;
          break;
        default:
          break;
      }



      const durationData = personalRecords.filter((pr) => {
        if (pr.date > getpreviosTimeStamp(previousDate) && pr.profileId === selectedProfile.anonymous_id) {
          totalRides++;
          if (pr.isPR) {
            PRCount++;
          }
        }

        return (
          pr.duration === length &&
          pr.date > getpreviosTimeStamp(previousDate) &&
          pr.profileId === selectedProfile.anonymous_id
        );
      });

      const oldestRecordInTimeFrame = durationData
        .filter((pr) => pr.date > getpreviosTimeStamp(previousDate) && pr.profileId === selectedProfile.anonymous_id)
        .reduce((oldest, current) => (current.date < oldest.date ? current : oldest), { date: Infinity });


      setTotalRecords(totalRides);
      setTotalPRs(PRCount);

      const sortedRecords = durationData.sort((a, b) => b.date - a.date);

      if (sortedRecords.length === 1) {
        // setImprovement(`First Ride \n From here we grow stronger`);
        setImprovement(`New Ride Length!\nSetting up baselines.\nKeep Going.`);
      } else {
        const improvement =
          ((sortedRecords[0]?.total_output - oldestRecordInTimeFrame.total_output) / oldestRecordInTimeFrame.total_output) *
          100;

        if (isNaN(improvement)) {
          setImprovement("0");
        } else {
          setImprovement(improvement.toString());
        }
      }

      setSortedRides(sortedRecords);

    }, 1500);

    // Cleanup function to clear the interval
    return () => clearInterval(intervalId);
  }, []);

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


  React.useEffect(() => {
    setTimeout(() => {
      setshowMainCard(true)
    }, 2500);
  }, [])


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
    <>
      {
        showMainCard ?
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
                          paddingVertical: 35,
                          paddingHorizontal: 35,
                          borderRadius: 8,
                        }}
                      >
                        {
                          personalRecords?.length == 1 ?
                            <Text
                              style={{
                                marginTop: 14,
                                fontSize: 21.5,
                                fontFamily: typography.primaryBold,
                                color: color.palette.textColor,
                                textAlign: "center",
                              }}
                            >
                              {`First Ride \n From here we grow stronger`}
                            </Text>
                            :
                            <>
                              {improvement === `New Ride Length!\nSetting up baselines.\nKeep Going.` ? (
                                <Text
                                  style={{
                                    marginTop: 14,
                                    fontSize: 21.5,
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
                                    fontSize: 27,
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
                                          fontSize: 18,
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
                                          fontSize: 18,
                                          fontFamily: typography.primaryBold,
                                          marginTop: 8,
                                        }}
                                      >
                                        than your average ride{" "}
                                        {timeFrame === "All Time" ? getDurationFromFirstRide() : timeFrame} ago.{" "}
                                      </Text>
                                    </>
                                  ) : (
                                    <Text
                                      style={{
                                        marginTop: 14,
                                        fontSize: 19.5,
                                        fontFamily: typography.primaryBold,
                                        color: color.palette.textColor,
                                        textAlign: "center",
                                        lineHeight: 38,
                                      }}
                                    >
                                      {`“Success is not the result of spontaneous combustion. You must set yourself on fire." - Arnold H. Glasow `}
                                    </Text>
                                  )}
                                </Text>
                              )}
                            </>
                        }

                      </View>


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

                      </View>

                      <View style={{ width: "100%", flexDirection: "row", marginTop: 12 }}>

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

                    </ScrollView>
                    <View
                      style={{ width: "100%", flexDirection: "row", justifyContent: "space-between" }}
                    >
                      <Button
                        text={`Fine\nTune`}
                        preset="primary"
                        // onPress={onFeedbackPressButton}
                        onPress={onOpen}
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
          :
          <>
            <StatusBar backgroundColor="#222529" barStyle="light-content" />
            <View style={{
              backgroundColor: color.palette.mainBgColor,
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}>
              {/* <Image style={{
            width: "60%",
            resizeMode: "contain"
          }} source={require("../../../assets/loading.gif")}></Image> */}
              <ActivityIndicator color={color.palette.primaryColor} size={'large'} />
            </View>
          </>
      }

      <FineTuneCalModal
        isVisible={isVisible}
        onClose={onClose}
        setisFineTuneEnabled={setisFineTuneEnabled}
      />
    </>
  )
}
