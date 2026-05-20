
// HyperPayBridgeModule.kt — sample for OPPWA Android SDK
package com.tuhfa

import com.facebook.react.bridge.*
import android.app.Activity
import android.content.Intent

class HyperPayBridgeModule(reactContext: ReactApplicationContext): ReactContextBaseJavaModule(reactContext) {
  override fun getName() = "HyperPayBridge"

  @ReactMethod
  fun start(checkoutId: String, promise: Promise){
    val activity: Activity? = currentActivity
    if (activity == null){
      promise.reject("no_activity", "Activity is null"); return
    }
    try {
      // TODO: Start OPPWAMobile CheckoutActivity with given checkoutId
      val map = Arguments.createMap()
      map.putString("status", "started")
      promise.resolve(map)
    }catch(e: Exception){
      promise.reject("hp_error", e)
    }
  }
}
