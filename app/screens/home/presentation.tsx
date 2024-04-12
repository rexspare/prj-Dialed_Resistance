/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import { observer, useObserver } from "mobx-react-lite"
import * as React from "react"
import { Alert, Image, Modal, TouchableOpacity, View, ViewStyle } from "react-native"
import { Button, DeviceListItem, Icon, Screen, StatusIndicator, Text } from "../../components"
// import { useStores } from "../models/root-store"
import { color, typography } from "../../theme"
import SDK, { SDKContext } from "../../utils/bluetoothSdk"
import { responsiveHeight, responsiveWidth } from "../../utils/responsiveDimensions"
export type devices = "all" | "puck" | "wahoo" | false
const ROOT: ViewStyle = {
  backgroundColor: color.palette.mainBgColor,
}
export interface HomeProps {
  connectPuck: () => void
  connectWahoo: () => void
  connectWahooHR: () => void
  statusPuck: "connected" | "connecting" | "disconnected"
  statusWahoo: "connected" | "connecting" | "disconnected"
  statusWahooHR: "connected" | "connecting" | "disconnected"
  connectedDevices: devices[]
  onPressSettings: () => void
  onPressContinue: () => void
  heartRateError: string | false
  onPressRecalibrate: () => void
  onPressProfile: () => void
  profiles: () => Array<unknown>
  selectedProfile: () => Record<string, unknown>
  setSelectedProfile: () => void
  navigateToFeedback: () => void
}

