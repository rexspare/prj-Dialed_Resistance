import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { Dropdown } from "./dropdown-component"
import { DropdownPresetNames, dropdownPresets } from "./dropdown.presets"

declare let module

storiesOf("Dropdown", module)
  .addDecorator(fn => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      {Object.keys(dropdownPresets).map(preset => (
        <UseCase text={preset} key={preset} usage={"The" + preset}>
          <Dropdown
            text="Dropdown"
            preset={preset as DropdownPresetNames}
          />
        </UseCase>
      ))}
    </Story>
  ))
