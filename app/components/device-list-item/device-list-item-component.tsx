import * as React from "react"
import { GestureResponderEvent, TouchableOpacity, View, ViewStyle } from "react-native"
import { Text } from "../"
import { color } from "../../theme"
import { responsiveFontSize, responsiveHeight } from "../../utils/responsiveDimensions"
import { StatusIndicator } from "../status-indicator/status-indicator-component"
import { StatusIndicatorPresetNames } from "../status-indicator/status-indicator.presets"
import { DeviceListItemPresetNames, deviceListItemPresets } from "./device-list-item.presets"

export interface DeviceListItemProps {
  /**
   * Text which is looked up via i18n.
   */
  title: string

  status: StatusIndicatorPresetNames

  onPress: (event: GestureResponderEvent) => void
  /**
   * Which preset is being used
   */
  preset?: DeviceListItemPresetNames
  error?: string | false
}

/**
 * Stateless functional component for your needs
 *
 * Component description here for TypeScript tips.
 */
export function DeviceListItem(props: DeviceListItemProps) {
  // grab the props
  const {
    title,
    status,
    preset = 'primary',
    onPress,
    error,
    ...rest
  } = props
  // grab preset data
  const {
    viewStyle,
    textStyle,
    // hasIcon,
    // etc...
  } = deviceListItemPresets[preset]
  console.log('error', error)
  return (
    <TouchableOpacity onPress={onPress} style={{backgroundColor :color.palette.deviceBg, height: responsiveHeight(100), borderRadius: 10, paddingVertical: responsiveHeight(20), paddingHorizontal: responsiveHeight(16), justifyContent: 'space-between', marginTop:responsiveHeight(16) }}>
      <Text style={{ color: color.text, fontSize: responsiveFontSize(18) }}>{title}</Text>
      <StatusIndicator preset={error ? 'connecting' : status} error={error}/>
    </TouchableOpacity>
  )
}
