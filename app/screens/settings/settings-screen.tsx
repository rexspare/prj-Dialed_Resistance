import * as React from "react"
import { Presentation, SettingsProps } from "./presentation"
import { observer } from "mobx-react-lite"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
// import { useStores } from "../models/root-store"

export const Settings: React.FunctionComponent<SettingsProps> = observer((props) => {
  // Pull in one of our MST stores
  const { resetAppvalues } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()
  return (
    <Presentation
      developmentTools={() => navigation.navigate('devTools')}
      recalibrate={() => {
        resetAppvalues()
        navigation.navigate('calibration')
      }}
      goBack={() => navigation.goBack()} />
  )
})
