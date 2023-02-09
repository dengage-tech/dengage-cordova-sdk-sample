/*
 Licensed to the Apache Software Foundation (ASF) under one
 or more contributor license agreements.  See the NOTICE file
 distributed with this work for additional information
 regarding copyright ownership.  The ASF licenses this file
 to you under the Apache License, Version 2.0 (the
 "License"); you may not use this file except in compliance
 with the License.  You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing,
 software distributed under the License is distributed on an
 "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 KIND, either express or implied.  See the License for the
 specific language governing permissions and limitations
 under the License.
 */

//
//  AppDelegate.m
//  CordovaNewSdkFinal
//
//  Created by ___FULLUSERNAME___ on ___DATE___.
//  Copyright ___ORGANIZATIONNAME___ ___YEAR___. All rights reserved.
//

#import "AppDelegate.h"
#import "MainViewController.h"
#import "HelloWorld-Swift.h""
@import UserNotifications;


@implementation AppDelegate

- (BOOL)application:(UIApplication*)application didFinishLaunchingWithOptions:(NSDictionary*)launchOptions
{
    DengageCR *dengageInstance = [DengageCR new];
    [dengageInstance setupDengage:@"YF2_p_l_NN4KRoXaSDN4BTp4Nr4K03bE00JoMQnbUh3HMadY_p_l_n30hGw_p_l_PhKypwxdE5kATWY_s_l_jKlrRHTSOAC5rC4ptsk0w0BwE94H8N940O79fIGjXwL23cnAb5RjA9432isGw3gv4J4e3J5_s_l_lRo3_s_l__p_l_IQaw_e_q__e_q_" launchOptions:launchOptions application:application askNotificaionPermission:true ];
    self.viewController = [[MainViewController alloc] init];
    UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
      center.delegate = self;
    return [super application:application didFinishLaunchingWithOptions:launchOptions];
}
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
    DengageCR *dengageInstance = [DengageCR new];
    [dengageInstance registerForPushToken:deviceToken];
}



-(void)userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions options))completionHandler
{
 
  completionHandler(UNAuthorizationOptionSound | UNAuthorizationOptionAlert | UNAuthorizationOptionBadge);


}

- (void)userNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void (^)(void))completionHandler
{
    DengageCR *dengageInstance = [DengageCR new];
  [dengageInstance didReceivePush:center response:response withCompletionHandler:completionHandler];

}

@end
