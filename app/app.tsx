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
import { Alert, Dimensions, LogBox } from "react-native"
import Orientation from "react-native-orientation-locker"
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

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

  setRootNavigation(navigationRef)
  useBackButtonHandler(navigationRef, canExit)
  const { initialNavigationState, onNavigationStateChange } = useNavigationPersistence(
    storage,
    NAVIGATION_PERSISTENCE_KEY,
  )

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
            <SafeAreaProvider initialMetrics={initialWindowMetrics}>
              <RootNavigator
                ref={navigationRef}
                initialState={initialNavigationState}
                onStateChange={onNavigationStateChange}
              />
            </SafeAreaProvider>
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
