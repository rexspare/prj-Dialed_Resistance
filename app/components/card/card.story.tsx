import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { Card } from "./card-component"
import { CardPresetNames, cardPresets } from "./card.presets"
import { Alert, View } from "react-native"

declare let module

storiesOf("Card", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      {Object.keys(cardPresets).map((preset) => (
        <UseCase text={preset} key={preset} usage={"The" + preset}>
          <View style={{ width: 300, height: 400 }}>
            <Card
              text="Card"
              title='test'
              value='test'
              // showResistanceButtons
              preset={preset as CardPresetNames}
              onDecrementResistance={() => alert("pressed")}
              onIncrementResistance={() => alert("pressed")}
            />
          </View>
        </UseCase>
      ))}
    </Story>
  ))
