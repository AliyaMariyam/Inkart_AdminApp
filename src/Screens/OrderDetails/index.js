import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import colors from '../../Common/colors';
import NavigationBack from '../../Common/NavigationBack';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useDimensionContext} from '../../Context';
import styles from './styles';
import CustomButton from '../../Components/CustomButton';
import CustomTextInput from '../../Components/CustomTextInput';
import Snackbar from 'react-native-snackbar';
import CustomDropDown from '../../Components/CustomDropDown';
import firestore from '@react-native-firebase/firestore';

const OrderDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const order = route.params.order;
  const [orderStatus, setOrderStatus] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (order) {
      setOrderStatus(order?.orderStatus);
    }
  }, [order]);

  const actionSheetRef = useRef(null);

  const dimensions = useDimensionContext();
  const responsiveStyle = styles(
    dimensions.windowWidth,
    dimensions.windowHeight,
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Order Details',
      headerLeft: () => <NavigationBack />,
    });
  }, [navigation]);

  const handleUpdateOrder = async () => {
    try {
      if (order.id && status !== '') {
        await firestore()
          .collection('orders')
          .doc(order.id)
          .update({
            orderStatus: status,
          })
          .then(() => {
            actionSheetRef.current?.hide();
            setOrderStatus(status);
            setTimeout(() => {
              Snackbar.show({
                text: 'Order status is updated',
                duration: Snackbar.LENGTH_LONG,
                backgroundColor: colors.primaryGreen,
                textColor: colors.white,
              });
            }, 1000);
          });
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const statusData = [
    {name: 'Ordered'},
    {name: 'Order InProgress'},
    {name: 'Order Picked'},
    {name: 'Order Shipped'},
    {name: 'Out for Delivery'},
    {name: 'Delivered'},
    {name: 'Returned'},
    {name: 'Failed'},
  ];

  return (
    <View>
      <ActionSheet ref={actionSheetRef}>
        <View style={{padding: 15}}>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
              borderBottomColor: colors.black_level_3,
              borderBottomWidth: StyleSheet.hairlineWidth,
              paddingBottom: 6,
            }}>
            <Text
              style={{
                color: colors.primaryGreen,
                fontFamily: 'Lato-Bold',
                fontSize: 16,
              }}>
              Update Order
            </Text>
            <TouchableOpacity
              onPress={() => actionSheetRef.current?.hide()}
              style={{alignSelf: 'flex-end'}}>
              <AntDesign name="closecircleo" color={colors.black} size={25} />
            </TouchableOpacity>
          </View>

          <View style={{marginVertical: 20}}>
            <CustomDropDown
              data={statusData}
              setData={text => setStatus(text)}
            />
            <CustomButton
              width={'100%'}
              text={'Update Order'}
              onPress={handleUpdateOrder}
            />
          </View>
        </View>
      </ActionSheet>

      <ScrollView
        style={responsiveStyle.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 150}}>
        {/* order section 1 */}
        <View style={responsiveStyle.greenBox}>
          <Image
            source={require('../../assets/images/parcel-white.png')}
            style={responsiveStyle.parcelImage}
          />

          <View style={responsiveStyle.greenTextBox}>
            <Text style={responsiveStyle.orderIdText}>
              OrderId : #{order?.orderId ?? 'UTYRDFG'}
            </Text>
            <Text style={responsiveStyle.orderStatusText}>
              {orderStatus ?? ''}
            </Text>
          </View>
        </View>

        {/* order details */}
        <View style={{marginVertical: 20}}>
          <Text style={responsiveStyle.orderDetailsText1}>Items:</Text>
          {order?.cartItems &&
            order.cartItems.map((ele, index) => {
              return (
                <View key={index} style={responsiveStyle.orderDetailsText2}>
                  <View style={responsiveStyle.orderDetailsText3}>
                    <Text style={responsiveStyle.quantityText}>
                      {ele.quantity}
                    </Text>
                  </View>
                  <FontAwesome5
                    name="star-of-life"
                    size={16}
                    color={colors.black}
                  />

                  <View style={responsiveStyle.orderDetailsView1}>
                    <Text style={responsiveStyle.nameText}>{ele.name}</Text>
                    <Text style={responsiveStyle.descriptionText}>
                      {ele.description}
                    </Text>
                  </View>

                  <View style={{width: '20%'}}>
                    <Text style={responsiveStyle.priceText}>₹ {ele.price}</Text>
                  </View>
                </View>
              );
            })}
        </View>

        {/* Payment Details */}
        <View style={{marginVertical: 15}}>
          <Text style={responsiveStyle.paymentDetailsText1}>
            Payment Details
          </Text>
          <View style={responsiveStyle.paymentDetailsView}>
            <View>
              <Text style={responsiveStyle.bagTotalText}>Bag Total</Text>
              <Text style={responsiveStyle.couponDiscountText}>
                Coupon Discount
              </Text>
              <Text style={responsiveStyle.deliveryText}>Delivery</Text>
            </View>

            <View style={{alignItems: 'flex-end'}}>
              <Text style={responsiveStyle.priceText}>₹ 130.00</Text>
              <Text style={responsiveStyle.applyCouponText}>Apply Coupon</Text>
              <Text style={responsiveStyle.priceText}>₹ 25.00</Text>
            </View>
          </View>

          <View style={responsiveStyle.paymentDetailsView1}>
            <Text style={responsiveStyle.totalAmountText}>Total Amount</Text>
            <Text style={responsiveStyle.totalAmountText}>
              ₹{order.totalAmount}
            </Text>
          </View>
        </View>

        {/* Address */}
        <View style={{marginVertical: 15}}>
          <Text style={responsiveStyle.addressTextHeading}>Address :</Text>
          <Text style={responsiveStyle.addressText}>Rick Nelon</Text>

          <Text style={responsiveStyle.addressText}>HKL Appartments,698</Text>

          <Text style={responsiveStyle.addressText}>NK.09.US,890876</Text>
        </View>

        {/* Payment Method */}
        <View style={{marginVertical: 15}}>
          <Text style={responsiveStyle.paymentMethodText1}>
            Payment Method :
          </Text>

          <View style={responsiveStyle.paymentMethodView}>
            <FontAwesome name="cc-visa" size={30} color={colors.black} />
            <View style={{marginLeft: 15}}>
              <Text style={responsiveStyle.cardNumber}>
                **** **** **** 7876
              </Text>
              <Text style={responsiveStyle.paymentMethodText2}>
                {order?.paymentMethod ?? ''}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={(StyleSheet.absoluteFillObject, {bottom: 90})}>
        <CustomButton
          onPress={() => actionSheetRef.current?.show()}
          text={'Update Status'}
          width={'90%'}
        />
      </View>
    </View>
  );
};

export default OrderDetails;
