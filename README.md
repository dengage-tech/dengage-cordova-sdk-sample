# Dengage Cordova Example App

This is a sample Cordova application demonstrating the usage of the Dengage Cordova SDK. The app follows the same structure and functionality as the other Dengage SDK example.

## Features

The app includes the following screens and functionality:

1. **Home Screen** - Main navigation menu
2. **Ask Notifications** - Request push notification permissions
3. **Device Info** - Display device information, integration key, device ID, contact key, token, SDK version, etc.
4. **Change Contact Key** - Set and update contact key and user permission
5. **Inbox Messages** - View, delete, and mark inbox messages as clicked
6. **In App Message** - Configure in-app messages with device info and navigation
7. **Real Time In App Message** - Configure and show real-time in-app messages with filters
8. **Real Time In App Filters** - Access event history and cart management
9. **Geofence** - Request location permissions for geofencing
10. **InApp Inline** - Display inline in-app messages
11. **App Story** - Display app stories
12. **Event History** - Send custom events based on SDK parameters
13. **Cart** - Manage shopping cart items

## Setup Instructions

### Prerequisites

- Node.js and npm installed
- Cordova CLI installed (`npm install -g cordova`)
- Android Studio (for Android development)
- Xcode (for iOS development)

### Installation

1. Navigate to the project directory:
```bash
cd dengage-cordova-example
```

2. The plugin should already be installed. If not, install it:
```bash
cordova plugin add ../dengage-cordova-sdk
```

### Configuration

#### Android Configuration

1. Open `platforms/android/app/src/main/java/com/dengage/cordova/example/MainApplication.java`
2. Replace `YOUR_FIREBASE_INTEGRATION_KEY_HERE` with your actual Firebase Integration Key
3. (Optional) Replace the Huawei Integration Key if you're using Huawei services

#### iOS Configuration

1. Open `platforms/ios/DengageCordovaExample/AppDelegate.m`
2. Replace `YOUR_IOS_INTEGRATION_KEY_HERE` with your actual iOS Integration Key
3. Update the `appGroupsKey` if you're using App Groups for notification extensions

### Building and Running

#### Android

```bash
cordova build android
cordova run android
```

#### iOS

```bash
cd platforms/ios
pod install
cd ../..
cordova build ios
cordova run ios
```

## Project Structure

```
dengage-cordova-example/
├── www/
│   ├── index.html          # Main HTML file with all screens
│   ├── css/
│   │   └── index.css       
│   └── js/
│       ├── index.js       # Main entry point
│       ├── navigation.js   # Navigation logic
│       ├── dengage-init.js # Dengage SDK initialization
│       └── screens/       # Screen-specific JavaScript files
│           ├── home.js
│           ├── device-info.js
│           ├── contact-key.js
│           ├── inbox-messages.js
│           ├── in-app-message.js
│           ├── rt-in-app-message.js
│           ├── geofence.js
│           ├── in-app-inline.js
│           ├── app-story.js
│           ├── event-history.js
│           └── cart.js
├── platforms/
│   ├── android/
│   │   └── app/src/main/java/com/dengage/cordova/example/
│   │       └── MainApplication.java  # Android initialization
│   └── ios/
│       └── DengageCordovaExample/
│           ├── AppDelegate.h        # iOS AppDelegate header
│           └── AppDelegate.m        # iOS initialization
└── config.xml
```

## Initialization

The Dengage SDK is initialized in platform-specific files:

- **Android**: `MainApplication.java` - Initializes Dengage in the `onCreate()` method
- **iOS**: `AppDelegate.m` - Initializes Dengage in `didFinishLaunchingWithOptions:`

Both follow the same pattern as the other SDK example, with similar configuration options:
- Integration keys
- Logging enabled
- Geofence enabled
- Development status
- Notification permissions

## Notes

- The app uses the same Dengage Cordova plugin as the main SDK
- All screens and functionality mirror the other sample apps
- In-app inline views and app stories require native view integration (placeholders are provided)
- Make sure to add your integration keys before building the app

=

