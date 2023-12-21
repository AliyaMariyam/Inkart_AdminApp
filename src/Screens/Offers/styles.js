import {StyleSheet} from 'react-native';
import colors from '../../Common/colors';

const styles = (width, height) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.white_level_1,
    },
    main: {
      flex: 1,
    },
    contentStyle: {
      alignSelf: 'center', 
      marginVertical: height * 0.015 //15 aayirunnu aadhyam
    },
    renderView:{
      flexDirection: 'row',
      alignItems: 'center',
      width: width,
      alignSelf: 'center',
      justifyContent: 'center',
      marginBottom:height *0.015,
    },
    offCircleView:{
      marginRight: (-height * 0.02) / 2, 
      zIndex: 99
    },
    circleRight:{
      width: 25,
      height: 25,
      borderRadius: 25 / 2,
      backgroundColor: colors.white_level_2,
    },
    circleCenter:{
      width: 25,
      height: 25,
      borderRadius: 25 / 2,
      backgroundColor: colors.white_level_2,
      marginTop: -25 / 2,
    }

  });

export default styles;