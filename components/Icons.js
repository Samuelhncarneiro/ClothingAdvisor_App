import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export default class Icons extends React.Component {
    render() {
        return (
            <View style={styles.icon}>
                <Image source={this.props.icon} style={styles.image}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    icon: {
        flex: 1,
        width: null,
        height: null,
        opacity: 2,
    },
    image: {
        flex: 4,
        width: null,
        height: null,
        resizeMode: 'contain',
        opacity: 1,
    }
})