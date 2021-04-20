package com.dengage.cordova;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import com.dengage.sdk.NotificationReceiver;

public class MyReceiver extends NotificationReceiver {
    @Override
    protected void onActionClick(Context context, Intent intent) {
        Bundle extras = intent.getExtras();
        if (extras != null) {
            String actionId = extras.getString("id");
            int notificationId = extras.getInt("notificationId");
            String targetUrl = extras.getString("targetUrl");

            Log.d("DenPush", actionId + " is clicked");
        }

        // Remove if you prefer to handle targetUrl which is actually correspond a deeplink.
        super.onActionClick(context, intent);
    }

}
