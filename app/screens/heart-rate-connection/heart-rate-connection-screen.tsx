import * as React from "react"
import { Presentation, HeartRateConnectionProps } from "./presentation"
import { observer } from "mobx-react-lite"
// import { useStores } from "../models/root-store"


export const HeartRateConnection: React.FunctionComponent<HeartRateConnectionProps> = observer((props) => {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Presentation />
  )
})
