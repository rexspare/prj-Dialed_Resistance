import * as React from "react"
import { View, ViewStyle } from "react-native"
import { Text } from "../"
import { DropdownPresetNames, dropdownPresets } from "./dropdown.presets"
import DropDownPicker from 'react-native-dropdown-picker'
import { Icon } from "../icon/icon"
import { responsiveWidth } from "../../utils/responsiveDimensions"
import { color } from "../../theme"
import { placeholder } from "i18n-js"

export interface DropdownProps {
  items: string []
  /**
   * Text which is looked up via i18n.
   */
  tx?: string

  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string

  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle
  /**
   * Which preset is being used
   */
  preset?: DropdownPresetNames
  onValueChange: (newValue: string) => void
  updateControllers: (instance: any) => void
  value: string
  placeholder: string
}

/**
 * Stateless functional component for your needs
 *
 * Component description here for TypeScript tips.
 */
export function Dropdown(props: DropdownProps) {
  // grab the props
  const {
    tx,
    text,
    style,
    preset = 'primary',
    onValueChange,
    updateControllers,
    value,
    items,
    placeholder,
    ...rest
  } = props

  // grab preset data
  const {
    viewStyle,
    textStyle,
    // hasIcon,
    // etc...
  } = dropdownPresets[preset]
  const itemsArray = items.map(item => ({
    label: item,
    value: item
  }))

  const [instanceRef, setInstanceRef] = React.useState()

  React.useEffect(() => {
    if (instanceRef && updateControllers) {
      updateControllers(instanceRef)
    }
  }, [instanceRef])

  return (
    <View>
      <DropDownPicker
        controller={instance => setInstanceRef(instance)}
        placeholder={placeholder || "Select an item"}
        items={itemsArray}
        defaultValue={value}
        containerStyle={{ width: responsiveWidth(100), height: responsiveWidth(25), ...style }}
        style={{ backgroundColor: '#fafafa', paddingVertical: 0, borderColor: color.line, borderBottomLeftRadius: 4, borderBottomRightRadius: 4 }}
        itemStyle={{
          justifyContent: 'flex-start'
        }}
        onChangeItem={({ value }) => onValueChange(value)}
        arrowColor={color.palette.primaryColor}
        labelStyle={{ marginLeft: 0 }}
        dropDownStyle={{ backgroundColor: '#fafafa', borderTopLeftRadius: 4, borderTopRightRadius: 4, borderBottomLeftRadius: 4, borderBottomRightRadius: 4, marginTop: 1 }}
      />
    </View>
  )
}
