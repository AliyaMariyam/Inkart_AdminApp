import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDimensionContext} from '../../Context';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {signout} from '../../store/action';
import colors from '../../Common/colors';

const CustomDrawer = () => {
  const dimensions = useDimensionContext();
  const responsiveStyle = styles(
    dimensions.windowWidth,
    dimensions.windowHeight,
  );

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(signout());
  };

  const contents = [
    {
      itemId: 0,
      itemName: 'Home',
      navigation: 'Footer',
      icon: require('../../assets/images/home.png'),
    },
    {
      itemId: 1,
      itemName: 'Products',
      navigation: 'Footer',
      icon: require('../../assets/images/product-logo.png'),
    },
    {
      itemId: 2,
      itemName: 'Categories',
      navigation: 'Footer',
      icon: require('../../assets/images/categories.png'),
    },
    {
      itemId: 3,
      itemName: 'Orders',
      navigation: 'Footer',
      icon: require('../../assets/images/orders.png'),
    },
    {
      itemId: 4,
      itemName: 'Reviews',
      navigation: 'Footer',
      icon: require('../../assets/images/review.png'),
    },
    {
      itemId: 5,
      itemName: 'Banners',
      navigation: 'Banner',
      icon: require('../../assets/images/banner.png'),
    },
    {
      itemId: 6,
      itemName: 'Offers',
      navigation: 'Offers',
      icon: require('../../assets/images/offers.png'),
    },
    {
      itemId: 7,
      itemName: 'Logout',
      onPress: handleSignOut,
      icon: require('../../assets/images/logout.png'),
    },
  ];

  const handleTouch = itemData => {
    if (itemData.navigation) {
      navigation.navigate(itemData.navigation);
    } else {
      itemData.onPress();
    }
  };

  return (
    <ScrollView style={{flex: 1}}>
      <View
        style={{
          padding: 10,
          //marginTop: 20,
          borderBottomWidth: StyleSheet.hairlineWidth,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            width: 75,
            height: 75,
            borderRadius: 74 / 2,
            backgroundColor: colors.primaryGreen,
            // marginRight: 10,
          }}
        />

        <View style={{padding: 25}}>
          <Text
            style={{
              fontFamily: 'Lato-Black',
              fontSize: 18,
              color: colors.black,
            }}>
            Admin
          </Text>
          <Text
            style={{
              fontFamily: 'Lato-Regular',
              fontSize: 18,
              color: colors.black,
            }}>
            admin@yopmail.com
          </Text>
        </View>
      </View>
      <View style={{marginTop: 6}}>
        {contents.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => handleTouch(item)}
              key={String(item.itemId)}
              style={{
                padding: 10,
                marginVertical: 4,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Image
                  source={item.icon}
                  style={{
                    width: 25,
                    height: 25,
                    resizeMode: 'contain',
                    marginRight: 10,
                  }}
                />
                <Text
                  style={{
                    fontFamily: 'Lato-Regular',
                    fontSize: 18,
                    color: colors.black,
                  }}>
                  {item.itemName}
                </Text>
              </View>
              <Image
                source={require('../../assets/images/arrow-right.png')}
                style={{
                  width: 18,
                  height: 18,
                  resizeMode: 'contain',
                  marginRight: 10,
                }}
              />
            </TouchableOpacity>
          );
        })}
      </View>

      <View >
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

    </ScrollView>
  );
};

export default CustomDrawer;
