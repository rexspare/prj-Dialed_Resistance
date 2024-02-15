import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { Presentation } from "./presentation"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { Calibration } from "./calibration-screen"

declare let module

storiesOf("Screens", module)
  .add("Calibration", () => (
    <SafeAreaProvider>
      <Presentation showText={3} logs={[]} heartRate={52} cadence={50}/>
    </SafeAreaProvider>
  ))
