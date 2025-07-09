/**
 * Welcome to the main entry point of the app. In this file, we'll
 * be kicking off our app.
 *
 * Most of this file is boilerplate and you shouldn't need to modify
 * it very often. But take some time to look through and understand
 * what is going on here.
 *
 * The app navigation resides in ./app/navigation, so head over there
 * if you're interested in adding screens and navigators.
 */
import "./i18n"
import "./utils/ignore-warnings"
import React, { useState, useEffect, useRef } from "react"
import { NavigationContainerRef } from "@react-navigation/native"
import { SafeAreaProvider, initialWindowMetrics } from "react-native-safe-area-context"
import { initFonts } from "./theme/fonts" // expo
import * as storage from "./utils/storage"
import KeepAwake from 'react-native-keep-awake';
import {
  useBackButtonHandler,
  RootNavigator,
  canExit,
  setRootNavigation,
  useNavigationPersistence,
} from "./navigation"
import { RootStore, RootStoreProvider, setupRootStore } from "./models"
import { ToggleStorybook } from "../storybook/toggle-storybook"
import { setJSExceptionHandler, getJSExceptionHandler, setNativeExceptionHandler } from 'react-native-exception-handler'

// This puts screens in a native ViewController or Activity. If you want fully native
// stack navigation, use `createNativeStackNavigator` in place of `createStackNavigator`:
// https://github.com/kmagiera/react-native-screens#using-native-stack-navigator
import { enableScreens } from "react-native-screens"
import { SDKContext, SDKProvider } from "./utils/bluetoothSdk"
import { props } from "ramda"
import { Alert, Dimensions, LogBox, PermissionsAndroid, Platform } from "react-native"
import Orientation from "react-native-orientation-locker"
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { AppProvider } from "./context/appContext"
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';

enableScreens()

export const NAVIGATION_PERSISTENCE_KEY = (Math.random() * Math.random() * 1540).toString()

/**
 * This is the root component of our app.
 */
function App(props) {
  setJSExceptionHandler((error, isFatal) => {
    if (isFatal) {
      Alert.alert('JSError: ' + error.name, error.message)
    }
    // This is your custom global error handler
    // You do stuff like show an error dialog
    // or hit google analytics to track crashes
    // or hit a custom api to inform the dev team.
  }, true)
  setNativeExceptionHandler(() => null,)
  const navigationRef = useRef<NavigationContainerRef>()
  const [rootStore, setRootStore] = useState<RootStore | undefined>(undefined)

  console.log = () => { }
  setRootNavigation(navigationRef)
  useBackButtonHandler(navigationRef, canExit)
  const { initialNavigationState, onNavigationStateChange } = useNavigationPersistence(
    storage,
    NAVIGATION_PERSISTENCE_KEY,
  )

  const getFcmToken = async () => {
    try {
      const fcmToken = await messaging().getToken();
      console.info("The new token ==>>", fcmToken);
    } catch (error) {
      console.info("Error", error);
    }
  };


  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log("Authorization status:", authStatus);
      getFcmToken();
    }
  };


  const requestPostNotificationPermission = async () => {
    if (Platform.OS === "android" && Number(Platform.Version) > 32) {
      try {
        PermissionsAndroid.check('android.permission.POST_NOTIFICATIONS').then(
          response => {
            if (!response) {
              PermissionsAndroid.request('android.permission.POST_NOTIFICATIONS', {
                title: 'Notification',
                message:
                  'Dialed Resistance App needs access to your notification ' +
                  'so you can get Updates',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
              })
            }
          }
        ).catch(
          err => {
            console.log("Notification Error=====>", err);
          }
        )
      } catch (err) {
        console.log(err);
      }
    }
  };

  const notificationListener = async () => {
    try {
      messaging().onNotificationOpenedApp((remoteMessage) => {
        console.log(
          "Notification caused app to open from background state:",
          remoteMessage.notification
        );
        // navigation.navigate(remoteMessage.data.type);
      });
      messaging().onMessage(async (remoteMessage) => {
        console.log("Received in Foreground", remoteMessage);
        PushNotification.createChannel({
          channelId: "channel-id", // (required)
          channelName: "My channel", // (required)
        });
        PushNotification.localNotification({
          channelId: "channel-id",
          title: remoteMessage.notification.title,
          message: remoteMessage.notification.body, // (required)
          showWhen: true,
          color: "red",
        });
      });
      messaging()
        .getInitialNotification()
        .then((remoteMessage) => {
          if (remoteMessage) {
            console.log(
              "Notification caused app to open from quit state:",
              remoteMessage.notification
            );
          }
        });
    } catch (error) {
      console.log("Error", error);
    }
  };


  useEffect(() => {
    requestPostNotificationPermission()
    requestUserPermission();
    notificationListener();
  }, [])





  // Kick off initial async loading actions, like loading fonts and RootStore
  useEffect(() => {
    (async () => {
      await initFonts() // expo
      setupRootStore().then(setRootStore)
      if (Dimensions.get("screen").width > 800) {
        Orientation.lockToLandscape()
      }

      // if(Dimensions.get("screen").width)
    })()
    // LogBox.ignoreAllLogs()
  }, [])
  // Before we show the app, we have to wait for our state to be ready.
  // In the meantime, don't render anything. This will be the background
  // color set in native by rootView's background color. You can replace
  // with your own loading component if you wish.
  if (!rootStore) return null

  // otherwise, we're ready to render the app
  return (
    <>
      <ToggleStorybook enabled={false}>
        <KeepAwake />
        <RootStoreProvider value={rootStore}>
          <SDKProvider>
            <AppProvider>
              <SafeAreaProvider initialMetrics={initialWindowMetrics}>
                <RootNavigator
                  ref={navigationRef}
                  initialState={initialNavigationState}
                  onStateChange={onNavigationStateChange}
                />
              </SafeAreaProvider>
            </AppProvider>
          </SDKProvider>
        </RootStoreProvider>
      </ToggleStorybook>
      <Toast />
    </>
  )
}
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

export default App
