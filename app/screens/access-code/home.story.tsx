import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { Presentation } from "./presentation"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { Home } from "./home-screen"
import { Alert } from "react-native"

declare let module

storiesOf("Screens", module)
  .add("Home", () => (
    <SafeAreaProvider>
      <Home navigation={{ navigate: value => Alert.alert(value) }}/>
    </SafeAreaProvider>
  ))
