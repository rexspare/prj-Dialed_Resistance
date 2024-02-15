import * as React from "react"
import { Alert, Image, TouchableOpacity, View, ViewStyle } from "react-native"
import { Button, Screen, Text } from "../../components"
// import { useStores } from "../models/root-store"
import { color } from "../../theme"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.mainBgColor,
}
export interface SettingsProps {
  goBack: ()=>void
  recalibrate: ()=>void
  developmentTools: ()=>void
}

export const Presentation = ({
  goBack,
  recalibrate,
  developmentTools
}:SettingsProps) => {
  return (
    <Screen style={ROOT}>
      <View style={{
          flexDirection:"row",
          justifyContent:"space-between",
          alignItems:"center",
          
        }}>
<TouchableOpacity style={{marginLeft:20, padding:10}} onPress={goBack}>

<Image  source={require("../../../assets/backArrow.png")} ></Image>
</TouchableOpacity>
        <Text preset='header' text="Settings" style={{ margin: 20,marginLeft:-20, alignSelf: 'center', fontSize:16 }}/>
        <View></View>
        </View>
        {/* <View style={{ borderColor: color.primaryDarker, borderBottomWidth: 1 }}/> */}
        <View style={{ flex: 1, padding: 20 }}>

        <View style={{ flex: 3, justifyContent: 'center' }}>
          <Button style={{
                    width: "100%",
                    alignSelf: "center",
                    backgroundColor: color.palette.primaryColor,
                  }}
                  textStyle={{
                    color: color.palette.textColor,
                    fontWeight:"400",
                    fontSize: 14
                  }} text="Recalibrate" preset='secondary' onPress={recalibrate} />
          <Button style={{
                    width: "100%",
                    alignSelf: "center",
                    backgroundColor: color.palette.primaryColor,
                    marginTop:30
                  }}
                  textStyle={{
                    color: color.palette.textColor,
                    fontWeight:"400",
                    fontSize: 14
                  }} text="Development Tools" preset='secondary' onPress={developmentTools} />
        </View>
        
      </View>

    </Screen>
  )
}
