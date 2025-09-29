import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import BottomTabs from './bottomTabs'

const rootNavigator = () => {
  return (
    <NavigationContainer>
        <BottomTabs />
    </NavigationContainer>
  )
}

export default rootNavigator
