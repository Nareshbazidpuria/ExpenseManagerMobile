import Foundation
import UIKit

@objc(IosBackHandler)
class IosBackHandler: NSObject {

  @objc func exitApp() {
    DispatchQueue.main.async {
      UIApplication.shared.perform(#selector(NSXPCConnection.suspend))
    }
  }

  @objc func goBack() {
    DispatchQueue.main.async {
      if let rootVC = UIApplication.shared.delegate?.window??.rootViewController as? UINavigationController {
        if rootVC.viewControllers.count > 1 {
          rootVC.popViewController(animated: true)
        }
      }
    }
  }

  @objc static func requiresMainQueueSetup() -> Bool {
    return true
  }
}
