
#import <React/RCTBridgeModule.h>
@interface RCT_EXTERN_MODULE(TuhfaHyperPay, NSObject)
RCT_EXTERN_METHOD(startPayment:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
@end
