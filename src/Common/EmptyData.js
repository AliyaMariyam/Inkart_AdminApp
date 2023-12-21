import React from 'react';
import {Text, View} from 'react-native';
import colors from './colors';

const EmptyData = () => {
  return (
    <View
      style={{
        marginVertical: 8,
        borderRadius: 15,
        width: '95%',
        backgroundColor: colors.lightGrey,
        alignSelf: 'center',
        padding: 10,
      }}>
      <Text
        style={{
          fontFamily: 'Lato-Bold',
          fontSize: 20,
          color: colors.black,
          lineHeight: 35,
        }}>
        No Results Found
      </Text>
    </View>
  );
};

export default EmptyData;
