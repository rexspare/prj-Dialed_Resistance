import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { color } from '../../theme'
import { responsiveFontSize } from '../../utils/responsiveDimensions'

interface IFineTuneCalModalProps {
    isVisible: boolean
    onClose: () => void
    setisFineTuneEnabled: (val: boolean) => void
}

const FineTuneCalModal = (props: IFineTuneCalModalProps) => {
    const {
        isVisible,
        onClose,
        setisFineTuneEnabled
    } = props

    const [isYesPressed, setisYesPressed] = useState(false)

    const onCloseModal = () => {
        setisYesPressed(false)
        onClose()
    }

    const handleYes = () => {
        setisFineTuneEnabled(true)
        setisYesPressed(true)
    }

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

                    <Text style={styles.txt1}>{isYesPressed ? "Success" : "Fine Tune Your Calibration"}</Text>

                    <Text style={styles.txt2}>{
                        isYesPressed ?
                            "You will be able to fine tune your calibration during your next ride"
                            :
                            "Over time your fitness level will change and your calibration will need to be fine tuned in order to feel accurate against the intractor's call outs. Would you like to fine tune your calibration?"
                    }</Text>


                    {
                        isYesPressed ?
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={styles.btn}
                                onPress={() => onCloseModal()}
                            >
                                <Text style={styles.btnTxt}>Okay</Text>
                            </TouchableOpacity>

                            :
                            <View style={styles.row}>

                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    style={styles.btn}
                                    onPress={() => handleYes()}
                                >
                                    <Text style={styles.btnTxt}>Yes</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    style={styles.btn}
                                    onPress={() => onCloseModal()}
                                >
                                    <Text style={styles.btnTxt}>NO</Text>
                                </TouchableOpacity>

                            </View>
                    }

                </View>

            </View>

        </Modal>
    )
}

export default FineTuneCalModal

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
        paddingHorizontal: '7%',
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
        lineHeight: responsiveFontSize(18),
        marginTop: 15,
        textAlign: 'left',
        alignSelf: 'flex-start'
    },
    btn: {
        marginTop: 20,
        marginBottom: 15,
        backgroundColor: color.palette.primaryColor,
        paddingVertical: 10,
        borderRadius: 8,
        width: '30%',
        alignItems: 'center'
    },
    btnTxt: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: responsiveFontSize(15),
    },
    row: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    }
})