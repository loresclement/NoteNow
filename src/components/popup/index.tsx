import React, { useEffect, useState } from 'react';
import { Text, View, Modal, TouchableOpacity } from 'react-native';

interface PopupProps {
    visible: boolean;
    callback: any;
}

const Popup = (props: PopupProps) => {

    const {visible, callback} = props
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => 
    {
        setModalVisible(visible)
    }, [visible])

    const handlePressYes = () => {
        callback(true)
    };

    const handlePressNo = () => {
        callback(false)
    };

    return (
    <View style={{ flex: 1 }}>
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
            setModalVisible(false);
        }}
        >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
            <Text style={{color: 'black'}}>Do you want to delete ?</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                <TouchableOpacity onPress={handlePressNo} style={{padding: 10}}>
                    <Text style={{color: 'black'}}>No</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handlePressYes} style={{padding: 10}}>
                    <Text style={{color: 'black'}}>Yes</Text>
                </TouchableOpacity>
            </View>
            </View>
        </View>
        </Modal>
    </View>
    );
};

export default Popup;
