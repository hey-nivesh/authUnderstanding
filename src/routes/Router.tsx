import { View, Text } from 'react-native'
import React, { use, useContext, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { AppwriteContext } from '../appwrite/AppWriteContext'
import Loading from '../components/Loading'
import AuthStack from './AuthStack'
import AppStack from './AppStack'

export const Router = () => {
    const [isLoading, setIsLoading] = React.useState<boolean>(true)
    const {appwrite, isloggedIn, setIsLoggedIn} = useContext(AppwriteContext);

    useEffect(() => {
      appwrite
      .getCurrentUser()
      .then(response => {
        setIsLoading(false)
        if(response){
            setIsLoggedIn(true)
        }
      })
      .catch(_ => {
        setIsLoading(false)
        setIsLoggedIn(false)
      })
    }, [appwrite, setIsLoggedIn])
    
  return (
    <NavigationContainer>
        {isloggedIn ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  )
}
