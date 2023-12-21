import React from 'react'
import { Image, View } from 'react-native'

 const  Splash = () => {
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
       <Image
          source={require('../../assets/images/splash.jpg')}
          
        />
    </View>
  )
}

export default Splash
