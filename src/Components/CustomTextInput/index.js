import {View, Text, TextInput} from 'react-native';
import React from 'react';
import colors from '../../Common/colors';

const CustomTextInput = props => {
  const {
    placeholder,
    value,
    onChangeText,
    icon,
    border,
    width,
    secureTextEntry,
    multiline,
  } = props;

  return (
    <View
      style={{
        flexDirection: icon ? 'row' : 'column',
        alignItems: icon ? 'center' : 'baseline',
        justifyContent: 'space-between',
        borderWidth: border ? 1 : 0,
        borderColor: colors.primaryGreen,
        width: width,
        //padding:5,
        paddingHorizontal: 10,
        marginVertical: 10,
        borderRadius: 8,
        alignSelf: 'center',
        backgroundColor: colors.white_level_3,
      }}>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        selectionColor={colors.primaryGreen}
        placeholderTextColor={colors.black}
        multiline={multiline}
        style={{
          color: colors.black,
          fontFamily: 'Lato-Regular',
          fontSize: 16,
          height: multiline ? 100 : 'default',
          width: icon ? '90%' : '100%'
        }}
        secureTextEntry={secureTextEntry}
      />
      {icon ? icon : null}
    </View>
  );
};

export default CustomTextInput;
