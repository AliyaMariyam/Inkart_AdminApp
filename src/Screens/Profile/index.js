import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import colors from "../../Common/colors";


const Profile = () =>{

    const navigation = useNavigation()

    useLayoutEffect(() => {
        navigation.setOptions({
          title: 'Orders',
          headerTitleStyle: {
            fontFamily: 'Lato-Bold',
            fontSize: 24,
          },
          headerTintColor: colors.black,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={require('../../assets/images/left-arrow.png')}
                style={{
                  width: 35,
                  height: 35,
                  resizeMode: 'contain',
                  marginRight: 10,
                }}
              />
            </TouchableOpacity>
          ),
        });
      }, [navigation]);

    return(
      <View style={{marginVertical:55 }}>
      <Image
        source={require('../../assets/images/logo.jpeg')}
        style={{
          width: 130,
          height: 60,
          resizeMode: 'contain',
          alignSelf: 'center',
        }}
      />
      <Text
        style={{
          fontFamily: 'Lato-Regular',
          fontSize: 16,
          color: colors.black_level_3,
          textAlign: 'center',
        }}>
        All rights reserved
      </Text>
    </View>
    )
}

export default Profile