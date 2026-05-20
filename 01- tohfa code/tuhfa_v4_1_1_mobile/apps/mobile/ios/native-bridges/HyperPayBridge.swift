
// HyperPayBridge.swift — sample for OPPWAMobile (HyperPay) iOS SDK
// Place under ios/ after `expo prebuild` and link OPPWAMobile.xcframework to the target.

import Foundation
import React
import OPPWAMobile

@objc(HyperPayBridge)
class HyperPayBridge: NSObject, RCTBridgeModule {
  static func moduleName() -> String! { return "HyperPayBridge" }
  static func requiresMainQueueSetup() -> Bool { return true }

  private var provider: OPPPaymentProvider?

  @objc(start:resolver:rejecter:)
  func start(checkoutId: NSString, resolver: @escaping RCTPromiseResolveBlock, rejecter: @escaping RCTPromiseRejectBlock){
    DispatchQueue.main.async {
      self.provider = OPPPaymentProvider(mode: .test) // change to .live on production
      let checkoutProvider = OPPCheckoutProvider(paymentProvider: self.provider!, checkoutID: checkoutId as String)
      if let root = UIApplication.shared.keyWindow?.rootViewController {
        checkoutProvider.presentCheckout(forSubmittingTransactionCompletionHandler: { (transaction, error) in
          if let error = error {
            rejecter("hp_error", error.localizedDescription, error)
          } else if let trans = transaction {
            resolver(["status":"submitted", "type": trans.type.rawValue])
          } else {
            resolver(["status":"canceled"])
          }
        }, from: root)
      } else {
        rejecter("no_root", "Root VC not found", nil)
      }
    }
  }
}
