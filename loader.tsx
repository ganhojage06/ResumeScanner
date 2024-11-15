import React from "react";
import { View, StyleSheet, ActivityIndicator, Modal,Dimensions } from 'react-native';
import {  } from 'react-native'

const WIDTH = Dimensions.get('screen').width
const HEIGHT = Dimensions.get('screen').height


export const Loader = props => {
    return (
        <Modal
            visible={props.visible}
            transparent={true}
        >
            <View
                style={Styles.loader_container}
            >
                <View style={Styles.loader_view}>
                    <ActivityIndicator
                        size={WIDTH * 0.15}
                    />
                </View>
            </View>
        </Modal>
    )
}

const Styles = StyleSheet.create({
    loader_container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#00000040',
    },
    loader_view: {
        backgroundColor: "transparent",
        alignSelf: 'center'
    }
})

export default Loader;