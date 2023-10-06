import React from "react"
import {View, Text, StyleSheet, Pressable, Touchable, TouchableOpacity} from 'react-native'

const CustomButton=({onPress,text})=>{
    return(
        <TouchableOpacity onPress={onPress} style={styles.container} activeOpacity={0.7}>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles= StyleSheet.create({ 
    container:{
        backgroundColor: '#FE9401',
        width:'100%',
        alignItems:'center',
        height:55,
        justifyContent:'center',
        marginVertical:20,
    },
    text:{
        fontWeight:'bold',
        color:'white',
        fontSize:18,
    },
})

export default CustomButton