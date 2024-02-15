import * as React from "react"
import {Presentation} from '../../screens/Workout/presentation'
import { observer } from "mobx-react-lite"
// import { useStores } from "../models/root-store"
import { NavigationScreenProps } from "react-navigation"


export const WorkoutScreen = observer(function WorkoutScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Presentation/>
  )
})
