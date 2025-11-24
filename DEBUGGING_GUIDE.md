# Debugging Guide for Cordova Android App

## 1. Chrome DevTools (WebView Debugging) 🌐

### Enable WebView Debugging
WebView debugging is already enabled in `MainActivity.java`. This allows you to debug JavaScript, HTML, and CSS using Chrome DevTools.

### Steps:
1. **Connect your device/emulator** via USB or ensure it's on the same network
2. **Open Chrome** on your computer
3. **Navigate to:** `chrome://inspect/#devices`
4. **Find your app** in the list (it will show as "WebView in com.dengage.cordova.example")
5. **Click "inspect"** to open DevTools

### What you can debug:
- JavaScript console logs
- Network requests
- DOM inspection
- CSS styling
- Breakpoints in JavaScript
- Performance profiling

---

## 2. Android Logcat (Native Android Logs) 📱

### Using ADB Command Line:

```bash
# View all logs
adb logcat

# Filter by tag (Dengage logs)
adb logcat | grep -i dengage

# Filter by package name
adb logcat | grep "com.dengage.cordova.example"

# Clear logs and show new ones
adb logcat -c && adb logcat

# Save logs to file
adb logcat > app_logs.txt

# Filter by log level (V=Verbose, D=Debug, I=Info, W=Warn, E=Error)
adb logcat *:E  # Only errors
adb logcat *:W  # Warnings and above
adb logcat *:D  # Debug and above
```

### Using Android Studio:
1. Open Android Studio
2. Open your project: `platforms/android/`
3. Go to **View → Tool Windows → Logcat**
4. Filter by package: `com.dengage.cordova.example`

### Common Log Tags to Monitor:
- `DengageCR` - Cordova plugin logs
- `Dengage` - SDK logs
- `CordovaWebView` - WebView logs
- `chromium` - Chrome WebView logs
- `SystemWebChromeClient` - Console logs from JavaScript

---

## 3. JavaScript Console Logging 🟨

### In your JavaScript code:
```javascript
// Regular console logs
console.log('Debug message');
console.error('Error message');
console.warn('Warning message');
console.info('Info message');

// View in Chrome DevTools console or logcat
```

### View JavaScript logs:
- **Chrome DevTools:** Open console tab
- **Logcat:** `adb logcat | grep "chromium"` or `adb logcat | grep "SystemWebChromeClient"`

---

## 4. Remote Debugging (USB Debugging) 🔌

### Enable USB Debugging on Device:
1. Go to **Settings → About Phone**
2. Tap **Build Number** 7 times to enable Developer Options
3. Go to **Settings → Developer Options**
4. Enable **USB Debugging**

### Connect and Debug:
```bash
# Check connected devices
adb devices

# If device not showing, restart adb
adb kill-server
adb start-server

# Forward port for debugging (if needed)
adb forward tcp:9222 localabstract:chrome_devtools_remote
```

---

## 5. Network Debugging 🌐

### Monitor Network Requests:

**Using Chrome DevTools:**
- Open DevTools → Network tab
- See all HTTP/HTTPS requests from your app

**Using ADB:**
```bash
# Monitor network traffic
adb shell tcpdump -i any -p -s 0 -w /sdcard/capture.pcap

# Pull the capture file
adb pull /sdcard/capture.pcap
```

---

## 6. Debugging Specific Issues 🐛

### Firebase/Dengage SDK Issues:
```bash
# Filter Dengage SDK logs
adb logcat | grep -i "dengage\|firebase"

# Filter Firebase token logs
adb logcat | grep -i "firebase.*token\|fcm"
```

### WebView Issues:
```bash
# WebView errors
adb logcat | grep -i "webview\|chromium"

# JavaScript errors
adb logcat | grep -i "javascript\|console"
```

### Permission Issues:
```bash
# Check app permissions
adb shell dumpsys package com.dengage.cordova.example | grep permission

# Check runtime permissions
adb shell pm list permissions -d -g | grep location
```

---

## 7. Debug Build Configuration 🔧

### Enable Debug Mode:
The app is already in debug mode. To verify:

```bash
# Check if app is debuggable
adb shell dumpsys package com.dengage.cordova.example | grep debuggable
```

### Build Debug APK:
```bash
cd dengage-cordova-example
cordova build android --debug
```

---

## 8. Common Debugging Commands 📋

```bash
# View app info
adb shell dumpsys package com.dengage.cordova.example

# Clear app data
adb shell pm clear com.dengage.cordova.example

# Reinstall app
adb uninstall com.dengage.cordova.example
adb install platforms/android/app/build/outputs/apk/debug/app-debug.apk

# View app logs in real-time
adb logcat -s DengageCR:D Dengage:D CordovaWebView:D *:S

# Take screenshot
adb shell screencap -p /sdcard/screenshot.png
adb pull /sdcard/screenshot.png

# Record screen
adb shell screenrecord /sdcard/demo.mp4
# Press Ctrl+C to stop, then:
adb pull /sdcard/demo.mp4
```

---

## 9. Debugging Tips 💡

1. **Use Chrome DevTools for JavaScript debugging** - Set breakpoints, inspect variables
2. **Use Logcat for native Android issues** - Check for crashes, exceptions
3. **Enable verbose logging** in your code for detailed information
4. **Use `console.log()` extensively** during development
5. **Check network tab** in Chrome DevTools for API call issues
6. **Monitor memory usage** in Chrome DevTools Performance tab

---

## 10. Quick Debug Checklist ✅

- [ ] USB Debugging enabled on device
- [ ] Device connected and recognized (`adb devices`)
- [ ] Chrome DevTools accessible (`chrome://inspect`)
- [ ] Logcat showing logs (`adb logcat`)
- [ ] JavaScript console visible in DevTools
- [ ] Network requests visible in DevTools Network tab

---

## Troubleshooting 🔧

### Chrome DevTools not showing app:
- Ensure WebView debugging is enabled (already done in MainActivity)
- Restart the app
- Check if device is connected: `adb devices`

### Logcat not showing logs:
- Check log level filters
- Try: `adb logcat -c` to clear and start fresh
- Ensure app is running

### Can't see JavaScript console:
- Open Chrome DevTools → Console tab
- Check if JavaScript errors are being logged
- Verify `console.log()` statements in your code

---

Happy Debugging! 🚀


