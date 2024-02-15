import React, { useEffect } from "react"
import { Presentation, DevelopmentToolsProps, DevOption } from "./presentation"
import { observer } from "mobx-react-lite"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { Alert, ToastAndroid, View } from "react-native"
import axios from "axios"
import pkg from "../../../package.json"
import DeviceInfo from "react-native-device-info"
import { getLogs, storeLogs } from "../../services/storage/asyncServices"
import { getCurrentUnixTime } from "../../utils/dateUtils"
// import { useStores } from "../models/root-store"

export const Feedback: React.FunctionComponent = observer((props) => {
  // Pull in navigation via hook
  const navigation = props.navigation
  // return <View/>

  const validateEmail = (email: string) => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email)
  }

  const onContinuePress = async (data, setIsLoading) => {
    const model = DeviceInfo.getModel()
    const buildId = await DeviceInfo.getBuildId()
    const buildNumber = DeviceInfo.getBuildNumber()
    const logs = await getLogs()

    const datatosend = {
      Feedback_Type: data.category,
      Urgency: data.urgency,
      Details: data.feedback,
      Contact_Me: data.contactMe,
      Contact_Info: data.email,
      Date_Submitted: `${new Date().getMonth() + 1
        }/${new Date().getDate()}/${new Date().getFullYear()}`,
      From_Screen: props.route.params?.fromScreen,
      Phone_Model: model,
      OS_Build_Id: buildId,
      OS_Build_Number: buildNumber,
      Logs: data?.category == 'Bug' ? logs : '',
      App_Version: pkg.version,
    }
    if (data.category === "") {
      ToastAndroid.showWithGravityAndOffset(
        "Category is required",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      )
    } else if (data.urgency === "") {
      ToastAndroid.showWithGravityAndOffset(
        "Urgency is required",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      )
    } else if (data.feedback === "") {
      ToastAndroid.showWithGravityAndOffset(
        "Feedback is required",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      )
    } else if (data.contactMe) {
      if (data.email?.trim() === "") {
        ToastAndroid.showWithGravityAndOffset(
          "Email is required",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        )
      } else if (!validateEmail(data.email)) {
        ToastAndroid.showWithGravityAndOffset(
          "Please enter valid email",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        )
      } else {
        setIsLoading(true)
        if (data.includeScreenshot) {
          // datatosend.Screenshot = props.route.params?.imageBase64
        }

        console.log(datatosend)

        axios
          .post("https://sheetdb.io/api/v1/3jwvb0eg75eia", {
            data: datatosend,
          })
          .then((response) => {
            setIsLoading(false)
            ToastAndroid.showWithGravityAndOffset(
              "Feedback recorded",
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              25,
              50,
            )
          })
          .catch(async (e) => {
            setIsLoading(false)
            console.log(e)
            ToastAndroid.showWithGravityAndOffset(
              "Some Error Occured",
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              25,
              50,
            )

            const createdAt = getCurrentUnixTime()
            await storeLogs(JSON.stringify({
              screen: 'feedback',
              id: 'submitfeed1',
              log: e,
              createdAt
            }))
          })
      }
    } else {
      setIsLoading(true)
      if (data.includeScreenshot) {
        // datatosend.Screenshot = props.route.params?.imageBase64
      }

      console.log(datatosend)

      axios
        .post("https://sheetdb.io/api/v1/3jwvb0eg75eia", {
          data: datatosend,
        })
        .then((response) => {
          setIsLoading(false)
          ToastAndroid.showWithGravityAndOffset(
            "Feedback recorded",
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          )
        })
        .catch(async (e) => {
          setIsLoading(false)
          console.log(e)
          ToastAndroid.showWithGravityAndOffset(
            "Some Error Occured",
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          )
          const createdAt = getCurrentUnixTime()
          await storeLogs(JSON.stringify({
            screen: 'feedback',
            id: 'submitfeed2',
            log: e,
            createdAt
          }))
        })
    }
  }

  return (
    <Presentation
      onContinuePress={onContinuePress}
      profile={props.route.params.data}
      goBack={() => navigation.goBack()}
    />
  )
})
