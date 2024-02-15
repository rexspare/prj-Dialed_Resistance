import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { Presentation } from "./presentation"
import { SafeAreaProvider } from "react-native-safe-area-context"

declare let module

storiesOf("Screens", module)
  .add("Settings", () => (
    <SafeAreaProvider>
      <Presentation />
    </SafeAreaProvider>
  ))
