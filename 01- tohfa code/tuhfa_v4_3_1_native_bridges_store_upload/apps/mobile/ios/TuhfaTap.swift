
import Foundation
import UIKit
import React

@objc(TuhfaTap)
class TuhfaTap: NSObject {
  @objc static func requiresMainQueueSetup() -> Bool { true }

  @objc(startPayment:resolver:rejecter:)
  func startPayment(params: NSDictionary, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock){
    // TODO: Integrate Tap goSell iOS SDK here (initialize SDK, Apple Pay / mada session)
    // Placeholder: return a mock transaction id
    resolve(["status":"INITIATED","provider":"tap","tx":"tx_mock_ios_tap_123"])
  }
}
