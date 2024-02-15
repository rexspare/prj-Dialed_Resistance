import AsyncStorage from "@react-native-community/async-storage"
const LOGS_KEY = "@logskey"

const storeLogs = (data: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const storedLogs = await AsyncStorage.getItem(LOGS_KEY);
            let mData: any;

            if (storedLogs) {
                const pData = JSON.parse(storedLogs);
                mData = [...pData, data];
            } else {
                mData = [data];
            }

            const fData = JSON.stringify(mData);
            await AsyncStorage.setItem(LOGS_KEY, fData);

            resolve(true);
        } catch (error) {
            reject(error);
        }
    });
};


const getLogs = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const storedLogs: any = await AsyncStorage.getItem(LOGS_KEY);
            let pData: any
            if (storedLogs) {
                pData = JSON.parse(storedLogs)
                if (pData?.length > 10) {
                    await resetLogs(pData.slice(-10))
                }
                pData = JSON.stringify(pData.slice(-10))
            } else {
                pData = storedLogs
            }
            resolve(pData);
        } catch (error) {
            reject(error);
        }
    });
};

const resetLogs = (array: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const fData = JSON.stringify(array);
            await AsyncStorage.setItem(LOGS_KEY, fData);
            resolve(true);
        } catch (error) {
            reject(error);
        }
    });
};


export {
    storeLogs,
    getLogs,
    resetLogs
}