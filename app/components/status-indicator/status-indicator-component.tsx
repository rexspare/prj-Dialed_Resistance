import * as React from "react"
import { ActivityIndicator, View, ViewStyle } from "react-native"
import { CirclesLoader } from 'react-native-indicator'
import { Text } from "../"
import { color } from "../../theme"
import { responsiveWidth } from "../../utils/responsiveDimensions"
import { Icon } from "../icon/icon"
import { StatusIndicatorPresetNames, statusIndicatorPresets } from "./status-indicator.presets"
export interface StatusIndicatorProps {
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
  preset?: StatusIndicatorPresetNames
  error?: string | false
}

/**
 * Stateless functional component for your needs
 *
 * Component description here for TypeScript tips.
 */
export function StatusIndicator(props: StatusIndicatorProps) {
  // grab the props
  const {
    style,
    preset = 'connected',
    error,
    ...rest
  } = props

  // grab preset data
  const {
    viewStyle,
    iconStyle,
    iconContainerStyle,
    iconName,
    textStyle,
    indicator,
    // hasIcon,
    // etc...
  } = statusIndicatorPresets[preset]
  const [text, setText] = React.useState(preset.toUpperCase())
  React.useEffect(() => {
    console.log('error', error)
    if (error) {
      setText('This takes 3-5 seconds.')
    } else {
      setText(preset.toUpperCase())
    }
  }, [error, preset])
  return (
    <View style={[style, viewStyle]} {...rest}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text text={text === "CONNECTING" ? "Trying to connect" : text} style={textStyle} />
        {/* <ActivityIndicator color='white' size='small' style={indicator}/> */}

      </View>
      {text === "CONNECTING" ? (<CirclesLoader size={15} dotRadius={3} color={color.palette.textColor} />) : (<Icon icon={iconName} style={iconStyle} containerStyle={iconContainerStyle}/>)}

    </View>
  )
}
