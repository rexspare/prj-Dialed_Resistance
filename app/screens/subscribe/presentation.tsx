/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import { observer } from "mobx-react-lite"
import * as React from "react"
import { Image, ScrollView, TouchableOpacity, View, ViewStyle } from "react-native"
import { Screen, Text } from "../../components"
// import { useStores } from "../models/root-store"
import { color } from "../../theme"
import { SDKContext } from "../../utils/bluetoothSdk"
export type devices = "all" | "puck" | "wahoo" | false
const ROOT: ViewStyle = {
  backgroundColor: color.palette.mainBgColor,
}
export interface HomeProps {
  navigateToFeedback: () => void;
  handleSubscribe: () => void;
}

export const Presentation = observer(
  ({
    navigateToFeedback,
    handleSubscribe,
  }: HomeProps) => {
    const [isUserModalOpen, setIsUserModalOpen] = React.useState(false)
    const SDKState = React.useContext(SDKContext)

    return (
      <Screen style={ROOT}>


        <Image
          source={require('../../../assets/bgLogo.png')}
          style={{
            width: '80%',
            height: '100%',
            alignSelf: 'center'
          }}
          resizeMode='contain'
        />

        <TouchableOpacity
          onPress={navigateToFeedback}
          style={{
            borderWidth: 0,
            borderColor: color.palette.textColor,
            alignSelf: "flex-end",
            paddingVertical: 3,
            paddingHorizontal: 15,
            borderRadius: 8,
            top: 15,
            left: 15,
            position: "absolute",
            backgroundColor: "#0399A5D9",
            padding: 4,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              color: color.palette.textColor,
              fontWeight: "400",
              fontFamily: "NotoSans-Regular",
            }}
          >
            Feedback
          </Text>
        </TouchableOpacity>

        {/* CONTEXT */}
        <View style={{
          flex: 1,
          position: 'absolute',
          width: '90%',
          height: '100%',
          alignItems: 'center',
          alignSelf:'center'
        }}>
          <Text style={{
            color: '#0399A5',
            fontSize: 23,
            fontFamily: 'Poppins-SemiBold',
            fontWeight: '600',
            marginTop: '25%',
            marginBottom: '7%'
          }}>Welcome</Text>

          <ScrollView>
            <Text style={{
              color: '#FFFFFF',
              fontSize: 15,
              fontFamily: 'Poppins-SemiBold',
              fontWeight: '600',
              paddingHorizontal: '5%'
            }}>{`Dialed Resistance supports  app development through subscriptions.\n\nBegin or Renew your subscription to start riding with resistance levels.`}</Text>


            {/* CARD */}
            <View style={{
              width: '90%',
              alignSelf: 'center',
              borderWidth: 1,
              borderColor: '#0399A5',
              borderRadius: 10,
              marginVertical: '10%',
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 15,
              backgroundColor: '#2F3236'
            }}>
              <Text style={{
                color: '#FFFFFF',
                fontSize: 23,
                fontFamily: 'Poppins-SemiBold',
                fontWeight: '600',
                paddingHorizontal: '5%'
              }}>$44 / yr</Text>

              <Text style={{
                color: '#FFFFFF',
                fontSize: 12,
                fontFamily: 'Poppins-Medium',
                fontWeight: '500',
                paddingHorizontal: '5%',
                textAlign: 'center'
              }}>{`AKA $0.12 / day\nAKA one half of one Venti coffee per month`}</Text>

            </View>

            <Text style={{
              color: '#FFFFFF',
              fontSize: 15,
              fontFamily: 'Poppins-SemiBold',
              fontWeight: '600',
              paddingHorizontal: '5%'
            }}>{`A full year or resistance levels for the price of 1 month of other's resistance levels\n\nNicely done, you.`}</Text>

            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                width: '85%',
                height: 50,
                backgroundColor: '#0399A5',
                borderRadius: 10,
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop:30
              }}
              onPress={() => handleSubscribe()}
            >
              <Text style={{
                color: '#FFFFFF',
                fontSize: 14,
                fontFamily: 'Poppins-Medium',
                fontWeight: '500',
              }}>Subscribe</Text>

            </TouchableOpacity>

            {/* <Text style={{
              color: '#FFFFFF',
              fontSize: 11,
              fontFamily: 'Poppins-SemiBold',
              paddingHorizontal: '8%',
              textAlign: 'left',
              marginTop: 10
            }}>{`Promo Codes can be applied during the subscription checkout\n\nTo extend  subscription to family members enable Family Sharing in google play.`}</Text> */}


          </ScrollView>

        </View>

      </Screen>
    )
  },
)
