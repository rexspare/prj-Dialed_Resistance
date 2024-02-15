import * as React from "react"
import { Image, Picker, ScrollView, TouchableOpacity, View, ViewStyle, TouchableWithoutFeedback } from "react-native"
import { Button, Screen, Text, TextField } from "../../components"
import { Dropdown } from "../../components/dropdown/dropdown-component"
// import { useStores } from "../models/root-store"
import { color } from "../../theme"
import DropDownPicker from 'react-native-dropdown-picker'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "../../utils/responsiveDimensions"
import { observer } from "mobx-react-lite"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1
}
export interface DevOption {
  title: string
  type: 'numeric' | 'dropdown'
  values?: string[]
  value: string
  hidden: boolean
}
export interface DevelopmentToolsProps {
  options: DevOption[],
  updateOption: (optionName: string, newValue: string) => void
  goBack: () => void
  applicationValues: any
}

export const Presentation = observer(({
  options,
  updateOption,
  goBack,
  applicationValues
}:DevelopmentToolsProps) => {
  const [controllers, setControllers] = React.useState([])

  const updateControllers = (instance) => {
    setControllers(prevState => [...prevState, instance])
  }
  const closeDropdown = () => {
    controllers.map(controller => {
      controller?.close()
    })
  }
  return (
    <TouchableWithoutFeedback onPress={closeDropdown}>
      <View style={{ flex: 1 }}>
      <Screen style={ROOT}>
        <View style={{
          flexDirection:"row",
          justifyContent:"space-between",
          alignItems:"center",
          
        }}>

        <TouchableOpacity style={{marginLeft:20,padding:10}} onPress={goBack}>

        <Image source={require("../../../assets/backArrow.png")} ></Image>
        </TouchableOpacity>
          <Text preset='header' text="Development Tools" style={{ margin: 20,marginLeft:-20, alignSelf: 'center', fontSize:16}}/>
          <View></View>
        </View>
          {/* <View style={{ borderColor: color.primaryDarker, borderBottomWidth: 2 }}/> */}
        <View style={{ flex: 1, padding: responsiveWidth(20) }}>

          <ScrollView style={{ width: '100%', height: 30, flex: 1 }}>

            {options.map((option, i) => (
              <>
              {option.hidden ? <></> : (
                <>
                <View key={i} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: responsiveWidth(7) }}>
                  <Text style={{ fontSize: responsiveFontSize(14), }}>{option.title}</Text>
                  {option.type === 'numeric' ? (
                    <TextField value={option.value} onChangeText={value => updateOption(option.title, value)} style={{maxWidth:80}}/>
                  ) : (
                      <Dropdown updateControllers={updateControllers} value={option.value} items={option.values} onValueChange={value => updateOption(option.title, value)}/>
                  )
                  }
                </View>
                <View style={{ width: '100%', borderBottomWidth: 1, borderColor: color.line, opacity:0.2 }}/>
              </>
              )}
              </>
            ))}
            <View style={{ height: 30 }}/>
            {applicationValues && Object.keys(applicationValues).map(item => item && (
              item === "resistanceLevelRatio" || item === "finalTRP" ? (<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15, marginHorizontal: 40, paddingHorizontal: 20, backgroundColor: 'grey' }}>
                <Text style={{ fontSize: responsiveFontSize(17), }}>{item}</Text>
                <Text style={{ fontSize: responsiveFontSize(17), }}>{Number(applicationValues[item]).toFixed(1)}</Text>
              </View>):<></>
            ))}
          </ScrollView>
        </View>
        <View style={{
                    marginHorizontal: 10,
                    marginVertical:20
        }}>
          <Button text='Save, and return.' preset='primary' onPress={goBack} style={{
                    width: "100%",
                    alignSelf: "center",
                    backgroundColor: color.palette.primaryColor,
                  }}
                  textStyle={{
                    color: color.palette.textColor,
                    fontWeight:"400",
                    fontSize: 14
                  }} />
        </View>

      </Screen>
    </View>
    </TouchableWithoutFeedback>
  )
})
