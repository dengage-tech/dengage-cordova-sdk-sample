package com.dengage.cordova.example;

import android.app.Application;
import com.google.firebase.FirebaseApp;
import com.dengage.cordova.dengagecr.DengageCRCoordinator;
import com.dengage.hms.DengageHmsManager;
import com.dengage.sdk.data.remote.api.DeviceConfigurationPreference;

public class MainApplication extends Application {
    
    // TODO: Replace with your Firebase Integration Key
    private static final String FIREBASE_INTEGRATION_KEY = "kcBguWOJitZ6tjtBixNnNIEEPLhYYcwATTMRO8ox4etzfV9Dx1gngcKVC9CK_p_l_fVP1C0s4ABhngJLAqpHjzsJAlJLvEJ2cTjPxdfjk0lljaW01mMsCSJiJXpAM27v_p_l_i8v5LiIlE3pLj38tPjXD0Zm_s_l_A_e_q__e_q_";
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

