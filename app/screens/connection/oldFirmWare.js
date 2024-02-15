var angle = 137.62197611579
var magRate = 80
var batteryInterval = ""
var toggle = true
var v = {
  Vec3: function (a, c, d) {
    "object" == typeof a
      ? this.set(a.x, a.y, a.z)
      : "number" == typeof a
      ? this.set(a, c, d)
      : this.set(0, 0, 0)
  },
  runing: false,
  cal: function (f) {
    var vMin = new v.Vec3()
    var vMax = new v.Vec3()
    var sMax = 0
    var sMin = 0
    // check for and use stored values
    if (!f) {
      var a = eval(require("Storage").read("cal"))
      if (a) {
        v.cal.x = a.x
        cal.y = a.y
        cal.z = a.z
        return
      }
    }
    console.log(
      "Rotate the puck in all directions \n until the are no red flashes \n then press button",
    )
    v.runing = true
    Puck.magOn(10)
    Puck.on("mag", function (xyz) {
      if (!v.runing) return
      vMin = vMin.min(xyz)
      vMax = vMax.max(xyz)
      if (sMax < vMax.mag() || sMin > vMin.mag()) {
        if (!v.runing) return
        sMin = vMin.mag()
        sMax = vMax.mag()
        digitalPulse(LED1, 1, 100)
      } else {
        digitalPulse(LED2, 1, 50)
      }
    })
    // wait for a button press to stop Calibrating
    setWatch(
      function (e) {
        console.log("Calibrating completed")
        v.zero = new v.Vec3((vMin.x + vMax.x) / 2, (vMin.y + vMax.y) / 2, (vMin.z + vMax.z) / 2)
        require("Storage").write("cal", v.zero)
        v.runing = false
      },
      BTN,
      { repeat: false, edge: "rising", debounce: 50 },
    )
  },
  ajust: function (vec) {
    v.aj = new v.Vec3(vec).sub(v.zero)
    // console.log("vec ", vec);
    //console.log("v.aj ", v.aj);
    v.h = (Math.atan2(v.aj.y, v.aj.x) * 180) / Math.PI
    if (v.h > 360) {
      v.h = v.h - 360
    }
    if (v.h < 0) {
      v.h = v.h + 360
    }
    return v
  },
  zero: { x: -99, y: 169, z: 3975 },
  aj: { x: -483, y: 429, z: -1374 },
  h: 138.38855699072,
}
var magCal = v
Puck.on("mag", function (xyz) {
  if (!v.runing) return
  vMin = vMin.min(xyz)
  vMax = vMax.max(xyz)
  if (sMax < vMax.mag() || sMin > vMin.mag()) {
    if (!v.runing) return
    sMin = vMin.mag()
    sMax = vMax.mag()
    digitalPulse(LED1, 1, 100)
  } else {
    digitalPulse(LED2, 1, 50)
  }
})
Puck.on("mag", function (m) {
  if (magCal.runing) return
  var mC = magCal.ajust(m)
  if (Math.abs(angle - mC.h) > 355) {
    angle = mC.h
  } else {
    angle = angle * 0.9 + mC.h * 0.1
  }
  NRF.updateServices({
    "f8b23a4d-89ad-4220-8c9f-d81756009f0c": {
      "f8b23a4d-89ad-4220-8c9f-d81756009f0c": {
        value: new Int32Array([angle]).buffer,
        notify: true,
      },
    },
  })
  digitalPulse(LED2, 1, 50)
  console.log("Angle ", angle, "battery ", Puck.getBatteryPercentage())
})
function onInit() {
  NRF.on("connect", function () {
    Puck.magOn(magRate)
    digitalPulse(LED2, 1, 100)
  })
  NRF.on("disconnect", function () {
    Puck.magOff()
    digitalPulse(LED1, 1, 100)
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
    // Magnetometer service
    "f8b23a4d-89ad-4220-8c9f-d81756009f0c": {
      "f8b23a4d-89ad-4220-8c9f-d81756009f0c": {
        description: "Puck magnetometer",
        notify: true,
        readable: true,
        value: new Int32Array([0]).buffer,
        writable: true,
        onWrite: function (evt) {
          // pulse the blue LED if we got a new sample rate
          digitalPulse(LED3, 1, 100)
          var d = evt.data && evt.data[0]
          if (d === 0) {
            Puck.magOff()
          }
          // lazy mode on: only integer sample rates work
          // Sample rates power consumption:
          // 80 Hz - 900uA
          // 40 Hz - 550uA
          // 20 Hz - 275uA
          // 10 Hz - 137uA
          // 5 Hz - 69uA
          if ([80, 40, 20, 10, 5].indexOf(d) >= 0) {
            Puck.magOn(d)
            magRate = d
          }
        },
      },
    },
  })
  Puck.on(
    "mag",
    function (m) {
      if (magCal.runing) return
      var mC = magCal.ajust(m)
      if (Math.abs(angle - mC.h) > 355) {
        angle = mC.h
      } else {
        angle = angle * 0.9 + mC.h * 0.1
      }
      NRF.updateServices({
        "f8b23a4d-89ad-4220-8c9f-d81756009f0c": {
          "f8b23a4d-89ad-4220-8c9f-d81756009f0c": {
            value: new Int32Array([angle]).buffer,
            notify: true,
          },
        },
      })
      digitalPulse(LED2, 1, 50)
      console.log("Angle ", angle, "battery ", Puck.getBatteryPercentage())
    },
    1,
  )
  setWatch(
    function () {
      if (toggle) {
        Puck.magOff()
        toggle = false
        console.log("Magnetometer Off!")
      } else {
        Puck.magOn(magRate)
        toggle = true
        console.log("Magnetometer On!")
      }
    },
    BTN,
    { edge: "rising", debounce: 50, repeat: true },
  )
}
NRF.on("connect", function () {
  Puck.magOn(magRate)
  digitalPulse(LED2, 1, 100)
})
NRF.on("disconnect", function () {
  Puck.magOff()
  digitalPulse(LED1, 1, 100)
})
setWatch(
  function () {
    if (toggle) {
      Puck.magOff()
      toggle = false
      console.log("Magnetometer Off!")
    } else {
      Puck.magOn(magRate)
      toggle = true
      console.log("Magnetometer On!")
    }
  },
  D0,
  { repeat: true, edge: "rising", debounce: 49.99923706054 },
)
digitalWrite(D8, 0)
pinMode(D14, "input_pullup", true)
pinMode(D15, "input_pullup", true)
digitalWrite(D18, 1)
pinMode(D19, "input_pullup", true)
pinMode(D20, "input_pullup", true)
digitalWrite(D27, 0)
NRF.setServices(
  {
    10777: {
      10777: { notify: true, readable: true, value: [87] },
    },
    "f8b23a4d-89ad-4220-8c9f-d81756009f0c": {
      "f8b23a4d-89ad-4220-8c9f-d81756009f0c": {
        description: "Puck magnetometer",
        notify: true,
        readable: true,
        value: new ArrayBuffer(4),
        writable: true,
        onWrite: function (evt) {
          digitalPulse(LED3, 1, 100)
          var d = evt.data && evt.data[0]
          if (d === 0) {
            Puck.magOff()
          }
          // lazy mode on: only integer sample rates work
          // Sample rates power consumption:
          // 80 Hz - 900uA
          // 40 Hz - 550uA
          // 20 Hz - 275uA
          // 10 Hz - 137uA
          // 5 Hz - 69uA
          if ([80, 40, 20, 10, 5].indexOf(d) >= 0) {
            Puck.magOn(d)
            magRate = d
          }
        },
      },
    },
  },
  undefined,
)
// Code saved with E.setBootCode
Modules.addCached("Vec3", function () {
  function b(a, c, d) {
    "object" == typeof a
      ? this.set(a.x, a.y, a.z)
      : "number" == typeof a
      ? this.set(a, c, d)
      : this.set(0, 0, 0)
  }
  b.prototype.set = function (a, c, d) {
    this.x = +a
    this.y = +c
    this.z = +d
  }
  b.prototype.add = function (a) {
    return new b(this.x + a.x, this.y + a.y, this.z + a.z)
  }
  b.prototype.sub = function (a) {
    return new b(this.x - a.x, this.y - a.y, this.z - a.z)
  }
  b.prototype.mul = function (a) {
    return new b(this.x * a, this.y * a, this.z * a)
  }
  b.prototype.dot = function (a) {
    return this.x * a.x + this.y * a.y + this.z * a.z
  }
  b.prototype.cross = function (a) {
    return new b(
      this.y * a.z - this.z * a.y,
      this.z * a.x - this.x * a.z,
      this.x * a.y - this.y * a.x,
    )
  }
  b.prototype.mag = function () {
    return Math.sqrt(this.dot(this))
  }
  b.prototype.min = function (a) {
    return new b(Math.min(this.x, a.x), Math.min(this.y, a.y), Math.min(this.z, a.z))
  }
  b.prototype.max = function (a) {
    return new b(Math.max(this.x, a.x), Math.max(this.y, a.y), Math.max(this.z, a.z))
  }
  exports = b
})
var angle = 0
magRate = 80
batteryInterval = ""
toggle = true
var v = {}
v.Vec3 = require("Vec3")
v.runing = false
// Calibrate procedure
v.cal = function (f) {
  var vMin = new v.Vec3()
  var vMax = new v.Vec3()
  var sMax = 0
  var sMin = 0
  // check for and use stored values
  if (!f) {
    var a = eval(require("Storage").read("cal"))
    if (a) {
      v.cal.x = a.x
      cal.y = a.y
      cal.z = a.z
      return
    }
  }
  console.log(
    "Rotate the puck in all directions \n until the are no red flashes \n then press button",
  )
  v.runing = true
  Puck.magOn(10)
  Puck.on("mag", function (xyz) {
    if (!v.runing) return
    vMin = vMin.min(xyz)
    vMax = vMax.max(xyz)
    if (sMax < vMax.mag() || sMin > vMin.mag()) {
      if (!v.runing) return
      sMin = vMin.mag()
      sMax = vMax.mag()
      digitalPulse(LED1, 1, 100)
    } else {
      digitalPulse(LED2, 1, 50)
    }
  })
  // wait for a button press to stop Calibrating
  setWatch(
    function (e) {
      console.log("Calibrating completed")
      v.zero = new v.Vec3((vMin.x + vMax.x) / 2, (vMin.y + vMax.y) / 2, (vMin.z + vMax.z) / 2)
      require("Storage").write("cal", v.zero)
      v.runing = false
    },
    BTN,
    { repeat: false, edge: "rising", debounce: 50 },
  )
}
// Claibrate a raw mag value
v.ajust = function (vec) {
  //console.log("v.zero ", v.zero);
  v.aj = new v.Vec3(vec).sub(v.zero)
  // console.log("vec ", vec);
  //console.log("v.aj ", v.aj);
  v.h = (Math.atan2(v.aj.y, v.aj.x) * 180) / Math.PI
  if (v.h > 360) {
    v.h = v.h - 360
  }
  if (v.h < 0) {
    v.h = v.h + 360
  }
  return v
}
var magCal = v
// force re-calibration (false will use the last stored calibration if available)
magCal.cal(true)
function onInit() {
  // on connect / disconnect blink the green / red LED turn on / off the magnetometer
  NRF.on("connect", function () {
    Puck.magOn(magRate)
    digitalPulse(LED2, 1, 100)
  })
  NRF.on("disconnect", function () {
    Puck.magOff()
    digitalPulse(LED1, 1, 100)
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
    // Magnetometer service
    "f8b23a4d-89ad-4220-8c9f-d81756009f0c": {
      "f8b23a4d-89ad-4220-8c9f-d81756009f0c": {
        description: "Puck magnetometer",
        notify: true,
        readable: true,
        value: new Int32Array([0]).buffer,
        writable: true,
        onWrite: function (evt) {
          // pulse the blue LED if we got a new sample rate
          digitalPulse(LED3, 1, 100)
          var d = evt.data && evt.data[0]
          if (d === 0) {
            Puck.magOff()
          }
          // lazy mode on: only integer sample rates work
          // Sample rates power consumption:
          // 80 Hz - 900uA
          // 40 Hz - 550uA
          // 20 Hz - 275uA
          // 10 Hz - 137uA
          // 5 Hz - 69uA
          if ([80, 40, 20, 10, 5].indexOf(d) >= 0) {
            Puck.magOn(d)
            magRate = d
          }
        },
      },
    },
  })
  Puck.on(
    "mag",
    function (m) {
      if (magCal.runing) return
      var mC = magCal.ajust(m)
      if (Math.abs(angle - mC.h) > 355) {
        angle = mC.h
      } else {
        angle = angle * 0.9 + mC.h * 0.1
      }
      NRF.updateServices({
        "f8b23a4d-89ad-4220-8c9f-d81756009f0c": {
          "f8b23a4d-89ad-4220-8c9f-d81756009f0c": {
            value: new Int32Array([angle]).buffer,
            notify: true,
          },
        },
      })
      digitalPulse(LED2, 1, 50)
      console.log("Angle ", angle, "battery ", Puck.getBatteryPercentage())
    },
    1,
  )
  setWatch(
    function () {
      if (toggle) {
        Puck.magOff()
        toggle = false
        console.log("Magnetometer Off!")
      } else {
        Puck.magOn(magRate)
        toggle = true
        console.log("Magnetometer On!")
      }
    },
    BTN,
    { edge: "rising", debounce: 50, repeat: true },
  )
}
