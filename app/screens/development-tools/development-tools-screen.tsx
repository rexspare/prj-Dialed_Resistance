import React, { useEffect } from "react"
import { Presentation, DevelopmentToolsProps, DevOption } from "./presentation"
import { observer } from "mobx-react-lite"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { Alert, View } from "react-native"
// import { useStores } from "../models/root-store"

export const DevelopmentTools: React.FunctionComponent = observer((props) => {
  // Pull in one of our MST stores
  const { variables, updateOption: updateOptionAction, applicationValues } = useStores()
  const options = variables
  const updateOption: (optionName: string, newValue: string) => void = (optionName, newValue) => {
    updateOptionAction(optionName, newValue)
  }
  const { RPM, userEffortLevel, resistanceLevelRatio, finalTRP } = applicationValues
  // Pull in navigation via hook
  const navigation = props.navigation
  // return <View/>
  return (
    <Presentation options={options} updateOption={updateOption} goBack={() => navigation.goBack()} applicationValues={{ finalTRP, RPM, resistanceLevelRatio }}/>
  )
})
