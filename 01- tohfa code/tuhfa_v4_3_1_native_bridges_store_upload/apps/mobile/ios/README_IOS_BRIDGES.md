
# iOS Native Bridges

- Add `use_frameworks!` in Podfile if required by SDKs.
- Install SDKs:
  - Tap goSell iOS SDK via CocoaPods or Swift Package Manager.
  - HyperPay OPPWAMobile iOS SDK via SPM/CocoaPods.
- Ensure Apple Pay entitlement and Merchant ID are added.
- Link modules in AppDelegate if SDK requires configuration.
