
// TapBridge.swift — sample RCTBridgeModule for goSell SDK
// Place this under ios/ after `expo prebuild`, add to your Xcode project target, and ensure pods installed.
// Requires: pod 'goSellSDK' (Tap), Apple Pay merchant setup (CSR/CER), and proper entitlements.

import Foundation
import React
import goSellSDK

@objc(TapBridge)
class TapBridge: NSObject, RCTBridgeModule {
  static func moduleName() -> String! { return "TapBridge" }
  static func requiresMainQueueSetup() -> Bool { return true }

  @objc(pay:desc:resolver:rejecter:)
  func pay(amount: NSNumber, desc: NSString, resolver: @escaping RCTPromiseResolveBlock, rejecter: @escaping RCTPromiseRejectBlock) {
    DispatchQueue.main.async {
      // Example: present Tap goSell checkout with minimal config
      let vc = UIApplication.shared.keyWindow?.rootViewController
      let amountDecimal = NSDecimalNumber(value: amount.doubleValue)
      let transaction = TransactionMode.purchase
      let currency = "SAR"
      let tapAmount = Amount(with: amountDecimal, currency: currency)

      let config = Process.shared
      config.delegate = self
      config.dataSource = self
      // Setup tap config (merchant, taxes, shipping, etc.) here...

      if let controller = vc {
        Process.shared.presentPaymentSheet(on: controller, animated: true)
        resolver(["status":"presented"])
      } else {
        rejecter("no_root", "Root VC not found", nil)
      }
    }
  }
}

extension TapBridge: ProcessDataSource, ProcessDelegate {
  func paymentOptions(for process: Process) -> PaymentOptions {
    return .all
  }
  func process(_ process: Process, didFinish payment: TapSDKResult) {
    // Map result to JS
    switch payment {
    case .completed(let charge):
      sendEvent(status: "success", id: charge.identifier ?? "")
    case .failed(let error, _):
      sendEvent(status: "failed", id: "", message: error.localizedDescription)
    default:
      sendEvent(status: "canceled", id: "")
    }
  }
  private func sendEvent(status: String, id: String, message: String? = nil){
    // You can forward events via NotificationCenter and listen in JS
  }
}
