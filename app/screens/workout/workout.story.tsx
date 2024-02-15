import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { Presentation } from "./presentation"
import { SafeAreaProvider } from "react-native-safe-area-context"

declare var module

storiesOf("Screens", module)
  .add("Workout", () => (
    <SafeAreaProvider>
      <Presentation 
       onDecrementResistance={() => alert("pressed")}
       onIncrementResistance={() => alert("pressed")}/>
    </SafeAreaProvider>
  ))
