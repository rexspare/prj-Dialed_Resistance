package com.stationaryblenew;
import android.content.Context;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.wahoofitness.connector.HardwareConnector;
import com.wahoofitness.connector.HardwareConnectorEnums;
import com.wahoofitness.connector.HardwareConnectorTypes;
import com.wahoofitness.connector.capabilities.Capability;
import com.wahoofitness.connector.capabilities.CrankRevs;
import com.wahoofitness.connector.capabilities.Heartrate;
import com.wahoofitness.connector.conn.connections.SensorConnection;
import com.wahoofitness.connector.conn.connections.params.ConnectionParams;
import com.wahoofitness.connector.listeners.discovery.DiscoveryListener;

public class WahooHR extends ReactContextBaseJavaModule {
    WahooHR(ReactApplicationContext context) {
        super(context);
        this.context = context;
    }
    Context context;
    Boolean connected = false;
    public static Promise resolve;
    private HardwareConnector mHardwareConnector;
    private SensorConnection mSensorConnection;
    private final HardwareConnector.Listener mHardwareConnectorListener = new HardwareConnector.Listener() {
        @Override
        public void onHardwareConnectorStateChanged(@NonNull HardwareConnectorTypes.NetworkType networkType, @NonNull HardwareConnectorEnums.HardwareConnectorState hardwareConnectorState) {
            Log.d("onHardwareStateChanged:", hardwareConnectorState.toString());
//            if(!hardwareConnectorState.ready()) {
//                resolve.reject("unsupported","hardware not supported!");
//            }
        }

        @Override
        public void onFirmwareUpdateRequired(@NonNull SensorConnection sensorConnection, @NonNull String s, @NonNull String s1) {

        }
    };
    void getHeartRateData(Promise promise) {
        if (mSensorConnection != null){
            Heartrate heartrate = (Heartrate) mSensorConnection.getCurrentCapability(Capability.CapabilityType.Heartrate);
            if(heartrate!=null){
                Log.d("data", "got it!");
                promise.resolve(String.valueOf(heartrate.getHeartrateData().getHeartrate().asEventsPerMinute()));
//                return String.valueOf(heartrate.getHeartrateData().getHeartrate().asEventsPerMinute());
            }else{
                Log.d("data", "no heartRate!");
                // The sensor connection does not currently support the heartrate capability
                promise.reject("No heart rate","Check that electrodes are making contact!");
//                return "null";
            }
        }else{
            // Sensor not connected
            promise.reject("No Sensor","Please connect to sensor first!");
//            return null;
        }
    }
    void getCrankData(Promise promise){
        if (mSensorConnection != null){
            CrankRevs crankRevs = (CrankRevs) mSensorConnection.getCurrentCapability(Capability.CapabilityType.CrankRevs);
            if(crankRevs!=null){
                promise.resolve(String.valueOf(crankRevs.getCrankRevsData().getCrankSpeed().asRpm()));
            }else{
                // The sensor connection does not currently support the crankrevs capability
                promise.reject("No cadence","Check that sensor is spinning!");
            }
        }else{
            // Sensor not connected
            promise.reject("No Sensor","Please connect to sensor first!");
        }
    }
    private final Heartrate.Listener mHeartRateListener = new Heartrate.Listener() {
        @Override
        public void onHeartrateData(@NonNull Heartrate.Data data) {
            Log.d("heartRateData",String.valueOf(data.getHeartrate().asEventsPerMinute()));
        }

        @Override
        public void onHeartrateDataReset() {

        }
    };
    private final SensorConnection.Listener SensorListener = new SensorConnection.Listener() {
        @Override
        public void onNewCapabilityDetected(@NonNull SensorConnection sensorConnection, @NonNull Capability.CapabilityType capabilityType) {
            Log.d("new capability", capabilityType.name().toString());
            if( capabilityType.name().toString() == "Connection"){
                connected = true;
                resolve.resolve(true);
            }
        }

        @Override
        public void onSensorConnectionStateChanged(@NonNull SensorConnection sensorConnection, @NonNull HardwareConnectorEnums.SensorConnectionState sensorConnectionState) {
            mSensorConnection.getCurrentCapabilities();
        }

        @Override
        public void onSensorConnectionError(@NonNull SensorConnection sensorConnection, @NonNull HardwareConnectorEnums.SensorConnectionError sensorConnectionError) {

        }
    };
    private final DiscoveryListener mHardwareConnectorDiscovery = new DiscoveryListener() {

        @Override
        public void onDeviceDiscovered(@NonNull ConnectionParams connectionParams) {
            Log.d("found::",connectionParams.getSensorType().toString());
            Log.d("found:::",connectionParams.getName());
//            if(false){
//            if(connectionParams.getSensorType().toString() == "HEARTRATE"){
            if(connectionParams.getName().contains("TICKR X")){
                mSensorConnection = mHardwareConnector.requestSensorConnection(connectionParams,SensorListener);
            }
//            mHardwareConnector.stopDiscovery();

        }

        @Override
        public void onDiscoveredDeviceLost(@NonNull ConnectionParams connectionParams) {

        }

        @Override
        public void onDiscoveredDeviceRssiChanged(@NonNull ConnectionParams connectionParams, int i) {

        }
    };
    @Override
    public String getName() {
        return "WahooHR";
    }
    @ReactMethod
    public void connect(Promise promise) {
        try {
            mHardwareConnector = new HardwareConnector(context, mHardwareConnectorListener);
            resolve = promise;
            mHardwareConnector.startDiscovery(mHardwareConnectorDiscovery);
        } catch(Exception e) {
            promise.reject("Couldn't Connect", e);
        }
    }
    @ReactMethod
    public void GetHeartRateValue(Promise promise) {
        Log.d("Get value", "running");
        mSensorConnection.getCurrentCapabilities();
        if(connected){
            getHeartRateData(promise);
//            promise.resolve(data);
        }else{
            promise.reject("Not connected","Not connected");
        }
    }
    @ReactMethod
    public void disconnect(Promise promise) {
        try {
            connected = false;
//            scanner.stopScan(scanCallback);
//            manager = new MyBleManager(context);
            mHardwareConnector.shutdown();
            promise.resolve(true);
        } catch(Exception e) {
            promise.reject("Couldn't Connect", e);
        }
    }
    @ReactMethod
    public void GetCadenceValue(Promise promise) {
        Log.d("Get value", "running");
        mSensorConnection.getCurrentCapabilities();
        if(connected){
            getCrankData(promise);
//            promise.resolve(data);
        }else{
            promise.reject("Not connected","Not connected");
        }
    }
}