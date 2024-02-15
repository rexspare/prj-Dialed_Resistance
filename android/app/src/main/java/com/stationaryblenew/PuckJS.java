package com.stationaryblenew;
import android.bluetooth.BluetoothDevice;
import android.bluetooth.BluetoothGatt;
import android.bluetooth.BluetoothGattCharacteristic;
import android.bluetooth.BluetoothGattService;
import android.content.Context;
import android.os.ParcelUuid;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import org.apache.commons.codec.binary.Base64;

import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.TimerTask;
import java.util.UUID;

import no.nordicsemi.android.ble.BleManager;
import no.nordicsemi.android.ble.PhyRequest;
import no.nordicsemi.android.ble.callback.DataReceivedCallback;
import no.nordicsemi.android.ble.callback.profile.ProfileDataCallback;
import no.nordicsemi.android.ble.data.Data;
import no.nordicsemi.android.support.v18.scanner.BluetoothLeScannerCompat;
import no.nordicsemi.android.support.v18.scanner.ScanCallback;
import no.nordicsemi.android.support.v18.scanner.ScanFilter;
import no.nordicsemi.android.support.v18.scanner.ScanResult;
import no.nordicsemi.android.support.v18.scanner.ScanSettings;


public class PuckJS extends ReactContextBaseJavaModule {
   PuckJS(ReactApplicationContext context) {
       super(context);
       this.context = context;
   }
    Context context;
    @Override
    public String getName() {
        return "PuckJS";
    }
    public static String rotationValue;
    public static Boolean connected = false;
    public static Promise resolve;
    private MyBleManager manager;
    BluetoothLeScannerCompat scanner = BluetoothLeScannerCompat.getScanner();
    private ScanCallback scanCallback = new ScanCallback() {
        @Override
        public void onBatchScanResults(final List<ScanResult> results) {
            Log.i("Device Found: ", results.size()+"");
            if(results.size()>0){
                scanner.stopScan(scanCallback);
                manager.connect(results.get(0).getDevice())
                        .timeout(100000)
                        .retry(3, 100)
                        .done(device -> Log.i("TAG", "Device initiated"))
                        .enqueue();
                connected = true;
                resolve.resolve(true);
            }
        }

        @Override
        public void onScanFailed(final int errorCode) {
            // should never be called
        }
    };
    private void scan(){
        ScanSettings settings = new ScanSettings.Builder()
                .setLegacy(false)
                .setScanMode(ScanSettings.SCAN_MODE_LOW_LATENCY)
                .setReportDelay(1000)
                .setUseHardwareBatchingIfSupported(true)
                .build();
        List<ScanFilter> filters = new ArrayList<>();
        filters.add(new ScanFilter.Builder().setServiceUuid(ParcelUuid.fromString("6e400001-b5a3-f393-e0a9-e50e24dcca9e")).build());
        scanner.startScan(filters, settings, scanCallback);
    }
    @ReactMethod
    public void connect(Integer timeout ,Promise promise) {
        new java.util.Timer().schedule(new TimerTask() {
            @Override
            public void run() {
                scanner.stopScan(scanCallback);
            }
        }, timeout);
        if(connected){
            promise.resolve(true);
        }
        scanner.stopScan(scanCallback);
        manager = new MyBleManager(context);
        try {
            resolve = promise;
            scan();
        } catch(Exception e) {
            promise.reject("Couldn't Connect", e);
        }

    }
    @ReactMethod
    public void disconnect(Promise promise) {
        try {
            connected = false;
//            scanner.stopScan(scanCallback);
//            manager = new MyBleManager(context);
            manager.close();
            promise.resolve(true);
        } catch(Exception e) {
            promise.reject("Couldn't Connect", e);
        }
    }
    @ReactMethod
    public void GetValue(Promise promise) {
        Log.d("Get value", "running");
        if(connected){
            promise.resolve(rotationValue);
        }else{
            promise.reject("Not connected","Not connected");
        }
    }
}
class MyBleManager extends BleManager {
    final static UUID SERVICE_UUID = UUID.fromString("f8b23a4d-89ad-4220-8c9f-d81756009f0c");
    final static UUID FIRST_CHAR = UUID.fromString("f8b23a4d-89ad-4220-8c9f-d81756009f0c");

    // Client characteristics
    private BluetoothGattCharacteristic firstCharacteristic;

    MyBleManager(@NonNull final Context context) {
        super(context);
    }

    @NonNull
    @Override
    protected BleManagerGattCallback getGattCallback() {
        return new MyManagerGattCallback();
    }

    /**
     * BluetoothGatt callbacks object.
     */
    private class MyManagerGattCallback extends BleManagerGattCallback {

        @Override
        public boolean isRequiredServiceSupported(@NonNull final BluetoothGatt gatt) {
            final BluetoothGattService service = gatt.getService(SERVICE_UUID);

            if (service != null) {
                firstCharacteristic = service.getCharacteristic(FIRST_CHAR);
                final int properties = firstCharacteristic.getProperties();
                Log.d("props",properties+"");

            }

            // Return true if all required services have been found
            return true;
        }

        @Override
        protected void initialize() {
            beginAtomicRequestQueue()
                    .add(enableNotifications(firstCharacteristic))
                    .done(device -> Log.d("Success", "Target initialized"))
                    .enqueue();
            setNotificationCallback(firstCharacteristic).with(new ProfileDataCallback() {
                @Override
                public void onDataReceived(@NonNull BluetoothDevice device, @NonNull Data data) {
                    Log.d("my data", data.getIntValue(Data.FORMAT_SINT32,0).toString());
                    PuckJS.rotationValue = data.getIntValue(Data.FORMAT_SINT32,0).toString();
                    // Some validation?

                    if (data.size() != 1) {
                        onInvalidDataReceived(device, data);
                        return;
                    }
                }
            });
        }
//        @Override
//        protected void onDeviceDisconnecting(){
//            Log.d("Disconnecting", "true");
//            disconnect();
//            disableNotifications(firstCharacteristic);
//            removeNotificationCallback(firstCharacteristic);
//            firstCharacteristic = null;
//        }
        @Override
        protected void onDeviceDisconnected() {
            // Device disconnected. Release your references here.
            Log.d("Disconnected", "true");
//            disableNotifications(firstCharacteristic);
//            removeNotificationCallback(firstCharacteristic);
            PuckJS.connected = false;
            firstCharacteristic = null;
        }
    }
}
