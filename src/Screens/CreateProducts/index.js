import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Text,
} from 'react-native';
import CustomButton from '../../Components/CustomButton';
import NavigationBack from '../../Common/NavigationBack';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import fireStore from '@react-native-firebase/firestore';
import colors from '../../Common/colors';
import CustomTextInput from '../../Components/CustomTextInput';
import CustomDropDown from '../../Components/CustomDropDown';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ActionSheet from 'react-native-actions-sheet';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import uploadImage from '../../Common/Storage';
import Snackbar from 'react-native-snackbar';

const CreateProduct = () => {
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);
  const [uploadUri, setUploadUri] = useState(null);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState(null);
  const [qun, setQun] = useState(0);

  const actionSheetRef = useRef(null);

  useEffect(() => {
    setName(data.name);
    setUploadUri(data.image);
    setDesc(data.desc);
    setPrice(data.price);
    setQun(data?.quantity ?? 1);
  }, [data]);


  const route = useRoute();
  const {type, data} = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: type === 'create' ? 'Create Products' : 'Edit Product',
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
      getCategories();
    }, []),
  );

  useEffect(()=>{
    if(category){
      setCategory(category)
    }
  },[category])

  const getCategories = async () => {
    await fireStore()
      .collection('categories')
      .get()
      .then(snapshot => {
        if (!snapshot.empty) {
          const objArray = [];
          snapshot?.docs.forEach(document => {
            const result = {id: document.id, ...document?.data()};
            objArray.push(result);
          });
          setCategories(objArray);
          setCategoryWithObj(objArray)
        }
      });
  };

  console.log("Categories : ",categories)

  const setCategoryWithObj = objArray =>{
    if(data && data.categoryId){
      const result = objArray.find(ele =>ele.id === data.categoryId)
      console.warn("result : ",result);
      setCategory(result) 
    }
  }

  const handleCamera = async () => {
    const options = {
      mediaType: 'photo',
    };
    await launchCamera(options, response => {
      actionSheetRef.current?.hide();
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
      actionSheetRef.current?.hide();
      if (response && response.assets) {
        setUploadUri(response?.assets[0]?.uri);
      }
    });
  };

  const handleCreateProduct = async () => {
    // console.warn(name,price,desc,category,qun);
    if (
      uploadUri &&
      name !== '' &&
      desc !== '' &&
      price !== '' &&
      category !== '' &&
      qun !== 0
    ) {
      const responseUri = await uploadImage(uploadUri);
      // console.warn("responseUri : ",responseUri);

      const product = {
        created: Date.now(),
        updated: Date.now(),
        name: name,
        price: price,
        description: desc,
        categoryId: '',
        categoryName: category,
        quantity: qun,
        image: responseUri,
      };

      await fireStore()
        .collection('products')
        .add(product)
        .then(() => {
          Snackbar.show({
            text: 'Product Added Successfully',
            duration: Snackbar.LENGTH_SHORT,
            textColor: colors.white,
            backgroundColor: colors.primaryGreen,
          });
          navigation.goBack();
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

  const handleUpdateProduct = async () => {
    if (
      uploadUri &&
      name !== '' &&
      desc !== '' &&
      price !== '' &&
      category !== '' &&
      qun !== 0
    ) {
      const responseUri = uploadUri.includes('file://')
        ? await uploadImage(uploadUri)
        : uploadUri;

      const product = {
        updated: Date.now(),
        name: name,
        price: price,
        description: desc,
        categoryId: '',
        categoryName: category,
        quantity: qun,
        image: responseUri,
      };

      await fireStore()
        .collection('products')
        .doc(data.id)
        .update(product)
        .then(() => {
          Snackbar.show({
            text: 'Product Updated Successfully',
            duration: Snackbar.LENGTH_SHORT,
            textColor: colors.white,
            backgroundColor: colors.primaryGreen,
          });
          navigation.goBack();
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

  return (
    <ScrollView
      style={{flex: 1, padding: 15}}
      contentContainerStyle={{paddingBottom: 100}}
      showsVerticalScrollIndicator={false}>
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
                color: colors.black_level_2,
                fontFamily: 'Lato-Bold',
                fontSize: 18,
                lineHeight: 55,
              }}>
              Select Option
            </Text>
            <TouchableOpacity
              onPress={() => actionSheetRef.current?.hide()}
              style={{alignSelf: 'flex-end'}}>
              <AntDesign name="closecircleo" color={colors.black} size={25} />
            </TouchableOpacity>
          </View>

          <View
            style={{
              paddingBottom: 50,
              padding: 20,
              justifyContent: 'space-around',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{justifyContent: 'center', alignItems: 'center'}}
              onPress={handleCamera}>
              <AntDesign name="camerao" color={colors.black} size={40} />
              <Text
                style={{
                  color: colors.black_level_2,
                  fontFamily: 'Lato-Bold',
                  fontSize: 18,
                }}>
                Camera
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{justifyContent: 'center', alignItems: 'center'}}
              onPress={handleGalley}>
              <Entypo name="image" color={colors.black} size={40} />
              <Text
                style={{
                  color: colors.black_level_2,
                  fontFamily: 'Lato-Bold',
                  fontSize: 18,
                }}>
                Gallery
              </Text>
            </TouchableOpacity>
          </View>
          
        </View>
      </ActionSheet>

      <CustomTextInput
        width={'100%'}
        border={true}
        placeholder={'Name'}
        value={name}
        onChangeText={text => setName(text)}
      />
      <CustomTextInput
        width={'100%'}
        border={true}
        placeholder={'Description'}
        multiline={true}
        value={desc}
        onChangeText={text => setDesc(text)}
      />
      {categories.length > 0 ? (
        <CustomDropDown prevData={category} data={categories} setData={obj => setCategory(obj)} />
      ) : null}
      <CustomTextInput
        width={'100%'}
        border={true}
        placeholder={'Price'}
        onChangeText={text => setPrice(text)}
      />
      <CustomTextInput
        width={'100%'}
        border={true}
        placeholder={'Quantity'}
        onChangeText={text => setQun(text)}
      />

      <TouchableOpacity
        onPress={() => {
          actionSheetRef.current?.show();
        }}
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
          Upload Product Image
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
              <AntDesign name="closecircleo" color={colors.black} size={25} />
            </TouchableOpacity>

            <Image
              source={{uri: uploadUri}}
              style={{width: 100, height: 100, resizeMode: 'contain'}}
            />
          </View>
        ) : (
          <Entypo name="images" size={40} color={colors.black_level_2} />
        )}
      </TouchableOpacity>

      <CustomButton
        width={'100%'}
        text={type === 'create' ? 'Create' : 'Update'}
        onPress={type === 'create' ? handleCreateProduct : handleUpdateProduct}
      />
    </ScrollView>
  );
};

export default CreateProduct;
