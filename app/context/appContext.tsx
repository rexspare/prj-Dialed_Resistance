import { tryCatch } from 'ramda'
import React, { createContext, useContext, useState, useEffect } from 'react'
import { Alert, Platform, ToastAndroid } from 'react-native'
import {
    initConnection,
    endConnection,
    flushFailedPurchasesCachedAsPendingAndroid,
    getSubscriptions,
    getAvailablePurchases,
    getProducts, //For fetching available products
    requestPurchase, //For initiating in-app purchases
    purchaseUpdatedListener, //For listening to purchase events
    purchaseErrorListener, //For listening to purchase errors
    finishTransaction, //For acknowledging a purchase
    PurchaseError,
    requestSubscription,
} from 'react-native-iap'
import AsyncStorage from '@react-native-community/async-storage'

export const AppContext = createContext({
    isSubscribed: false,
    setisSubscribed: (val: boolean) => { },
    handlePurchase: () => { },
    subscribeAccessCode: (code: string) => { }
})

export const useApp = () => useContext(AppContext)

export const AppProvider = ({ children }) => {
    const [isSubscribed, setisSubscribed] = useState<any>(false)
    const [subsciptionList, setsubsciptionList] = useState<any>([])
    const SUB_IDS = ['base-monthly-plan', 'base_monthly_plan']
    const ACCESS_CODE = ['GMT01']
    const USER_TYPE_KEY = "@USER_TYPE"

    const getSubs = async () => {
        try {
            try {
                // const result = await getProducts({ skus: PRODUCT_IDS })
                // console.log('===>>', result)
                const res = await getSubscriptions({ skus: SUB_IDS })
                console.log('===>>', JSON.stringify(res))
                setsubsciptionList(res)
            }
            catch (error) {
                console.error('Error fetching products', error)
            }
        }
        catch (error) {
            console.error('Error occurred while fetching purchases', error)
        }
    }


    const handlePurchase = async () => {
        console.log('Purchasing...')
        try {
            if (subsciptionList?.length > 0) {

                const res = await requestSubscription({
                    sku: subsciptionList[0]?.productId, subscriptionOffers: [{
                        sku: subsciptionList[0]?.productId,
                        offerToken: subsciptionList[0].subscriptionOfferDetails[0].offerToken
                    }]
                })
                console.log({ res });
                setisSubscribed(true)
                await AsyncStorage.setItem(USER_TYPE_KEY, "Individual")
                getAvailablePurchase()
            }

        } catch (error) {
            console.log(error)
        }
    }

    function hasSubscription(userSubscriptions: any, availableSubscriptions: any) {
        // Check if userSubscriptions contains any subscription from availableSubscriptions
        for (let userSub of userSubscriptions) {
            for (let availableSub of availableSubscriptions) {
                if (userSub.productId === availableSub.productId && userSub.transactionReceipt) {
                    return true;
                }
            }
        }
        return false;
    }

    const getAvailablePurchase = async () => {
        try {
            const userType = await AsyncStorage.getItem(USER_TYPE_KEY)

            if (userType == "Gym") {
                const isGymMember = await AsyncStorage.getItem("@SUBSCRIBED")
                if (isGymMember == "true") {
                    setisSubscribed(true)
                }
            } else {
                const subscriptions = await getSubscriptions({ skus: SUB_IDS })

                // Fetch the user's purchases
                const purchases = await getAvailablePurchases();

                // Check if any of the purchases match the subscription ID
                const subscribed = hasSubscription(purchases, subscriptions)

                setisSubscribed(subscribed ? true : false);
            }

        } catch (error) {

        }
    }

    const subscribeAccessCode = async (code: string) => {
        return new Promise(async (resolve, reject) => {
            try {
                const valid = ACCESS_CODE.includes(code)
                if (valid == true) {
                    await AsyncStorage.setItem(USER_TYPE_KEY, "Gym")
                    await AsyncStorage.setItem("@SUBSCRIBED", "true")
                    setisSubscribed(true)
                    resolve(true)
                } else {
                    ToastAndroid.showWithGravityAndOffset(
                        "The entered code is invalid",
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM,
                        25,
                        50
                    )
                    resolve(false)
                }
            } catch (error) {
                console.log("subscribeAccessCode ==>>", error);
                resolve(false)
            }
        })
    }


    useEffect(() => {
        const init = async () => {
            try {
                console.log('connecting...')
                await initConnection()
                console.log('connected.')
                if (Platform.OS === 'android') {
                    flushFailedPurchasesCachedAsPendingAndroid()
                    getSubs()
                    getAvailablePurchase()
                }
            }
            catch (error) {
                console.error('Error occurred during initilization', error.message)
            }
        }

        if (true) {
            init()

            const purchaseUpdateSubscription = purchaseUpdatedListener(
                async (purchase) => {
                    const receipt = purchase.transactionReceipt
                    if (receipt) {
                        try {
                            await finishTransaction({ purchase, isConsumable: false })
                            getAvailablePurchase()
                        } catch (error) {
                            console.error("An error occurred while completing transaction", error)
                        }
                        console.log('You have subscribed to this package successfully')
                    }
                })
            const purchaseErrorSubscription = purchaseErrorListener((error) =>
                console.error('Purchase error', error.message))

            return () => {
                purchaseUpdateSubscription.remove()
                purchaseErrorSubscription.remove()
                endConnection()
            }
        }
    }, [])


    return (
        <AppContext.Provider
            value={{
                isSubscribed,
                setisSubscribed,
                handlePurchase,
                subscribeAccessCode
            }}>
            {children}
        </AppContext.Provider>
    )
}
