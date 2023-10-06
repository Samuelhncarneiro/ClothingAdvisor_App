import React, { useState } from 'react';
import { StyleSheet,Text,View} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import sex from '../data/gender';
import COLORS from '../data/Colors';

const DropdownComponent = ({onChange,error}) => {
    const [value, setValue] =useState(null);
    const [isFocus, setIsFocus] = useState(false);

    return ( 
      <View>
        <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'orange' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={sex}
        maxHeight={300}
        labelField="value"
        valueField="value"
        placeholder={!isFocus ? 'Select your sex' : '...'}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          setIsFocus(false);
          onChange(item.value)
        }}
        renderLeftIcon={() => (
          <MaterialCommunityIcons style={styles.icon} name="gender-male-female" size={22} color= {COLORS.black}/>
        )}
        />
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    );
};

export default DropdownComponent;

const styles = StyleSheet.create({
    dropdown: {
      height: 55,
      borderBottomColor: 'gray',
      borderBottomWidth: 0.5,
      backgroundColor:COLORS.light,
      paddingHorizontal:15,
      borderWidth:0.5,
      borderWidth:0.5,
      marginVertical:5,
      alignItems:'center',
    },
    icon: {
      marginRight: 0,
    },
    placeholderStyle: {
        marginVertical:5,
        fontSize: 14,
        color:COLORS.grey,
    },
    selectedTextStyle: {
      fontSize: 14,
    },
    label:{
      marginVertical:5,
      fontSize: 14,
      color:COLORS.black,
     },
    errorText: {
      color: 'red',
      fontSize: 12,
      marginTop: 3,
    },
});