
// TapBridgeModule.kt — sample for goSell Android/AndroidX SDK
// Copy to android/app/src/main/java/<your/package>/ after `expo prebuild` and register in a Package.
package com.tuhfa

import com.facebook.react.bridge.*
import android.app.Activity
import android.content.Intent

class TapBridgeModule(reactContext: ReactApplicationContext): ReactContextBaseJavaModule(reactContext) {
  override fun getName() = "TapBridge"

  @ReactMethod
  fun pay(amountSAR: Double, desc: String, promise: Promise){
    val activity: Activity? = currentActivity
    if (activity == null) {
      promise.reject("no_activity", "Activity is null")
      return
    }
    try {
      // TODO: Initialize Tap SDK and start payment sheet Activity
      // For now, return a placeholder
      val map = Arguments.createMap()
      map.putString("status", "started")
      promise.resolve(map)
    } catch (e: Exception){
      promise.reject("tap_error", e)
    }
  }
}
