#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(IosBackHandler, NSObject)
RCT_EXTERN_METHOD(exitApp)
RCT_EXTERN_METHOD(goBack)
@end

