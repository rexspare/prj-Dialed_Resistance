import * as React from "react"
import {Presentation} from '../../screens/HeartRateConnection/presentation'
import { observer } from "mobx-react-lite"
// import { useStores } from "../models/root-store"
import { NavigationScreenProps } from "react-navigation"


export const HeartRateConnectionScreen = observer(function HeartRateConnectionScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Presentation/>
  )
})
