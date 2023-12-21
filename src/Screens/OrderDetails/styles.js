import {StyleSheet} from 'react-native';
import colors from '../../Common/colors';

const styles = (width, height) =>
  StyleSheet.create({
    container: {flex: 1},
    scrollView: {
      padding: width * 0.045,
    },
    greenBox: {
      backgroundColor: colors.primaryGreen,
      borderRadius: width * 0.045,
      padding: 20,
      justifyContent: 'flex-start',
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: width * 0.045,
    },
    greenTextBox: {
      marginLeft: width * 0.045,
    },
    parcelImage: {
      width: 40,
      height: 40,
      marginRight: 20,
    },
    orderIdText: {
      color: colors.white,
      fontFamily: 'Lato-Regular',
      fontSize: 16,
    },
    orderStatusText: {
      color: colors.white,
      fontFamily: 'Lato-Black',
      fontSize: 20,
    },
    orderDetailsText1: {
      color: colors.primaryGreen,
      fontFamily: 'Lato-Bold',
      fontSize: 20,
    },
    orderDetailsText2: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 5,
      justifyContent: 'space-between',
    },
    orderDetailsText3: {
      backgroundColor: colors.primaryGreen,
      paddingHorizontal: 18,
      paddingVertical: 15,
      borderRadius: 10,
      marginRight: 15,
    },
    quantityText: {
      color: colors.white,
      fontFamily: 'Lato-Bold',
      fontSize: 18,
    },
    orderDetailsView1: {
      width: '55%',
      overflow: 'hidden',
      marginLeft: 10,
    },
    nameText: {
      color: colors.black,
      fontFamily: 'Lato-Regular',
      fontSize: 18,
    },
    descriptionText: {
      color: colors.black_level_3,
      fontFamily: 'Lato-Regular',
      fontSize: 15,
    },
    priceText: {
      color: colors.black_level_3,
      fontFamily: 'Lato-Regular',
      fontSize: 15,
    },
    paymentDetailsText1: {
      color: colors.primaryGreen,
      fontFamily: 'Lato-Bold',
      fontSize: 20,
    },
    paymentDetailsView: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderTopColor: colors.black,
      borderBottomWidth: StyleSheet.hairlineWidth,
      paddingBottom: 15,
      marginVertical: 20,
    },
    bagTotalText: {
      color: colors.black,
      fontFamily: 'Lato-Regular',
      fontSize: 16,
      lineHeight: 25,
    },
    couponDiscountText: {
      color: colors.black,
      fontFamily: 'Lato-Regular',
      fontSize: 16,
      lineHeight: 25,
    },
    deliveryText: {
      color: colors.black,
      fontFamily: 'Lato-Regular',
      fontSize: 16,
      lineHeight: 25,
    },
    priceText: {
      color: colors.black,
      fontFamily: 'Lato-Regular',
      fontSize: 16,
      lineHeight: 25,
    },
    applyCouponText: {
      color: colors.red,
      fontFamily: 'Lato-Regular',
      fontSize: 16,
      lineHeight: 25,
    },
    paymentDetailsView1: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    totalAmountText: {
      color: colors.black,
      fontFamily: 'Lato-Bold',
      fontSize: 18,
    },
    addressTextHeading: {
      color: colors.primaryGreen,
      fontFamily: 'Lato-Bold',
      fontSize: 20,
    },
    addressText: {
      color: colors.black,
      fontFamily: 'Lato-Regular',
      fontSize: 16,
      lineHeight: 20,
    },
    paymentMethodText1:{
      color: colors.primaryGreen,
      fontFamily: 'Lato-Bold',
      fontSize: 20,
    },
    paymentMethodView:{
      marginVertical: 15,
      justifyContent: 'flex-start',
      alignItems: 'center',
      flexDirection: 'row',
    },
    cardNumber:{
      color: colors.black,
      fontFamily: 'Lato-Regular',
      fontSize: 16,
    },
    paymentMethodText2:{
      color: colors.black,
      fontFamily: 'Lato-Regular',
      fontSize: 16,
    },

  });

export default styles;
