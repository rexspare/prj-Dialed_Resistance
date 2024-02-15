import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import App from '../app/app'

declare let module

storiesOf("App", module)
  .add("App", () => (
    <App disable/>
  ))
