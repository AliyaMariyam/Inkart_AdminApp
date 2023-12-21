import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import colors from '../../Common/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';

const CustomTabBar = () => {
  const navigation = useNavigation();
  const activeSize = 36;
  const activeFamily = 'Lato-Bold';
  const [active, setActive] = useState('Home');

  const handleNavigation = name  =>{
    setActive(name)
    navigation.navigate(name)
  }

  return (
    <View
      style={{
        height: 75,
        backgroundColor: colors.primaryGreen,
        padding: 15,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        overflow: 'hidden',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
      }}>
      <TouchableOpacity onPress={()=>handleNavigation('Home')}>
        <AntDesign
          name="home"
          size={active === 'Home' ? activeSize : 30}
          color={colors.white}
          style={{alignSelf: 'center', marginBottom: 4}}
        />
        <Text
          style={{
            fontSize: 16,
            color: colors.white,
            fontFamily: active === 'Home' ? activeFamily : 'Lato-Regular',
          }}>
          Home
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>handleNavigation('Products')}>
        <AntDesign
          name="inbox"
          size={active === 'Products' ? activeSize : 30}
          color={colors.white}
          style={{alignSelf: 'center', marginBottom: 4}}
        />
        <Text
          style={{
            fontSize: 16,
            color: colors.white,
            fontFamily: active === 'Products' ? activeFamily : 'Lato-Regular',
          }}>
          Products
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>handleNavigation('Orders')}>
        <AntDesign
          name="database"
          size={active === 'Orders' ? activeSize : 30}
          color={colors.white}
          style={{alignSelf: 'center', marginBottom: 4}}
        />
        <Text
          style={{
            fontSize: 16,
            color: colors.white,
            fontFamily: active === 'Orders' ? activeFamily : 'Lato-Regular',
          }}>
          Orders
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>handleNavigation('Profile')}>
        <AntDesign
          name="user"
          size={active === 'Profile' ? activeSize : 30}
          color={colors.white}
          style={{alignSelf: 'center', marginBottom: 4}}
        />
        <Text
          style={{
            fontSize: 16,
            color: colors.white,
            fontFamily: active === 'Profile' ? activeFamily : 'Lato-Regular',
          }}>
          Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomTabBar;
