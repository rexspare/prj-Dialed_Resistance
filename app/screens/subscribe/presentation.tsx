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
  goBack: () => void;
}

export const Presentation = observer(
  ({
    navigateToFeedback,
    handleSubscribe,
    goBack
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
          alignSelf: 'center'
        }}>



          <View style={{
            width: '85%',
            marginTop: 60,
            marginBottom: '7%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>

            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderColor: "#0399A5",
                borderRadius: 21,
                width: 21,
                height: 21,
                justifyContent: "center",
                alignItems: "center"
              }}
              hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
              onPress={goBack}>

              <Image
                source={require("../../../assets/backArrow.png")}
                style={{
                  width: 6,
                }} />
            </TouchableOpacity>

            <Text style={{
              color: '#0399A5',
              fontSize: 23,
              fontFamily: 'Poppins-SemiBold',
              fontWeight: '600',
              textAlign: 'center',
            }}>Welcome</Text>

            <View
              style={{
                width: 21,
              }}
            ></View>

          </View>

          <ScrollView>

            <Text style={{
              color: '#FFFFFF',
              fontSize: 15,
              fontFamily: 'Poppins-SemiBold',
              fontWeight: '600',
              paddingHorizontal: '7%'
            }}>{`Dialed Resistance Supports  App Development Through Subscriptions.\n\nBegin or Renew Your Subscription To Start Riding With Resistance Levels.`}</Text>


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
              paddingBottom: 15,
              backgroundColor: '#2F3236'
            }}>

              <View
                style={{
                  width: '101%',
                  borderWidth: 3,
                  borderColor: '#0399A5',
                  borderRadius: 10,
                  top: -1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingBottom: 4
                }}
              >
                <Text style={{
                  color: '#FFFFFF',
                  fontSize: 28,
                  fontFamily: 'Poppins-Medium',
                  fontWeight: '500',
                }}>6 Months Free</Text>
                <Text style={{
                  color: '#FFFFFF',
                  fontSize: 14,
                  fontFamily: 'Poppins-Medium',
                  fontWeight: '500',
                }}>For New Subscribers</Text>
              </View>


              <Text style={{
                color: '#FFFFFF',
                fontSize: 12,
                fontFamily: 'Poppins-Medium',
                fontWeight: '600',
                marginTop: 10
              }}>Then</Text>

              <Text style={{
                color: '#FFFFFF',
                fontSize: 23,
                fontFamily: 'Poppins-SemiBold',
                fontWeight: '600',
                marginVertical: 3
              }}>$3.66 <Text style={{ fontSize: 12, }}>per</Text> Month</Text>

              <Text style={{
                color: '#FFFFFF',
                fontSize: 12,
                fontFamily: 'Poppins-Medium',
                fontWeight: '500',
                textAlign: 'center',
                lineHeight: 18
              }}>{`AKA $0.12 / Day`}</Text>

            </View>

            {/* <Text style={{
              color: '#FFFFFF',
              fontSize: 15,
              fontFamily: 'Poppins-SemiBold',
              fontWeight: '600',
              paddingHorizontal: '7%'
            }}>{`A Full Year Of Resistance Levels For Less Than The Cost Of One Month From Others.\n\nNicely Done, You.`}</Text> */}

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
                marginVertical: 30
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
