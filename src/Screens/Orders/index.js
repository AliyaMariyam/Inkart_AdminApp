import React, {useCallback, useLayoutEffect, useState} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {FlatList, View, Image, TouchableOpacity, Text} from 'react-native';
import fireStore from '@react-native-firebase/firestore';
import colors from '../../Common/colors';
import Snackbar from 'react-native-snackbar';
import EmptyData from '../../Common/EmptyData';
import CustomTextInput from '../../Components/CustomTextInput';
import moment from 'moment';
import NavigationBack from '../../Common/NavigationBack';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Orders',
      headerTitleStyle: {
        fontFamily: 'Lato-Bold',
        fontSize: 24,
      },
      headerTintColor: colors.black,
      headerLeft: () => <NavigationBack />,
    });
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      getProducts();
    }, []),
  );

  const getProducts = async () => {
    await fireStore()
      .collection('orders')
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          Snackbar.show({
            text: 'No Products Found',
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: colors.red,
            textColor: colors.white,
          });
        } else {
          const objArray = [];
          snapshot?.docs.forEach(document => {
            const result = {id: document.id, ...document?.data()};
            objArray.push(result);
          });
          setOrders(objArray);
        }
      });
  };

  const Header = () => {
    return (
      <CustomTextInput
        width={'95%'}
        border={true}
        value={searchText}
        placeholder={'Search Here'}
        onChangeText={text => handleSearch(text)}
        icon={
          <Image
            source={require('../../assets/images/search.png')}
            style={{width: 25, height: 25, resizeMode: 'contain'}}
          />
        }
      />
    );
  };

  const handleSearch = async text => {
    setSearchText(text);
    await fireStore()
      .collection('orders')
      .orderBy('username')
      .startAt(text)
      .endAt(text + '\uf8ff')
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          setOrders([]);
        } else {
          const objArray = [];
          snapshot?.docs.forEach(document => {
            const result = {id: document.id, ...document?.data()};
            objArray.push(result);
          });
          setOrders(objArray);
        }
      });
  };

  const dateFormat = time => {
    return moment(new Date(time)).format('DD/MM/YYYY HH:mm');
  };

  return (
    <FlatList
      data={orders}
      extraData={orders}
      style={{flex: 1, padding: 15}}
      contentContainerStyle={{paddingBottom: 100}}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={() => <Header />}
      ListEmptyComponent={() => <EmptyData />}
      renderItem={({item, index}) => {
        return (
          <TouchableOpacity
            onPress={() => navigation.navigate('OrderDetails', {order: item})}
            style={{
              marginVertical: 8,
              borderRadius: 15,
              width: '95%',
              backgroundColor: colors.lightBg,
              alignSelf: 'center',
              padding: 10,
            }}>
            <Text
              style={{
                fontFamily: 'Lato-rEGULAR',
                fontSize: 18,
                color: colors.black,
                lineHeight: 25,
              }}>
              ID: #{item?.orderId}
            </Text>

            <Text
              style={{
                fontFamily: 'Lato-rEGULAR',
                fontSize: 15,
                color: colors.pg,
                //lineHeight: 35,
              }}>
              Ordered On: {dateFormat(item?.created)}
            </Text>

            <Text
              style={{
                fontFamily: 'Lato-Regular',
                fontSize: 14,
                color: colors.black_level_3,
                lineHeight:45
              }}>
              Paid:
              <Text
                style={{
                  fontFamily: 'Lato-Regular',
                  color: colors.primaryGreen,
                }}>
                {item?.totalAmount} 
              </Text>
                {'\t'}Items:
              <Text
                style={{
                  fontFamily: 'Lato-Regular',
                  color: colors.primaryGreen,
                }}>
                {item?.cartItems?.length}
              </Text>
            </Text>

            
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default Orders;
