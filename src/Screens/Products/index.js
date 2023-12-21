import React, {useCallback, useLayoutEffect, useState} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {
  FlatList,
  View,
  Image,
  TouchableOpacity,
  Text,
  Dimensions,
  Alert,
} from 'react-native';
import fireStore from '@react-native-firebase/firestore';
import colors from '../../Common/colors';
import Snackbar from 'react-native-snackbar';
import EmptyData from '../../Common/EmptyData';
import CustomTextInput from '../../Components/CustomTextInput';
import NavigationBack from '../../Common/NavigationBack';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();

  const {width, height} = Dimensions.get('screen');

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Products',
      headerTitleStyle: {
        fontFamily: 'Lato-Bold',
        fontSize: 24,
      },
      headerTintColor: colors.black,
      headerLeft: () => <NavigationBack />,
      headerRight: () => <RightComponent />,
    });
  }, [navigation]);

  const RightComponent = () => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('CreateProduct', {type: 'create'})}>
        <AntDesign
          name="plussquareo"
          color={colors.black}
          size={30}
          style={{marginRight: 4}}
        />
      </TouchableOpacity>
    );
  };

  useFocusEffect(
    useCallback(() => {
      getProducts();
    }, []),
  );

  const getProducts = async () => {
    await fireStore()
      .collection('products')
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
          setProducts(objArray);
        }
      });
  };

  const Header = () => {
    return (
      <CustomTextInput
        width={'100%'}
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
      .collection('products')
      .orderBy('username')
      .startAt(text)
      .endAt(text + '\uf8ff')
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          setProducts([]);
        } else {
          const objArray = [];
          snapshot?.docs.forEach(document => {
            const result = {id: document.id, ...document?.data()};
            objArray.push(result);
          });
          setProducts(objArray);
        }
      });
  };

  const handleDelete = async productData => {
    Alert.alert('Confirm Product Deletion', 'Do yo want to delete this product,deleting the product will lose the product data', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: async () => {
          await fireStore()
            .collection('products')
            .doc(productData.id)
            .delete()
            .then(() => {
              Snackbar.show({
                text: 'Product Deleted Successfully',
                duration: Snackbar.LENGTH_LONG,
                backgroundColor: colors.primaryGreen,
                textColor: colors.white,
              });
            });
          getProducts();
        },
      },
    ]);
  };

  const handleEdit = productData => {
    navigation.navigate('CreateProduct', {type: 'edit', data: productData});
  };

  return (
    <FlatList
      data={products}
      extraData={products}
      style={{flex: 1, padding: 15, backgroundColor: colors.lightGrey}}
      contentContainerStyle={{paddingBottom: 100}}
      showsVerticalScrollIndicator={false}
      numColumns={2}
      ListHeaderComponent={() => <Header />}
      ListEmptyComponent={() => <EmptyData />}
      renderItem={({item, index}) => {
        return (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ProductDetails', {product: item})
            }
            style={{
              marginVertical: 8,
              borderRadius: 15,
              width: '48%',
              height: height * 0.35,
              backgroundColor: colors.white,
              borderColor: colors.primaryGreen,
              alignSelf: 'center',
              justifyContent: 'center',
              borderWidth: 1,
              marginLeft: index % 2 === 1 ? 15 : 0,
              overflow: 'hidden',
            }}>
            <View
              style={{
                position: 'absolute',
                top: 10,
                right: 5,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Feather
                name="edit"
                color={colors.black_level_2}
                size={25}
                onPress={() => handleEdit(item)}
              />

              <AntDesign
                name="delete"
                color={colors.black_level_2}
                size={25}
                style={{marginLeft: 10}}
                onPress={() => handleDelete(item)}
              />
            </View>

            <View
              style={{
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                width: '95%',
                height: height * 0.15,
                marginVertical: 15,
                marginTop: 30,
              }}>
              <Image
                source={
                  item?.image
                    ? {uri: item?.image}
                    : require('../../assets/images/user.png')
                }
                style={{
                  width: 80,
                  height: 80,
                  resizeMode: 'contain',
                  overflow: 'hidden',
                }}
              />
            </View>

            <View style={{marginLeft: 10, overflow: 'hidden', width: '75%'}}>
              <Text
                numberOfLines={2}
                style={{
                  fontFamily: 'Lato-Bold',
                  fontSize: 20,
                  color: colors.primaryGreen,
                  lineHeight: 20,
                }}>
                {item?.name}
              </Text>
              <Text
                style={{
                  fontFamily: 'Lato-Regular',
                  fontSize: 16,
                  color: colors.black,
                }}>
                {item?.description}
              </Text>
              <Text
                style={{
                  fontFamily: 'Lato-Bold',
                  fontSize: 18,
                  color: colors.black_level_3,
                  lineHeight: 35,
                }}>
                ₹ {item?.price}
              </Text>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default Products;
