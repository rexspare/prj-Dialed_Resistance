import * as React from "react"
import { Presentation, ResistancePromptProps } from "./presentation"
import { observer } from "mobx-react-lite"
import { useNavigation } from "@react-navigation/core"
// import { useStores } from "../models/root-store"

export const ResistancePrompt: React.FunctionComponent<ResistancePromptProps> = observer((props) => {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()
  return (
    <Presentation onPressButton={() => navigation.navigate('workout', { duration: props.route?.params?.duration })}/>
  )
})
