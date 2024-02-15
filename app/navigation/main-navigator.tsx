/**
 * This is the navigator you will modify to display the logged-in screens of your app.
 * You can use RootNavigator to also display an auth flow or other user flows.
 *
 * You'll likely spend most of your time in this file.
 */
import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { WelcomeScreen, DemoScreen, Home, Settings, Calibration, DevelopmentTools, HeartRateConnection, Workout, Output } from "../screens"
import { View } from "react-native"
import { color } from "../theme"
import { ResistancePrompt } from "../screens/resistance-prompt/resistance-prompt-screen"
import { Splash } from "../screens/splash/splash"
import { WorkoutLength } from "../screens/workout-length/workout-length"
import { WorkoutFeedback } from "../screens/workout-feedback/workout-feedback"
import { WorkoutHistory } from "../screens/workout-history/workout-history"
import { Profile } from "../screens/profile/profile"
import { Feedback } from "../screens/Feedback/feedback"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */
export type PrimaryParamList = {
  welcome: undefined
  demo: undefined
}

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createStackNavigator<PrimaryParamList>()

export function MainNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardOverlay: () => (
            <View
              style={{
                flex: 1,
                backgroundColor: color.background,
              }}
          />)
      }}
      mode='card'
      initialRouteName="splash"
    >
      <Stack.Screen name="splash" component={Splash} />
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="settings" component={Settings} />
      <Stack.Screen name="calibration" component={Calibration} />
      <Stack.Screen name="devTools" component={DevelopmentTools} />
      <Stack.Screen name="workout" component={Workout} />
      <Stack.Screen name="output" component={Output} />
      <Stack.Screen name="prompt" component={ResistancePrompt} />
      <Stack.Screen name="workoutlength" component={WorkoutLength} />
      <Stack.Screen name="workoutfeedback" component={WorkoutFeedback} />
      <Stack.Screen name="workouthistory" component={WorkoutHistory} />
      <Stack.Screen name="profile" component={Profile} />
      <Stack.Screen name="feedback" component={Feedback} />

    </Stack.Navigator>
  )
}

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ["welcome"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
