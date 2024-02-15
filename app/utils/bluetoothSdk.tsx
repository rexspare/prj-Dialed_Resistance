import { makeAutoObservable, observable } from "mobx"
import { useLocalStore } from "mobx-react-lite"
import { number } from "mobx-state-tree/dist/internal"
import React, { createContext, useContext } from "react"
import { NativeModules } from "react-native"
import { connect } from "react-native-ble-manager"

const { PuckJS, Wahoo, WahooHR } = NativeModules

export type devices = 'all' | 'puck' | 'wahoo' | 'wahooHR' | false
type dataTags = 'heartRate' | 'cadence' | 'rotation' | 'heartRateError'

interface BluetoohSDK {
  getPermissions: () => Promise<devices>
  connect: (devices: devices, timeout?: number) => Promise<devices[]>
  disconnect: (devices: devices) => Promise<devices[]>
  subscribe: (dataTag: dataTags) => Readonly<number|string|void>
  getSnapShot: (dataTag: dataTags) => Readonly<number|string|void>
  connected: devices[]
  heartRateError: string | void
}

class SDKStore {
  heartRate = 0
  heartRateError: string | void = null
  cadence = "0.0"
  cadenceError: string | void = null
  rotation = 0
  connected: devices[] = []
  wahooDataFunction: NodeJS.Timeout
  puckDataFunction: NodeJS.Timeout
  wahooHRDataFunction: NodeJS.Timeout

  constructor() {
    makeAutoObservable(this)
  }

  updateWahoo() {
    Wahoo.GetCadenceValue().then(value => {
      if (this.cadenceError) {
        this.cadenceError = null
      }
      this.cadence = (value)
    }).catch(e => {
      this.cadenceError = e
    })
  }

  updateHeartRate() {
    WahooHR.GetHeartRateValue().then(value => {
      if (this.heartRateError) {
        this.heartRateError = null
      }
      this.heartRate = (value)
    }).catch(e => {
      this.heartRateError = e
    })
  }

  updatePuck() {
    PuckJS.GetValue().then(value => {
      console.log(value)
      this.rotation = value
    })
  }
}

export const SDKStoreInstance = new SDKStore()

export const SDKContext = createContext(SDKStoreInstance)

export const SDKProvider = ({ children }) => {
  const sdkStore = SDKStoreInstance
  console.log('SDKSTORE', sdkStore)
  return <SDKContext.Provider value={sdkStore}>{children}</SDKContext.Provider>
}

const SDK: ()=>BluetoohSDK = () => {
  const SDKState = useContext(SDKContext)
  const toggleConnected = async (device:devices) => {
    const newConnectionArray = [...SDKState.connected]
    if (SDKState.connected.includes(device)) {
      newConnectionArray.splice(newConnectionArray.findIndex((value) => value === device), 1)
    } else {
      newConnectionArray.push(device)
    }
    SDKState.connected = newConnectionArray
  }
  // console.log('SDKState', SDKState)
  return {
    getPermissions: () => new Promise(() => 'all'),
    connect: async (devices, timeout) => {
      switch (devices) {
        case 'puck':
        // Check if connected
          if (!SDKState.connected.includes(devices)) {
            console.log('not connected')
            await PuckJS.connect(timeout).then(async (result) => {
              console.log('nativeResult', result)
              if (result === true) {
                await toggleConnected('puck')
                SDKState.puckDataFunction = setInterval(() => {
                  SDKState.updatePuck()
                }, 1000)
                return result
              }
            }).catch(async (e) => {
              console.log(e)
              if (e.toString() == 'Error: BT le scanner not available') {
              // Handle Bluetooth not on!
              }
              // This error needs to be handled on native level!
              if (e.toString() == 'Error: scanner already started with given callback') {
                await toggleConnected('puck')
                return
              }
              // console.log(e.toString())
              throw e
            })
          } else {
            await PuckJS.disconnect().then(async (result) => {
              console.log('connected')
              if (result === true) {
                clearInterval(SDKState.puckDataFunction)
                await toggleConnected('puck')
              }
            }).catch(async (e) => {
              if (e.toString() == 'Error: BT le scanner not available') {
              // Handle Bluetooth not on!
                console.log(e.toString())
              }
            })
          }
          break
        case 'wahoo':
          if (!SDKState.connected.includes(devices)) {
            await Wahoo.connect().then(async (result) => {
              if (result === true) {
                await toggleConnected('wahoo')
                SDKState.wahooDataFunction = setInterval(() => {
                  SDKState.updateWahoo()
                }, 1000)
                return result
              }
            })
          } else {
            await Wahoo.disconnect().then(async () => {
              clearInterval(SDKState.wahooDataFunction)
              await toggleConnected('wahoo')
            })
          }
          break
        case 'wahooHR':
          if (!SDKState.connected.includes(devices)) {
            await WahooHR.connect().then(async (result) => {
              if (result === true) {
                await toggleConnected('wahooHR')
                SDKState.wahooHRDataFunction = setInterval(() => {
                  SDKState.updateHeartRate()
                }, 1000)
                return result
              }
            })
          } else {
            await WahooHR.disconnect().then(async () => {
              clearInterval(SDKState.wahooHRDataFunction)
              await toggleConnected('wahooHR')
            })
          }
          break
      }

      return SDKState.connected
    },
    disconnect: async (devices) => {
      switch (devices) {
        case 'puck':
          PuckJS.disconnect().then(async (result) => {
            console.log('connected')
            if (result === true) {
              clearInterval(SDKState.puckDataFunction)
              if (SDKState.connected.includes(devices)) await toggleConnected('puck')
            }
          }).catch(async (e) => {
            if (e.toString() == 'Error: BT le scanner not available') {
              // Handle Bluetooth not on!
              console.log(e.toString())
            }
          })
          break
        case 'wahoo':
          Wahoo.disconnect().then(async () => {
            clearInterval(SDKState.wahooDataFunction)
            if (SDKState.connected.includes(devices)) await toggleConnected('wahoo')
          }).catch(async (e) => {
            if (e.toString() == 'Error: BT le scanner not available') {
              // Handle Bluetooth not on!
              console.log(e.toString())
            }
          })
          break
        case 'wahooHR':
          WahooHR.disconnect().then(async () => {
            clearInterval(SDKState.wahooHRDataFunction)
            if (SDKState.connected.includes(devices)) await toggleConnected('wahooHR')
          })
          break
      }

      return SDKState.connected
    },
    getSnapShot: (dataTags) => {
      return SDKState[dataTags]
    },
    subscribe: (dataTags) => {
      return SDKState[dataTags]
    },
    get connected () {
      return SDKState.connected
    },
    get heartRateError() {
      return SDKState.heartRateError
    }
  }
}

export default SDK
