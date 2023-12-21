import React, {useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import colors from '../../Common/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';

const CustomDropDown = props => {
  const {data, setData, prevData = {}} = props;
 // console.log("prev data : ",prevData.name)
  const [activeSections, setActiveSections] = useState([]);
  const [selected, setSelected] = useState(
    prevData ? prevData.name : data[0].name,
  );

  useEffect(() => {
    if (data) {
      setSelected(prevData ? prevData.name : data[0].name);
    }
  }, [data]);

  console.log("selected : ",selected)

  const SECTIONS = [
    {
      id: 0,
      sectionData: prevData ? prevData.name : data[0].name,
    },
  ];

  const _updateSections = activeSections => {
    setActiveSections(activeSections);
  };

  const _renderHeader = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            color: colors.black_level_2,
            fontSize: 16,
            fontFamily: 'Lato-Regular',
          }}>
          {selected}
        </Text>
        <AntDesign name="down" size={20} color={colors.black_level_3} />
      </View>
    );
  };

  const _renderContent = section => {
    return (
      <FlatList
        data={data}
        style={{marginTop: 10}}
        renderItem={({item, index}) => {
          if (item === selected) {
            return null;
          } else {
          }
          return (
            <TouchableOpacity
              onPress={() => {
                setData(item.name);
                setSelected(item.name);
                setActiveSections([]);
              }}
              style={{
                borderTopColor: colors.black_level_3,
                borderTopWidth: StyleSheet.hairlineWidth,
                paddingVertical: 10,
              }}>
              <Text
                style={{
                  color: colors.black_level_2,
                  fontSize: 16,
                  fontFamily: 'Lato-Regular',
                }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    );
  };

  return (
    <View>
      <Accordion
        sections={SECTIONS}
        activeSections={activeSections}
        renderHeader={_renderHeader}
        renderContent={_renderContent}
        onChange={_updateSections}
        underlayColor={'transparent'}
        sectionContainerStyle={{
          borderRadius: 15,
          borderWidth: 1,
          padding: 15,
          borderColor: colors.primaryGreen,
          backgroundColor: colors.white_level_3,
        }}
      />
    </View>
  );
};

export default CustomDropDown;
