
import Foundation
import UIKit
import React

@objc(TuhfaHyperPay)
class TuhfaHyperPay: NSObject {
  @objc static func requiresMainQueueSetup() -> Bool { true }

  @objc(startPayment:resolver:rejecter:)
  func startPayment(params: NSDictionary, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock){
    // TODO: Integrate OPPWAMobile iOS SDK (checkout id -> present payment UI -> handle callback)
    resolve(["status":"INITIATED","provider":"hyperpay","tx":"tx_mock_ios_hyperpay_456"])
  }
}
