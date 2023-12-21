import React, {useCallback, useLayoutEffect, useState} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Text,
  StyleSheet,
} from 'react-native';
import colors from '../../Common/colors';
import NavigationBack from '../../Common/NavigationBack';
import fireStore from '@react-native-firebase/firestore';
import Snackbar from 'react-native-snackbar';
import CustomTextInput from '../../Components/CustomTextInput';
import EmptyData from '../../Common/EmptyData';

const Users = () => {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Users',
      headerStyle: {
        backgroundColor: colors.white,
        height: 70,
      },
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
      getUsers();
    }, []),
  );

  const getUsers = async () => {
    await fireStore()
      .collection('users')
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          Snackbar.show({
            text: 'No users',
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
          setUsers(objArray);
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
      .collection('users')
      .orderBy('username')
      .startAt(text)
      .endAt(text + '\uf8ff')
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          setUsers([]);
        } else {
          const objArray = [];
          snapshot?.docs.forEach(document => {
            const result = {id: document.id, ...document?.data()};
            objArray.push(result);
          });
          setUsers(objArray);
        }
      });
  };

  const BlockUser = ({data}) => {
    return (
      <TouchableOpacity
        onPress={() => handleBlockUser(data)}
        style={{
          position: 'absolute',
          top: 15,
          right: 15,
          padding: 4,
          borderRadius: 8,
          borderColor: data?.active === 0 ? colors.red : colors.primaryGreen,
          borderWidth: 1,
        }}>
        <Text
          style={{
            fontFamily: 'Lato-Bold',
            fontSize: 16,
            color: data?.active === 0 ? colors.red : colors.primaryGreen,
          }}>
          {data?.active === 1 ? 'Block' : 'UnBlock'}
        </Text>
      </TouchableOpacity>
    );
  };

  const handleBlockUser = async (data) => {
    await fireStore()
      .collection('users')
      .doc(data.id)
      .update({
        active: data?.active == 1 ? 0 : 1,
      })
      .then(() => {
        const updated_users = users.map(obj => {
          if(obj.id === data?.id){
            obj.active = data?.active === 1 ? 0 : 1;
          } 
          return obj
        });
        setUsers(updated_users);
      });
  };

  return (
    <FlatList
      data={users}
      extraData={users}
      style={{flex: 1, padding: 15}}
      contentContainerStyle={{paddingBottom: 100}}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={() => <Header />}
      ListEmptyComponent={() => <EmptyData />}
      renderItem={({item, index}) => {
        return (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginVertical: 8,
              borderRadius: 15,
              width: '95%',
              backgroundColor: colors.lightGrey,
              alignSelf: 'center',
              padding: 10,
            }}>
            <Image
              source={
                item?.profileImage
                  ? {uri: item?.profileImage}
                  : require('../../assets/images/user.png')
              }
              style={{
                width: 80,
                height: 80,
                resizeMode: 'contain',
                borderRadius: 40,
                overflow: 'hidden',
              }}
            />
            <View style={{marginLeft: 10}}>
              <Text
                style={{
                  fontFamily: 'Lato-Bold',
                  fontSize: 20,
                  color: colors.black,
                  lineHeight: 35,
                }}>
                {item?.username}
              </Text>
              <Text
                style={{
                  fontFamily: 'Lato-Regular',
                  fontSize: 16,
                  color: colors.category4,
                }}>
                {item?.email}
              </Text>
              <Text
                style={{
                  fontFamily: 'Lato-Regular',
                  fontSize: 16,
                  color: colors.black_level_3,
                }}>
                {item?.mobilenumber}
              </Text>
            </View>

            <BlockUser data={item}  />
          </View>
        );
      }}
    />
  );
};

export default Users;
