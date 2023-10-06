import React from 'react';
import { StyleSheet, Text, View, Image, Button, SafeAreaView,ImageBackground, TouchableOpacity,useWindowDimensions} from 'react-native';
import CustomButton from '../components/CustomButton';

import logo from '../assets/logo.png';
import COLORS from '../data/Colors';

const MainScreen = ({navigation}) => {
    const{height} = useWindowDimensions();
    return(
            <View style={{flex:1, flexDirection:'column', justifyContent:'center', alignItems:'center', background: COLORS.white}}>
                <ImageBackground source={require('../assets/Background.png')} style={styles.imagemFundo}>    
                    <Image source={logo} style={[styles.logo, {height: height * 0.3}]} resizeMode="contain"/> 
                    <TouchableOpacity onPress={()=> navigation.navigate("LoginScreen")} style={styles.container}>
                        <Text style={styles.text}>Login</Text>
                    </TouchableOpacity> 
                    <TouchableOpacity onPress={()=> navigation.navigate("GuestScreen")} style={styles.container}>
                        <Text style={styles.text}>Guest</Text>
                    </TouchableOpacity>   
                    <Text style={{alignSelf:'center',fontWeight:'bold',color:COLORS.black,fontSize:16,marginTop:10}}>If you doesn't have an account! <Text onPress={()=> navigation.navigate("RegisterScreen")} style = {{ color: 'white' }}>Sign Up</Text></Text>
                </ImageBackground>
            </View>
    )
}
const styles = StyleSheet.create({
    imagemFundo:{
        flex:1,
        resizeMode:"cover",
        width:"100%",
        
    },
    logo:{
        width: '100%',
        paddingTop: 400,
        maxHeight:300,
        maxWidth:600,
        marginVertical:30,
        alignSelf:'center',
        alignItems:'center',
        borderRadius:5,
        padding:20,
        justifyContent:'center',
    },
    container:{
        backgroundColor: '#FE9401',
        width:'80%',
        alignItems:'center',
        alignSelf:'center',
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
export default MainScreen