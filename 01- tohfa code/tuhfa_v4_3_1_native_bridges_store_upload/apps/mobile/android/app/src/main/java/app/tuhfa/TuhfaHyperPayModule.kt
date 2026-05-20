
package app.tuhfa

import com.facebook.react.bridge.*

class TuhfaHyperPayModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
  override fun getName() = "TuhfaHyperPay"

  @ReactMethod
  fun startPayment(params: ReadableMap, promise: Promise){
    // TODO: Integrate HyperPay Android SDK: checkout id -> payment UI -> callback
    val res = Arguments.createMap()
    res.putString("status","INITIATED")
    res.putString("provider","hyperpay")
    res.putString("tx","tx_mock_android_hyperpay_456")
    promise.resolve(res)
  }
}
