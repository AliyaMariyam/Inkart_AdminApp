import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import CustomTextInput from '../../Components/CustomTextInput';
import CustomButton from '../../Components/CustomButton';
import colors from '../../Common/colors';
import firestore from '@react-native-firebase/firestore';
import Snackbar from 'react-native-snackbar';
import {useDispatch} from 'react-redux';
import {login} from '../../store/action';

const Login = () => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (email.trim() === 'admin@yopmail.com' && password.trim() === '1234') {
      await firestore()
        .collection('users')
        .where('email', '==', email.trim())
        .get()
        .then(async snapshot => {
          if (!snapshot.empty) {
            snapshot.forEach(documentSnapshot => {
              const responseData = documentSnapshot.data();
              if (password.trim() === responseData.password) {
                dispatch(
                  login({
                    userId: documentSnapshot.id,
                  }),
                );
                Snackbar.show({
                  text: 'Logged in Successfully',
                  duration: Snackbar.LENGTH_LONG,
                  backgroundColor: colors.primaryGreen,
                  textColor: colors.white,
                });
              } else {
                Snackbar.show({
                  text: 'The password you entered is wrong',
                  duration: Snackbar.LENGTH_LONG,
                  backgroundColor: colors.red,
                  textColor: colors.white,
                });
              }
            });
          }
        })
        .catch(err => console.warn(err));
    } else {
      Snackbar.show({
        text: 'The Entered Credentials Are Wrong.Please Check Again',
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: colors.red,
        textColor: colors.white,
      });
    }
  };

  const handleSecureTextEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <View style={{flex: 1}}>
      <Image
        source={require('../../assets/images/topBg.png')}
        style={{width: '100%', height: 150}}
      />
      <ScrollView
        style={{
          marginTop: -25,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          backgroundColor: 'white',
        }}>
        <Image
          source={require('../../assets/images/logo.jpeg')}
          style={{
            width: 250,
            height: 150,
            resizeMode: 'contain',
            alignSelf: 'center',
          }}
        />
        <Text
          style={{
            fontFamily: 'Lato-Bold',
            fontSize: 22,
            textAlign: 'center',
            marginBottom: 20,
            color: colors.black,
          }}>
          Admin Login
        </Text>
        <CustomTextInput
          onChangeText={text => setEmail(text)}
          width={'90%'}
          placeholder={'E-mail'}
          border={'true'}
          icon={
            <Image
              source={require('../../assets/images/user.png')}
              style={{width: 25, height: 25, resizeMode: 'contain'}}
            />
          }
        />
        <CustomTextInput
          onChangeText={password => setPassword(password)}
          width={'90%'}
          placeholder={'Password'}
          border={'true'}
          secureTextEntry={secureTextEntry}
          icon={
            <TouchableOpacity onPress={handleSecureTextEntry}>
              <Image
                source={
                  secureTextEntry
                    ? require('../../assets/images/hide.png')
                    : require('../../assets/images/view.png')
                }
                style={{width: 25, height: 25, resizeMode: 'contain'}}
              />
            </TouchableOpacity>
          }
        />

        <CustomButton text={'Login'} onPress={handleLogin} width={'90%'} />
      </ScrollView>
    </View>
  );
};

export default Login;
