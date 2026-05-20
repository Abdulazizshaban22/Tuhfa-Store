
package app.tuhfa

import com.facebook.react.bridge.*

class TuhfaTapModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
  override fun getName() = "TuhfaTap"

  @ReactMethod
  fun startPayment(params: ReadableMap, promise: Promise){
    // TODO: Integrate Tap Android SDK: initialize, start payment sheet (Apple Pay/mada where supported)
    val res = Arguments.createMap()
    res.putString("status","INITIATED")
    res.putString("provider","tap")
    res.putString("tx","tx_mock_android_tap_123")
    promise.resolve(res)
  }
}
