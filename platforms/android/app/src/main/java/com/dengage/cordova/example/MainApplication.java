package com.dengage.cordova.example;

import android.app.Application;
import com.google.firebase.FirebaseApp;
import com.dengage.cordova.dengagecr.DengageCRCoordinator;
import com.dengage.hms.DengageHmsManager;
import com.dengage.sdk.data.remote.api.DeviceConfigurationPreference;

public class MainApplication extends Application {
    
    // TODO: Replace with your Firebase Integration Key
    private static final String FIREBASE_INTEGRATION_KEY = "9MBNB5X2IWf8oBfxaNjs5kWcmObGwc8g6bmJcqS2rprtPSJgAThZL_s_l_n1nypZLOoQApPKMzfFMoJpU_s_l_BQk9YpJMk3mn05bpF3_p_l_1XjtNC1jvrEkEZ3D8h5VmUz0U4xmiI0ycs7_s_l_BJ20fOwTQsOq5OXRA_e_q__e_q_";
    // TODO: Replace with your Huawei Integration Key (optional, can be null)
    private static final String HUAWEI_INTEGRATION_KEY = null;
    
    @Override
    public void onCreate() {
        super.onCreate();
        
        // Initialize Firebase first
        FirebaseApp.initializeApp(this);
        
        // Initialize Dengage SDK
        DengageHmsManager dengageHmsManager = new DengageHmsManager();
        
        DengageCRCoordinator.getInstance().setupDengage(
            FIREBASE_INTEGRATION_KEY,
            HUAWEI_INTEGRATION_KEY,
            this,
            dengageHmsManager,
            DeviceConfigurationPreference.Google,
            false, // disableOpenWebUrl
            true,  // logEnabled
            true,  // enableGeoFence
            true   // developmentStatus
        );
    }
}

