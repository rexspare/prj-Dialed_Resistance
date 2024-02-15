import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { Presentation } from "./presentation"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { DevelopmentTools } from "./development-tools-screen"
import { Alert } from "react-native"

declare let module

storiesOf("Screens", module)
  .add("DevelopmentTools", () => (
    <SafeAreaProvider>
      <Presentation options={[{ title: 'me', type: 'numeric', value: '10' }]}/>
    </SafeAreaProvider>
  ))
