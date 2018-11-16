import React, { Component } from 'react'

import { createSwitchNavigator, createStackNavigator, createBottomTabNavigator } from 'react-navigation'

import HomeScreen from './screens/Home'
import AuthLoadingScreen from './screens/AuthLoadingScreen'
import SignInScreen from './screens/SignInScreen'

const AppStack = createStackNavigator({
  Home: HomeScreen,
})

const AuthStack = createStackNavigator({ SignIn: SignInScreen })

const MainNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
)

export default class App extends Component {
  render() {
    return <MainNavigator />
  }
}
