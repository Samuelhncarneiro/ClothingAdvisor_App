import React from "react"
import {View,Text,TextInput,StyleSheet} from 'react-native'

import COLORS from '../data/Colors';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import CustomButton from '../components/CustomButton'; 

const InputBox =({label,iconName,error,password,onFocus=()=>{},...props})=>{
    const[isFocused,setisFocused] = React.useState(false);
    const [hidePassword, setHidePassord] = React.useState(password)
    return(
        <View style={{marginBottom:20}}>
            <Text style={style.label}>{label}</Text>
            <View style={[style.inputContainer,{borderColor: error ? COLORS.red:isFocused ? COLORS.black:COLORS.black}]}>
                <MaterialCommunityIcons name={iconName} style={{fontSize:22,color:COLORS.black}}/>
                <TextInput
                    secureTextEntry={hidePassword} 
                    autocorrect={false}
                    onFocus={()=>{
                        onFocus();
                        setisFocused(true);
                    }}
                    onBlur={()=>{
                        setisFocused(false);
                    }}
                    style={{color:COLORS.black,flex:1}} 
                    {...props} />
                    {password && (
                        <MaterialCommunityIcons onPress={()=> setHidePassord(!hidePassword)} style={{fontSize:22, color:COLORS.black}} name={hidePassword ? "eye-outline": "eye-off-outline"}/>
                    )}
            </View>
            {error && (
                <Text style={{color: COLORS.red,fontSize:12,marginTop:7}}>{error}</Text>
            )}
        </View>
    )
}

const style = StyleSheet.create({
   label:{
    marginVertical:5,
    fontSize: 14,
    color:COLORS.black,
   },
   inputContainer:{
    height:55,
    backgroundColor:COLORS.light,
    flexDirection:'row',
    paddingHorizontal:15,
    borderWidth:0.5,
    alignItems:'center',
   },  
})

export default InputBox