import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { color } from '../../theme'
import { responsiveFontSize } from '../../utils/responsiveDimensions'

interface IFineTuneModalProps {
    isVisible: boolean
    onClose: () => void
}

const FineTuneModal = (props: IFineTuneModalProps) => {
    const {
        isVisible,
        onClose
    } = props

    return (
        <Modal
            visible={isVisible}
            animationType='slide'
            transparent
            onRequestClose={() => { }}
            style={{ flex: 1 }}
        >

            <View style={styles.main}>

                <View style={styles.container}>

                    <Text style={styles.txt1}>Fine Tuning</Text>

                    <Text style={styles.txt2}>We will now fine tune your calibration - making sure everything feels right.</Text>

                    <Text style={styles.txt2}>Selecte 'Easier' or 'Harder' to better align the resistance levels with your effort.</Text>

                    <Text style={styles.txt2}>This Fine Tuning will be available the first ride after calibrations.</Text>

                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.btn}
                        onPress={() => onClose()}
                    >
                        <Text style={styles.btnTxt}>Okay</Text>
                    </TouchableOpacity>

                </View>

            </View>

        </Modal>
    )
}

export default FineTuneModal

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        width: '90%',
        minHeight: 100,
        borderWidth: 1.5,
        borderColor: color.palette.primaryColor,
        backgroundColor: color.palette.mainBgColor,
        alignItems: 'center',
        paddingHorizontal: '5%',
        borderRadius: 15
    },
    txt1: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: responsiveFontSize(18),
        marginTop: 20
    },
    txt2: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: responsiveFontSize(13),
        marginTop: 15,
        textAlign: 'left',
        alignSelf: 'flex-start'
    },
    btn: {
        marginTop: 20,
        marginBottom: 15,
        backgroundColor: color.palette.primaryColor,
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 8
    },
    btnTxt: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: responsiveFontSize(15),
    }
})