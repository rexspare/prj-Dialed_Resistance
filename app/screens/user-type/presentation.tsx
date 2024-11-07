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
  navigatoToGymCode: () => void;
  navigatoToOnboarding: () => void;
  goBack: () => void;
}

export const Presentation = observer(
  ({
    navigateToFeedback,
    navigatoToOnboarding,
    navigatoToGymCode,
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
            justifyContent: 'center'
          }}>


            <Text style={{
              color: '#0399A5',
              fontSize: 23,
              fontFamily: 'Poppins-SemiBold',
              fontWeight: '600',
              textAlign: 'center',
            }}>Welcome</Text>



          </View>



          <View style={{
            flex: 1,
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
            position: 'absolute',
            paddingTop: Dimensions.get('window').height * 0.2 + 60
          }}>

            <Text style={{
              color: '#FFFFFF',
              fontSize: 15,
              fontFamily: 'Poppins-SemiBold',
              fontWeight: '600',
              lineHeight: 25,
              marginBottom: 30,
              textAlign: 'center'
            }}>{`Are You Signing In From A Gym With An Access Code?`}</Text>





            <View style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>

              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  width: '42%',
                  height: 50,
                  backgroundColor: '#0399A5',
                  borderRadius: 10,
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => navigatoToGymCode()}
              >
                <Text style={{
                  color: '#FFFFFF',
                  fontSize: 14,
                  fontFamily: 'Poppins-Medium',
                }}>Yes</Text>

              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  width: '42%',
                  height: 50,
                  borderWidth: 3,
                  borderColor: '#0399A5',
                  borderRadius: 10,
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => navigatoToOnboarding()}
              >
                <Text style={{
                  color: '#FFFFFF',
                  fontSize: 14,
                  fontFamily: 'Poppins-Medium',
                }}>No</Text>

              </TouchableOpacity>

            </View>

          </View>
        </View>

      </Screen>
    )
  },
)
