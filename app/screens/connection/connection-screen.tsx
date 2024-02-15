import * as React from "react"
import { Presentation, ConnectionProps } from "./presentation"
import { observer } from "mobx-react-lite"
// import { useStores } from "../models/root-store"


export const Connection: React.FunctionComponent<ConnectionProps> = observer((props) => {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Presentation />
  )
})
