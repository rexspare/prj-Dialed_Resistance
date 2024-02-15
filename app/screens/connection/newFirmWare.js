var accelRate = 26,
  connectedInterval,
  lowBattery = false,
  batteryInterval,
  batteryLow = 78,
  batteryDead = 68 // Gyroscope discards measurements when battery % less than 2/3

var raw_Angle = 0.0,
  filtered_Angle = 0.0,
  angle_Delta = 0.0,
  scalingFactor = 0.0,
  //sensitivity_250 = 0.00875, // Default sensitivity
  sensitivity_2000 = 0.07 // In dps/LSB at 2000dps

/*
    Accepted gyro values are:
    * 1.6 Hz (no Gyro) - 40uA (2v05 and later firmware)
    * 12.5 Hz (with Gyro)- 350uA
    * 26 Hz (with Gyro) - 450 uA
    * 52 Hz (with Gyro) - 600 uA
    * 104 Hz (with Gyro) - 900 uA
    * 208 Hz (with Gyro) - 1500 uA
    * 416 Hz (with Gyro) (not recommended)
    * 833 Hz (with Gyro) (not recommended)
    * 1660 Hz (with Gyro) (not recommended)*/

NRF.on("connect", function () {
  Puck.accelOn(accelRate)
  Puck.accelWr(0x11, Puck.accelRd(0x11) | 0b00001100) // scale to 2000dps
  connectedInterval = setInterval(ble_Connected, 6000)
  filtered_Angle = 0
  raw_Angle = 0
})

function onInit() {
  check_Battery()
  scalingFactor = (1 / sensitivity_2000) * accelRate
  // on connect / disconnect blink the green / red LED turn on / off the magnetometer

  NRF.on("disconnect", function () {
    Puck.accelOff()
    digitalPulse(LED1, 1, 100)
    clearInterval(connectedInterval)
  })

  // declare the services
  NRF.setServices({
    // Battery level service
    0x2a19: {
      0x2a19: {
        notify: true,
        readable: true,
        value: [E.getBattery()],
      },
    },
    // Accelerometer service
    "f8b23a4d-89ad-4220-8c9f-d81756009f0c": {
      "f8b23a4d-89ad-4220-8c9f-d81756009f0c": {
        description: "Puck accelerometer",
        notify: true,
        readable: true,
        value: new Int32Array([0]).buffer,
        writable: true,
      },
    },
  })

  Puck.on(
    "accel",
    (a) => {
      check_Battery()
      if (E.getBattery() < batteryDead) {
        Puck.accelOff()
      }
      get_yaw(a)
      NRF.updateServices({
        "f8b23a4d-89ad-4220-8c9f-d81756009f0c": {
          "f8b23a4d-89ad-4220-8c9f-d81756009f0c": {
            value: new Int32Array([filtered_Angle]).buffer,
            notify: true,
          },
        },
      })

      console.log("Angle ", filtered_Angle, "Battery ", E.getBattery())
    },
    1,
  )
}

function get_yaw(a) {
  // Get gyroscope data and calculate yaw
  // Scale factor is (1/sensitivity@2000)*accelRate = (1/0.07)*52 = 742.857142856
  angle_Delta = a.gyro.z / scalingFactor
  if (Math.abs(angle_Delta) > 0.75) {
    raw_Angle -= angle_Delta
  }

  // Filter raw angle
  filtered_Angle = filtered_Angle * 0.75 + raw_Angle * 0.25
  if (filtered_Angle < 0) {
    raw_Angle = 0
    filtered_Angle = 0
  }

  return filtered_Angle
}

function check_Battery() {
  if (!lowBattery) {
    if (E.getBattery() < batteryLow) {
      batteryInterval = setInterval(low_Battery, 3000)
      lowBattery = true
    }
  }
}
function low_Battery() {
  digitalPulse(LED1, 1, 50)
  console.log("Low Battery")
}

function ble_Connected() {
  digitalPulse(LED3, 1, 100)
}
