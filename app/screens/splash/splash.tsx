import * as React from "react"
import { Image, StatusBar, Text, View } from "react-native"
import { color } from "../../theme"

export const Splash: React.FunctionComponent = ({navigation}) => {
  React.useEffect(()=>{
    setTimeout(()=>{
      navigation.replace('home')
    },2500)
  },[])
  return (
    <>
      <StatusBar backgroundColor="#222529" barStyle="light-content" />
    <View style={{
      backgroundColor: color.palette.mainBgColor,
      flex:1,
      justifyContent:"center",
      alignItems:"center"
    }}>
      <Image style={{
        width: "60%",
        resizeMode:"contain"
      }} source={require("../../../assets/Splash-2.gif")}></Image>
    </View>
    </>
  )
  }
