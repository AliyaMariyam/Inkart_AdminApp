import { StyleSheet } from "react-native";
import colors from "../../Common/colors";

const styles = StyleSheet.create({
appIconImage:{
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginRight: 10,
  },
  iconRight:{
    width: 120,
    height: 50,
    resizeMode: 'contain',
    marginRight: 10,
  },
  box:{
    width: '90%',
    height: '25%',
    borderRadius: 15,
    alignSelf: 'center',
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: 8,
  },
  imageInBox:{width: 90, height: 90, resizeMode: 'contain'},
  text:{
    fontFamily: 'Lato-Bold',
    fontSize: 32,
    color: colors.black,
  },
  subText:{
    fontFamily: 'Lato-Regular',
    fontSize: 18,
    color: colors.black,
  },
})

export default styles