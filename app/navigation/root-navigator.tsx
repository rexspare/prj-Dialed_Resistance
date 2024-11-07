/**
 * The root navigator is used to switch between major navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow (which is contained in your MainNavigator) which the user
 * will use once logged in.
 */
import React, { useContext } from "react"
import { NavigationContainer, NavigationContainerRef } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { MainNavigator } from "./main-navigator"
import { Subscribe } from "../screens/subscribe/subscribe-screen"
import { Feedback } from "../screens/Feedback/feedback"
import { AppContext } from "../context/appContext"
import { Splash } from "../screens/splash/splash"
import { OnBoarding } from "../screens/onboarding/onboarding-screen"
import { UserType } from "../screens/user-type/user-type-screen"
import { AccessCode } from "../screens/access-code/access-code-screen"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * We recommend using MobX-State-Tree store(s) to handle state rather than navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */
export type RootParamList = {
  splash: undefined
  app: undefined
  mainStack: undefined
  Subscribe: any
  feedback: undefined
  Onboarding: undefined
  UserType: undefined
  AccessCode: undefined
}

const Stack = createStackNavigator<RootParamList>()

const RootStack = () => {
  const { isSubscribed } = useContext(AppContext)

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="splash"
    >
      <Stack.Screen name="splash" component={Splash} />
      <Stack.Screen name="app" component={AppStack} />
    </Stack.Navigator>
  )
}

const AppStack = () => {
  const { isSubscribed } = useContext(AppContext)


  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {
        isSubscribed == false ?
          <>
            <Stack.Screen
              name="UserType"
              component={UserType}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="AccessCode"
              component={AccessCode}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Onboarding"
              component={OnBoarding}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Subscribe"
              component={Subscribe}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen name="feedback" component={Feedback} />
          </>
          :
          <Stack.Screen
            name="mainStack"
            component={MainNavigator}
            options={{
              headerShown: false,
            }}
          />
      }
    </Stack.Navigator>
  )
}

export const RootNavigator = React.forwardRef<
  NavigationContainerRef,
  Partial<React.ComponentProps<typeof NavigationContainer>>
>((props, ref) => {
  return (
    <NavigationContainer {...props} ref={ref}>
      <RootStack />
    </NavigationContainer>
  )
})

RootNavigator.displayName = "RootNavigator"