export const Presentation = observer(
  ({
    connectPuck,
    connectWahoo,
    connectWahooHR,
    statusPuck,
    statusWahoo,
    statusWahooHR,
    connectedDevices,
    onPressSettings,
    onPressContinue,
    onPressRecalibrate,
    onPressProfile,
    heartRateError,
    profiles,
    selectedProfile,
    setSelectedProfile,
    navigateToFeedback,
  }: HomeProps) => {
    const [isUserModalOpen, setIsUserModalOpen] = React.useState(false)
    const SDKState = React.useContext(SDKContext)

    return (
      <Screen style={ROOT}>
        <TouchableOpacity
          onPress={() => {
            setIsUserModalOpen(true)
          }}
          style={{
            borderWidth: 1,
            borderColor: color.palette.textColor,
            alignSelf: "flex-end",
            paddingVertical: 3,
            paddingHorizontal: 15,
            borderRadius: 8,
            top: 15,
            right: 15,
            position: "absolute",
          }}
        >
          <Text
            style={{
              fontSize: 12,
              color: color.palette.textColor,
            }}
          >
            {selectedProfile?.name ? selectedProfile?.name : "New User"}
          </Text>
        </TouchableOpacity>

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

        <View style={{ flex: 4, alignItems: "center", justifyContent: "center" }}>
          <TouchableOpacity
            style={{ flex: 4, alignItems: "center", justifyContent: "center" }}
            onLongPress={onPressSettings}
            activeOpacity={1}
            delayLongPress={3000}
          >
            <Image style={{ width: 100, resizeMode: "contain" }} source={require("./logo.png")} />
          </TouchableOpacity>

          <Text
            preset="header"
            text="Dialed Resistance"
            style={{
              alignSelf: "center",
              marginTop: -50,
              fontSize: 17,
              color: color.palette.primaryColor,
              fontFamily: typography.primaryBold,
            }}
          />
        </View>

        <View
          style={{
            flex: 7.5,
            marginTop: 50,
            backgroundColor: color.palette.secondaryBgColor,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            paddingTop: 30,
            // elevation: 10,
            overflow: "hidden",
          }}
        >
          <View
            style={{
              justifyContent: "center",
              height: responsiveHeight(35.9),
            }}
          >
            <Text
              preset="subheader"
              text="Required Devices"
              style={{ alignSelf: "center", fontSize: 18 }}
            />
          </View>

          <View
            style={{
              paddingHorizontal: responsiveWidth(10),
              // paddingVertical: responsiveHeight(15),
              flex: 1,
              // justifyContent: "space-between",
            }}
          >
            <DeviceListItem
              title="Cadence Sensor"
              status={statusWahoo}
              onPress={connectWahoo}
              error={false}
            />

            <DeviceListItem
              title="Resistance Monitor"
              status={statusPuck}
              onPress={connectPuck} />

          </View>
          {/* <View
            style={{
              backgroundColor: color.palette.lightGrey,
              justifyContent: "center",
              height: responsiveHeight(35.9),
            }}
          >
            <Text preset="subheader" text="Optional Devices" style={{ alignSelf: "center" }} />
          </View> */}
          {/* <View
            style={{
              paddingHorizontal: responsiveWidth(20),
              paddingVertical: responsiveHeight(15),
              flex: 0.45,
              justifyContent: "space-between",
            }}
          >
            <DeviceListItem
              title="Heart Rate & Cadence Monitor"
              status={statusWahooHR}
              onPress={connectWahooHR}
              error={heartRateError}
            />
          </View> */}

          <View
            style={{
              flexDirection: "row",
              width: "100%",
              paddingHorizontal: responsiveWidth(10),
              paddingBottom: 15,
            }}
          >
            {/* <Button
              text="Recalibrate"
              preset={
                connectedDevices.includes("wahoo") && connectedDevices.includes("puck")
                  ? "secondary"
                  : "inactive"
              }
              disabled={!(connectedDevices.includes("wahoo") && connectedDevices.includes("puck"))}
              onPress={onPressRecalibrate}
              style={{ height: 50, flex: 0.45, backgroundColor: "transparent", borderWidth: 1, borderColor: connectedDevices.includes("wahoo") && connectedDevices.includes("puck") ? color.palette.primaryColor : color.palette.textColor, opacity: connectedDevices.includes("wahoo") && connectedDevices.includes("puck") ? 1 : 0.5 }}
              textStyle={{ fontSize: 14, color: connectedDevices.includes("wahoo") && connectedDevices.includes("puck") ? color.palette.primaryColor : color.palette.textColor, opacity: connectedDevices.includes("wahoo") && connectedDevices.includes("puck") ? 1 : 0.5, fontWeight: "300" }}
            /> */}
            <Button
              text="Continue"
              preset={
                connectedDevices.includes("wahoo") && connectedDevices.includes("puck")
                  ? "primary"
                  : "inactive"
              }
              disabled={!(connectedDevices.includes("wahoo") && connectedDevices.includes("puck"))}
              onPress={onPressContinue}
              style={{ height: 48, flex: 1, borderWidth: 0 }}
              textStyle={{
                fontSize: 14,
                fontWeight: "400",
              }}
            />
          </View>
          {/* <View>
           <TouchableOpacity
            onPress={onPressSettings}
            hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
            style={{ paddingBottom: 10, paddingHorizontal: responsiveWidth(20), width: 50, alignSelf: "flex-end" }}
          >
            <Icon icon="settings" style={{ tintColor: "#F1F4D8" }} />
          </TouchableOpacity>
         </View> */}
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={isUserModalOpen}
        // onRequestClose={() => {
        //   Alert.alert("Modal has been closed.");
        //   setModalVisible(!modalVisible);
        // }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#00000095",
            }}
          >
            <View
              style={{
                margin: 20,
                backgroundColor: color.palette.mainBgColor,
                borderRadius: 16,
                paddingVertical: 14,
                paddingHorizontal: 20,
                alignItems: "center",
                width: "75%",
                borderWidth: 1,
                borderColor: color.palette.primaryColor,
              }}
            >
              {/* <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    marginTop: 6,
                    marginBottom: 18,
                  }}> */}
              <TouchableOpacity
                onPress={() => {
                  setIsUserModalOpen(false)
                  navigateToFeedback()
                }}
                style={{
                  position: "absolute",
                  left: 16,
                  top: 20,
                  backgroundColor: "#0399A5D9",
                  padding: 4,
                  borderRadius: 8,
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

              <Text
                style={{
                  fontSize: 19,

                  marginTop: 6,
                  marginBottom: 18,
                  color: color.palette.textColor,
                }}
              >
                Profile
              </Text>
              <TouchableOpacity
                style={{ position: "absolute", right: 24, top: 24 }}
                onPress={() => {
                  setIsUserModalOpen(false)
                }}
              >
                <Image style={{ width: 16, height: 16 }} source={require("./cross.png")}></Image>
              </TouchableOpacity>
              {/* </View> */}

              {profiles.map((profile) => (
                <View
                  key={profile.name}
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginVertical: 6,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setIsUserModalOpen(false)
                      setSelectedProfile(profile)
                    }}
                    style={{
                      width: "63%",
                      borderWidth: 1,
                      borderColor: color.palette.primaryColor,
                      paddingVertical: 5,
                      paddingHorizontal: 20,
                      borderRadius: 8,
                      alignItems: "center",
                    }}
                  >
                    <Text
                      numberOfLines={1}
                      style={{
                        fontSize: 16,
                        color: color.palette.textColor,
                      }}
                    >
                      {profile.name}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setIsUserModalOpen(false)
                      onPressProfile(profile)
                    }}
                    style={{
                      width: "32%",
                      borderWidth: 1,
                      borderColor: color.palette.primaryColor,
                      paddingVertical: 5,
                      paddingHorizontal: 20,
                      borderRadius: 8,
                      alignItems: "center",
                    }}
                  >
                    <Text
                      numberOfLines={1}
                      style={{
                        fontSize: 16,
                        color: color.palette.textColor,
                      }}
                    >
                      Edit
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}

              {/* <View style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginVertical: 6
                }}>
                  <View style={{ width: "60%", borderWidth: 1, borderColor: color.palette.textColor, paddingVertical: 5, paddingHorizontal: 20, borderRadius: 8, alignItems: "center" }}>
                <Text style={{
                  fontSize: 16,
                  color: color.palette.textColor
                }}>John Doe</Text>
              </View>
                <TouchableOpacity style={{ width: "35%", borderWidth: 1, borderColor: color.palette.textColor, paddingVertical: 5, paddingHorizontal: 20, borderRadius: 8, alignItems: "center" }}>
                <Text style={{
                  fontSize: 16,
                  color: color.palette.textColor
                }}>Edit</Text>
              </TouchableOpacity>
                </View> */}

              <TouchableOpacity
                onPress={() => {
                  setIsUserModalOpen(false)
                  onPressProfile()
                }}
                style={{
                  width: "100%",
                  borderWidth: 1,
                  borderColor: color.palette.primaryColor,
                  paddingVertical: 5,
                  paddingHorizontal: 20,
                  borderRadius: 8,
                  alignItems: "center",
                  marginTop: 6,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: color.palette.textColor,
                  }}
                >
                  Create New
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </Screen>
    )
  },
)
