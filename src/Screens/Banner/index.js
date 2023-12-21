import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useCallback, useLayoutEffect, useRef, useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import NavigationBack from '../../Common/NavigationBack';
import fireStore from '@react-native-firebase/firestore';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../../Common/colors';
import Snackbar from 'react-native-snackbar';
import {Dimensions} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import CustomButton from '../../Components/CustomButton';
import CustomTextInput from '../../Components/CustomTextInput';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import uploadImage from '../../Common/Storage';

const Banner = () => {
  const navigation = useNavigation();
  const [banners, setBanners] = useState();
  const [head, setHead] = useState();
  const [description, setDescription] = useState();
  const [uploadUri, setUploadUri] = useState();
  const [bannerId, setBannerId] = useState(null);
  const [type, setType] = useState(null);

  const {width, height} = Dimensions.get('screen');
  const actionSheetRef = useRef(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Banners',
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

  useFocusEffect(
    useCallback(() => {
      getBanners();
    }, []),
  );

  const handleDelete = async bannerData => {
    Alert.alert(
      'Confirm Product Deletion',
      'Do yo want to delete this banner,deleting the banner will lose the banner data displayed on user Dashboard.',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Delete Banner',
          onPress: async () => {
            await fireStore()
              .collection('banner')
              .doc(bannerData.id)
              .delete()
              .then(() => {
                Snackbar.show({
                  text: 'Banner Deleted Successfully',
                  duration: Snackbar.LENGTH_LONG,
                  backgroundColor: colors.primaryGreen,
                  textColor: colors.white,
                });
              });
            getBanners();
          },
        },
      ],
    );
  };

  const handleEdit = bannerData => {
    setBannerId(bannerData.id);
    setHead(bannerData.head);
    setDescription(bannerData.description);
    setUploadUri(bannerData.image);
    setType('update');
    actionSheetRef.current?.show();
  };

  const handleUpdateBanner = async () => {
    if (bannerId && uploadUri && head !== '' && description !== '') {
      const responseUri = uploadUri.includes('file://')
        ? await uploadImage(uploadUri)
        : uploadUri;

      const banner = {
        head: head,
        description: description,
        image: responseUri,
      };

      await fireStore()
        .collection('banner')
        .doc(bannerId)
        .update(banner)
        .then(() => {
          Snackbar.show({
            text: 'Banner Updated Successfully',
            duration: Snackbar.LENGTH_SHORT,
            textColor: colors.white,
            backgroundColor: colors.primaryGreen,
          });
          actionSheetRef.current?.hide();
          setHead('');
          setDescription('');
          setUploadUri(null);
          getBanners();
        });
    } else {
      Snackbar.show({
        text: 'Fill Up All the fields to continue',
        duration: Snackbar.LENGTH_SHORT,
        textColor: colors.white,
        backgroundColor: colors.red,
      });
    }
  };

  const getBanners = async () => {
    await fireStore()
      .collection('banner')
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          Snackbar.show({
            text: 'No Banners Found',
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
          setBanners(objArray);
        }
      });
  };

  const handleCreateBanner = async () => {
    if (uploadUri && head !== '' && description !== '') {
      const responseUri = uploadUri.includes('file://')
        ? await uploadImage(uploadUri)
        : uploadUri;

      const banner = {
        head: head,
        description: description,
        image: responseUri,
      };

      await fireStore()
        .collection('banner')
        .add(banner)
        .then(() => {
          Snackbar.show({
            text: 'Banner Added Successfully',
            duration: Snackbar.LENGTH_SHORT,
            textColor: colors.white,
            backgroundColor: colors.primaryGreen,
          });
          actionSheetRef.current?.hide();
          setHead('');
          setDescription('');
          setUploadUri(null);
          getBanners();
        });
    } else {
      Snackbar.show({
        text: 'Fill Up All the fields to continue',
        duration: Snackbar.LENGTH_SHORT,
        textColor: colors.white,
        backgroundColor: colors.red,
      });
    }
  };

  const handleCamera = async () => {
    const options = {
      mediaType: 'photo',
    };
    await launchCamera(options, response => {
      if (response && response.assets) {
        setUploadUri(response?.assets[0]?.uri);
      }
    });
  };

  const handleGalley = async () => {
    const options = {
      mediaType: 'photo',
    };
    await launchImageLibrary(options, response => {
      if (response && response.assets) {
        setUploadUri(response?.assets[0]?.uri);
      }
    });
  };

  return (
    <View style={{flex: 1}}>
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
              {type == 'add' ? 'Create Banner' : 'Update Banner'}
            </Text>
            <TouchableOpacity
              onPress={() => actionSheetRef.current?.hide()}
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
              value={description}
              multiline={true}
              border={true}
              onChangeText={text => setDescription(text)}
            />

            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                padding: 15,
                marginVertical: 10,
                borderColor: colors.primaryGreen,
                borderWidth: 1,
                borderRadius: 8,
              }}>
              <Text
                style={{
                  color: colors.black_level_2,
                  fontSize: 16,
                  fontFamily: 'Lato-Regular',
                  lineHeight: 55,
                }}>
                Upload Image
              </Text>
              {uploadUri ? (
                <View>
                  <TouchableOpacity
                    onPress={() => setUploadUri(null)}
                    style={{
                      position: 'absolute',
                      zIndex: 9,
                      right: 0,
                      top: -10,
                      backgroundColor: colors.white_level_3,
                      overflow: 'hidden',
                      borderRadius: 25,
                    }}>
                    <AntDesign
                      name="closecircleo"
                      color={colors.black}
                      size={25}
                    />
                  </TouchableOpacity>

                  <Image
                    source={{uri: uploadUri}}
                    style={{width: 100, height: 100, resizeMode: 'contain'}}
                  />
                </View>
              ) : (
                <Entypo name="images" size={40} color={colors.black_level_2} />
              )}
            </View>

            <View
              style={{
                paddingBottom: 10,
                padding: 20,
                justifyContent: 'space-around',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={{justifyContent: 'center', alignItems: 'center'}}
                onPress={handleCamera}>
                <AntDesign name="camerao" color={colors.black} size={25} />
                <Text
                  style={{
                    color: colors.black_level_2,
                    fontFamily: 'Lato-Bold',
                    fontSize: 16,
                  }}>
                  Camera
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{justifyContent: 'center', alignItems: 'center'}}
                onPress={handleGalley}>
                <Entypo name="image" color={colors.black} size={25} />
                <Text
                  style={{
                    color: colors.black_level_2,
                    fontFamily: 'Lato-Bold',
                    fontSize: 16,
                  }}>
                  Gallery
                </Text>
              </TouchableOpacity>
            </View>

            <CustomButton
              width={'100%'}
              text={type === 'add' ? 'Create Banner' : 'Update Banner'}
              onPress={type === 'add' ? handleCreateBanner : handleUpdateBanner}
            />
          </View>
        </View>
      </ActionSheet>

      <FlatList
        data={banners}
        contentContainerStyle={{
          alignSelf: 'center',
          paddingBottom: 100,
        }}
        keyExtractor={(item, index) => String(index)}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => {
          //console.warn(item);
          return (
            <ImageBackground
              source={{uri: item.image}}
              style={{
                width: width * 0.9,
                height: height * 0.2,
                resizeMode: 'cover',
                borderRadius: 10,
                overflow: 'hidden',
                marginTop: 10,
              }}>
              <View
                style={{
                  position: 'absolute',
                  top: 10,
                  right: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: colors.white_level_3,
                  borderRadius: 10,
                  overflow: 'hidden',
                  padding: 8,
                  zIndex: 9,
                }}>
                <TouchableOpacity onPress={() => handleEdit(item)}>
                  <Feather name="edit" color={colors.black_level_2} size={20} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleDelete(item)}>
                  <AntDesign
                    name="delete"
                    color={colors.black_level_2}
                    size={20}
                    style={{marginLeft: 10}}
                  />
                </TouchableOpacity>
              </View>

              <View style={{padding: 20}}>
                <Text
                  style={{
                    color: colors.black_level_3,
                    fontSize: 20,
                    fontFamily: 'Lato-Black',
                  }}>
                  {item.head}
                </Text>
                <Text
                  style={{
                    color: colors.black_level_2,
                    fontSize: 16,
                    fontFamily: 'Lato-Regular',
                    marginTop:15
                  }}>
                  {item.description}
                </Text>
              </View>
            </ImageBackground>
          );
        }}
      />
    </View>
  );
};

export default Banner;
