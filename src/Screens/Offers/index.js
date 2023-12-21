import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {
  useLayoutEffect,
  useEffect,
  useCallback,
  useState,
  useRef,
} from 'react';
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../../Common/colors';
import fireStore from '@react-native-firebase/firestore';
import Snackbar from 'react-native-snackbar';
import {useDimensionContext} from '../../Context';
import styles from './styles';
import NavigationBack from '../../Common/NavigationBack';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import ActionSheet from 'react-native-actions-sheet';
import CustomTextInput from '../../Components/CustomTextInput';
import CustomButton from '../../Components/CustomButton';
import Clipboard from '@react-native-clipboard/clipboard';

const Offers = () => {
  const [offers, setOffers] = useState('');
  const [offerCode, setOfferCode] = useState('');
  const [offer, setOffer] = useState('');
  const [head, setHead] = useState('');
  const [subHead, setSubHead] = useState('');
  const [type, setType] = useState(null);
  const [selected, setSelected] = useState(null);

  const actionSheetRef = useRef(null);
  const actionSheetRefChooseOptions = useRef(null);

  const dimensions = useDimensionContext();
  const responsiveStyle = styles(
    dimensions.windowWidth,
    dimensions.windowHeight,
  );

  const navigation = useNavigation();
  useFocusEffect(
    useCallback(() => {
      getOffers();
    }),
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Offers',
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
        onPress={() => {
          setType('add');
          actionSheetRef.current?.show();
        }}>
        <AntDesign
          name="plussquareo"
          color={colors.black}
          size={30}
          style={{marginRight: 4}}
        />
      </TouchableOpacity>
    );
  };

  const getOffers = async () => {
    await fireStore()
      .collection('offers')
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          Snackbar.show({
            text: 'No Offers Found',
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: colors.red,
            textColor: colors.white,
          });
        } else {
          const objArray = [];
          snapshot?.docs.forEach(document => {
            console.log(document);
            const result = {id: document.id, ...document?.data()};
            objArray.push(result);
          });
          setOffers(objArray);
        }
      });
  };

  const handleEdit = () => {
    actionSheetRefChooseOptions.current?.hide();
    setTimeout(() => {
      setHead(selected.head);
      setSubHead(selected.subHead);
      setOffer(selected.offer);
      setOfferCode(selected.offerCode);
      setType('edit');
      actionSheetRef.current?.show();
    }, );
  };

  const handleDelete = async () => {
    actionSheetRefChooseOptions.current?.hide();
    Alert.alert('Confirm Offer Deletion', 'Do yo want to delete this Offer,', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Delete Offer',
        onPress: async () => {
          await fireStore()
            .collection('offers')
            .doc(selected.id)
            .delete()
            .then(() => {
              Snackbar.show({
                text: 'Banner Deleted Successfully',
                duration: Snackbar.LENGTH_LONG,
                backgroundColor: colors.primaryGreen,
                textColor: colors.white,
              });
            });
          setSelected(null);
          getOffers();
        },
      },
    ]);
  };

  const handleCopy = () => {
    actionSheetRefChooseOptions.current?.hide();
    setTimeout(() => {
      Clipboard.setString(selected.offerCode);
    }, 1000);
  };

  const handleAdd = async () => {};

  const handleUpdateOffer = async () => {};

  return (
    <View style={{padding: 15}}>
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
              {type === 'add' ? 'Add Offers' : 'Update Offer'}
            </Text>
            <TouchableOpacity
              onPress={() => {
                actionSheetRef.current?.hide();
                setType(null);
                setSelected(null);
                setHead('');
                setSubHead('');
                setOffer('');
                setOfferCode('');
              }}
              style={{alignSelf: 'flex-end'}}>
              <AntDesign name="closecircleo" color={colors.black} size={25} />
            </TouchableOpacity>
          </View>

          <View style={{marginVertical: 20}}>
            <CustomTextInput
              placeholder={'Heading'}
              width={'100%'}
              value={head}
              border={true}
              onChangeText={text => setHead(text)}
            />

            <CustomTextInput
              placeholder={'Description'}
              width={'100%'}
              value={subHead}
              border={true}
              onChangeText={text => setSubHead(text)}
            />

            <CustomTextInput
              placeholder={'Offer Percentage'}
              width={'100%'}
              value={offer}
              border={true}
              onChangeText={text => setOffer(text)}
            />

            <CustomTextInput
              placeholder={'Offer Code'}
              width={'100%'}
              value={offerCode}
              border={true}
              onChangeText={text => offerCode(text)}
            />

            <CustomButton
              width={'100%'}
              text={type === 'add' ? 'Add Offers' : 'Update Offer'}
              onPress={type === 'add' ? handleAdd : handleUpdateOffer}
            />
          </View>
        </View>
      </ActionSheet>

      <ActionSheet ref={actionSheetRefChooseOptions}>
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
              Choose Action
            </Text>
            <TouchableOpacity
              onPress={() => actionSheetRefChooseOptions.current?.hide()}
              style={{alignSelf: 'flex-end'}}>
              <AntDesign name="closecircleo" color={colors.black} size={25} />
            </TouchableOpacity>
          </View>

          <View
            style={{
              margin: 40,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{alignContent:'center',alignItems:'center'}}>
              <Feather
                onPress={handleEdit}
                name="edit"
                color={colors.black}
                size={40}
              />
              <Text
                style={{
                  color: colors.primaryGreen,
                  fontFamily: 'Lato-Bold',
                  fontSize: 16,
                  lineHeight:30
                }}>
                Edit
              </Text>
            </View>

            <View style={{alignContent:'center',alignItems:'center'}}>
              <AntDesign
                onPress={handleCopy}
                name="copy1"
                color={colors.black}
                size={40}
              />
              <Text
                style={{
                  color: colors.primaryGreen,
                  fontFamily: 'Lato-Bold',
                  fontSize: 16,
                  lineHeight:30
                }}>
                Copy
              </Text>
            </View>

            <View style={{alignContent:'center',alignItems:'center'}}>
              <AntDesign
                onPress={handleDelete}
                name="delete"
                color={colors.black}
                size={40}
              />
              <Text
                style={{
                  color: colors.primaryGreen,
                  fontFamily: 'Lato-Bold',
                  fontSize: 16,
                  lineHeight:30
                }}>
               Delete
              </Text>
            </View>
          </View>
        </View>
      </ActionSheet>

      <FlatList
        data={offers}
        extraData={offers}
        contentContainerStyle={responsiveStyle.content}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setSelected(item);
                actionSheetRefChooseOptions.current?.show();
              }}
              style={responsiveStyle.renderView}>
              {/* start design */}
              <View style={responsiveStyle.offCircleView}>
                <View style={responsiveStyle.circleRight}></View>
                <View style={responsiveStyle.circleRight}></View>
                <View style={responsiveStyle.circleRight}></View>
                <View style={responsiveStyle.circleRight}></View>
              </View>

              <View
                style={{
                  width: '64%',
                  height: 100,
                  backgroundColor: colors.secondaryGreen,
                  padding: 20,
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    style={{
                      fontFamily: 'Lato-Bold',
                      color: colors.primaryGreen,
                      fontSize: 50,
                    }}>
                    {item.offer}
                  </Text>
                  <View>
                    <Text
                      style={{
                        fontFamily: 'Lato-Regular',
                        color: colors.primaryGreen,
                        fontSize: 16,
                      }}>
                      %
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Lato-Regular',
                        color: colors.primaryGreen,
                        fontSize: 16,
                      }}>
                      OFF
                    </Text>
                  </View>
                  <View style={{marginLeft: 10}}>
                    <Text
                      style={{
                        fontFamily: 'Lato-Bold',
                        color: colors.black,
                        fontSize: 18,
                      }}>
                      {item.head}
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Lato-Regular',
                        color: colors.black_level_3,
                        fontSize: 12,
                      }}>
                      {item.subHead}
                    </Text>
                  </View>
                </View>
              </View>

              <View
                style={{
                  justifyContent: 'space-between',
                  height: 100,
                  backgroundColor: colors.secondaryGreen,
                }}>
                <View style={responsiveStyle.circleCenter}></View>
                <View
                  style={[
                    responsiveStyle.circleCenter,
                    {marginBottom: -25 / 2},
                  ]}></View>
              </View>

              <View
                style={{
                  width: '25%',
                  height: 100,
                  backgroundColor: colors.secondaryGreen,
                  paddingRight: 15,
                  paddingVertical: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: 'Lato-Regular',
                    color: colors.black_level_3,
                    fontSize: 14,
                  }}>
                  Use Code
                </Text>
                <View
                  style={{
                    marginVertical: 10,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    justifyContent: 'center',
                    borderRadius: 15,
                    backgroundColor: colors.primaryGreen,
                    overflow: 'hidden',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Lato-Regular',
                      color: colors.white,
                      textAlign: 'center',
                    }}>
                    {item.offerCode}
                  </Text>
                </View>
              </View>

              {/* end Design */}
              <View style={{marginLeft: -25 / 2}}>
                <View style={responsiveStyle.circleRight}></View>
                <View style={responsiveStyle.circleRight}></View>
                <View style={responsiveStyle.circleRight}></View>
                <View style={responsiveStyle.circleRight}></View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default Offers;
