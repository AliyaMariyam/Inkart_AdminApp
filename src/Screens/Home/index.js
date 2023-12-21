import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect,useEffect,useState} from 'react';
import {Image, TouchableOpacity, View, Text} from 'react-native';
import colors from '../../Common/colors';
import styles from './styles';
import fireStore from '@react-native-firebase/firestore'

const Home = () => {

  const [orders,setOrders] = useState(0)
  const [users,setUsers] = useState(0)
  const [products,setProducts] = useState(0)

  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Home',
     
      headerTitleStyle: {
        fontFamily: 'Lato-Bold',
        fontSize: 24,
      },
      headerTintColor: colors.black,
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image
            source={require('../../assets/images/drawer.png')}
            style={styles.appIconImage}
          />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image
            source={require('../../assets/images/logo-small.jpeg')}
            style={styles.iconRight}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(()=>{
    getAllCount()
  },[])

  const getAllCount = async () =>{
    const productRef = await fireStore().collection('products').get()
    const userRef = await fireStore().collection('users').get()
    const ordersRef =await fireStore().collection('orders').get()

    setOrders(ordersRef.size)
    setProducts(productRef.size)
    setUsers(userRef.size)

  }

  return (
    <View style={{flex: 1, padding: 15}}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Orders')}
        style={[styles.box, {backgroundColor: colors.category1}]}>
        <Image
          source={require('../../assets/images/order.png')}
          style={styles.imageInBox}
        />
        <View style={{marginLeft: 15}}>
          <Text style={styles.text}>{orders}</Text>
          <Text style={styles.subText}>Orders</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Products')}
        style={[styles.box, {backgroundColor: colors.category2}]}>
        <Image
          source={require('../../assets/images/products.png')}
          style={styles.imageInBox}
        />
        <View style={{marginLeft: 15}}>
          <Text style={styles.text}>{products} </Text>
          <Text style={styles.subText}>Products</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Users')}
        style={[styles.box, {backgroundColor: colors.category3}]}>
        <Image
          source={require('../../assets/images/man.png')}
          style={styles.imageInBox}
        />
        <View style={{marginLeft: 15}}>
          <Text style={styles.text}>{users} </Text>
          <Text style={styles.subText}>Users</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
