
package com.stationaryblenew;

import android.annotation.SuppressLint;
import android.provider.Settings;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;


import android.app.PictureInPictureParams;
import android.util.Log;
import android.util.Rational;

import androidx.annotation.NonNull;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.modules.core.DeviceEventManagerModule;


public class PIPMode extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;
    private static DeviceEventManagerModule.RCTDeviceEventEmitter eventEmitter = null;

    PIPMode(ReactApplicationContext context) {
       super(context);
        reactContext = context;
    }

    @NonNull
    @Override
    public String getName() {
        return "PIPMode";
    }

    // @Override
    // public void onPictureInPictureModeChanged (boolean isInPictureInPictureMode, android.content.res.Configuration newConfig) {
    //     super.onPictureInPictureModeChanged(isInPictureInPictureMode, newConfig);
    //     reactContext
    //     .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("PIP_MODE_CHANGE", isInPictureInPictureMode);
    // }

    @ReactMethod
    public void enterPIPMode(Promise response) {
    if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
        int ratWidth = 9;
        int ratHeight = 16;

        Rational ratio
            = new Rational(ratWidth, ratHeight);
        PictureInPictureParams.Builder
            pip_Builder
            = null;

        pip_Builder = new PictureInPictureParams
            .Builder();
        pip_Builder.setAspectRatio(ratio).build();
        reactContext.getCurrentActivity().enterPictureInPictureMode(pip_Builder.build());
    }
    }

    // public void pipModeChange (boolean isInPictureInPictureMode) {
    //     reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("PIP_MODE_CHANGE", isInPictureInPictureMode);
    // }

    @ReactMethod
    public void sayHello(Promise response) {
        response.resolve("Hello");
    }


    @ReactMethod
    public void addListener(String eventName) {
    // Set up any upstream listeners or background tasks as necessary
    }
}