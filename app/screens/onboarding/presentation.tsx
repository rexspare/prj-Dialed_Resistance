/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import { observer } from "mobx-react-lite"
import * as React from "react"
import { Dimensions, Image, Linking, ScrollView, TouchableOpacity, View, ViewStyle } from "react-native"
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
          width: '80%',
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



          <View style={{
            flex: 1,
            justifyContent: 'center',
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
            position: 'absolute'
          }}>

            <Text style={{
              color: '#FFFFFF',
              fontSize: 15,
              fontFamily: 'Poppins-SemiBold',
              fontWeight: '600',
              paddingHorizontal: '10%',
              lineHeight: 25,
              marginBottom: 30
            }}>{`Dialed Resistance Adds Smart\nResistance Levels To Any Spin\nBike And Requires The Use Of`}</Text>

            <Text style={{
              color: '#FFFFFF',
              fontSize: 15,
              fontFamily: 'Poppins-SemiBold',
              fontWeight: '600',
              paddingHorizontal: '12%',
              lineHeight: 25,
            }}>• <Text >{`Our Patent Pending\n   Resistance Level Monitor`}</Text>
            </Text>


            <Text style={{
              color: '#FFFFFF',
              fontSize: 15,
              fontFamily: 'Poppins-SemiBold',
              fontWeight: '600',
              paddingHorizontal: '12%',
              lineHeight: 25,
            }}>• <Text >{`The Wahoo Cadence Sensor`}</Text>
            </Text>

            <Text style={{
              color: '#FFFFFF',
              fontSize: 15,
              fontFamily: 'Poppins-SemiBold',
              fontWeight: '600',
              paddingHorizontal: '10%',
              lineHeight: 25,
              marginTop: 30
            }}>{`If You Don’t Already Own Our Resistance Monitor It Can Be Purchased From Our Site Below.`}</Text>


            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                width: Dimensions.get('screen').width * 0.8,
                height: 50,
                borderWidth: 3,
                borderColor: '#0399A5',
                borderRadius: 10,
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 30
              }}
              onPress={() => {
                Linking.openURL("https://www.dialedresistance.com/#betaprogram")
              }}
            >
              <Text style={{
                color: '#FFFFFF',
                fontSize: 14,
                fontFamily: 'Poppins-Medium',
              }}>www.DialedResistance.com</Text>

            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                width: Dimensions.get('screen').width * 0.8,
                height: 50,
                backgroundColor: '#0399A5',
                borderRadius: 10,
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20
              }}
              onPress={() => handleSubscribe()}
            >
              <Text style={{
                color: '#FFFFFF',
                fontSize: 14,
                fontFamily: 'Poppins-Medium',
              }}>I Already Have The Device</Text>

            </TouchableOpacity>

          </View>
        </View>

      </Screen>
    )
  },
)
