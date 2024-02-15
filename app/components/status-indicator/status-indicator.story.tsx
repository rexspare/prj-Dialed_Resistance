import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { StatusIndicator } from "./status-indicator-component"
import { StatusIndicatorPresetNames, statusIndicatorPresets } from "./status-indicator.presets"

declare let module

storiesOf("StatusIndicator", module)
  .addDecorator(fn => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      {Object.keys(statusIndicatorPresets).map(preset => (
        <UseCase text={preset} key={preset} usage={"The" + preset}>
          <StatusIndicator
            text="StatusIndicator"
            preset={preset as StatusIndicatorPresetNames}
          />
        </UseCase>
      ))}
    </Story>
  ))
