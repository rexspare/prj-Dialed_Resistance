/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import { observer } from "mobx-react-lite"
import * as React from "react"
import { Dimensions, Image, Linking, ScrollView, TextInput, TouchableOpacity, View, ViewStyle } from "react-native"
import { Screen, Text } from "../../components"
// import { useStores } from "../models/root-store"
import { color } from "../../theme"
import { SDKContext } from "../../utils/bluetoothSdk"
import { responsiveFontSize } from "../../utils/responsiveDimensions"
export type devices = "all" | "puck" | "wahoo" | false
const ROOT: ViewStyle = {
  backgroundColor: color.palette.mainBgColor,
}
export interface HomeProps {
  navigateToFeedback: () => void;
  onProceed: () => void;
  setcode: (val: string) => void;
  goBack: () => void;
  code: string;
}

export const Presentation = observer(
  ({
    navigateToFeedback,
    onProceed,
    setcode,
    goBack,
    code
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

        <View style={{
          top: 15,
          paddingHorizontal: 15,
          position: "absolute",
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center'

        }}>
          <TouchableOpacity
            onPress={navigateToFeedback}
            style={{
              borderWidth: 0,
              borderColor: color.palette.textColor,
              paddingVertical: 3,
              paddingHorizontal: 15,
              borderRadius: 8,
              backgroundColor: "#0399A5D9",
              padding: 4,
              position: 'absolute',
              left: 15
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

          <Text style={{
            color: '#0399A5',
            fontSize: 22,
            fontFamily: 'Poppins-SemiBold',
            fontWeight: '600',
            textAlign: 'center',
          }}>Welcome</Text>

        </View>

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
            flex: 1,
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
            position: 'absolute',
            paddingTop: Dimensions.get('window').height * 0.18 + 60
          }}>


            <View style={{ marginBottom: 30 }}>
              <Text style={{
                fontSize: 14,
                fontFamily: 'Poppins-SemiBold',
                fontWeight: '500',
                marginBottom: 5
              }}>Access Code</Text>
              <TextInput
                maxLength={300}
                value={code}
                onChangeText={(value: any) => { setcode(value) }}
                placeholderTextColor={color.palette.lighterGrey}
                style={{
                  backgroundColor: color.palette.textColor,
                  color: "#000",
                  width: "100%",
                  height: 50,
                  borderRadius: 8,
                  fontSize: 12,
                  paddingHorizontal: 10,
                }}
              />
            </View>

            <Text style={{
              color: '#FFFFFF',
              fontSize: 14,
              fontFamily: 'Poppins-SemiBold',
              fontWeight: '600',
              lineHeight: 25,
              marginBottom: 30,
              textAlign: 'left',
            }}>{`Please Enter The Access Code\nProvided By Your Spin Class Instructor`}</Text>


            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                width: '100%',
                height: 50,
                backgroundColor: '#0399A5',
                borderRadius: 10,
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => onProceed()}
            >
              <Text style={{
                color: '#FFFFFF',
                fontSize: 14,
                fontFamily: 'Poppins-Medium',
              }}>Submit</Text>

            </TouchableOpacity>

          </View>
        </View>

      </Screen>
    )
  },
)
