import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { DeviceListItem } from "./device-list-item-component"
import { DeviceListItemPresetNames, deviceListItemPresets } from "./device-list-item.presets"

declare let module

storiesOf("DeviceListItem", module)
  .addDecorator(fn => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      {Object.keys(deviceListItemPresets).map(preset => (
        <UseCase text={preset} key={preset} usage={"The" + preset}>
          <DeviceListItem
            text="DeviceListItem"
            preset={preset as DeviceListItemPresetNames}
          />
        </UseCase>
      ))}
    </Story>
  ))
