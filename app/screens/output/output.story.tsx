import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { Presentation } from "./presentation"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { Alert } from "react-native"

declare let module

storiesOf("Screens", module)
  .add("Output", () => (
    <SafeAreaProvider>
      <Presentation goHome={() => Alert.alert('me')}/>
    </SafeAreaProvider>
  ))
