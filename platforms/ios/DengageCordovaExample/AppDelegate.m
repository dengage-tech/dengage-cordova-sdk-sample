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

#import "AppDelegate.h"
#import "MainViewController.h"
#import "DengageCordovaExample-Swift.h"
#import <UserNotifications/UserNotifications.h>

// TODO: Replace with your iOS Integration Key
static NSString *integrationKey = @"kcBguWOJitZ6tjtBixNnNIEEPLhYYcwATTMRO8ox4etzfV9Dx1gngcKVC9CK_p_l_fVP1C0s4ABhngJLAqpHjzsJAlJLvEJ2cTjPxdfjk0lljaW01mMsCSJiJXpAM27v_p_l_i8v5LiIlE3pLj38tPjXD0Zm_s_l_A_e_q__e_q_";
static NSString *appGroupsKey = @"group.com.dengage.cordova.example.dengage";

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary<UIApplicationLaunchOptionsKey, id> *)launchOptions
{
    self.viewController = [[MainViewController alloc] init];
    
    // Set up notification center delegate
    UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
    center.delegate = self;
    
    // Initialize Dengage SDK
    [DengageCRCoordinator.staticInstance setupDengage:integrationKey
                                          appGroupsKey:appGroupsKey
                                         launchOptions:launchOptions
                                           application:application
                            askNotificationPermission:YES
                                       enableGeoFence:YES
                                        disableOpenURL:NO
                                       badgeCountReset:NO
                                            logVisible:YES];
    
    return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
    //NSLog(@"Device token received: %@", deviceToken);
    [DengageCRCoordinator.staticInstance registerForPushToken:deviceToken];
   
}

- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
{
    NSLog(@"Failed to register for remote notifications: %@", error);
}

// Called when a notification is delivered to a foreground app
- (void)userNotificationCenter:(UNUserNotificationCenter *)center
       willPresentNotification:(UNNotification *)notification
         withCompletionHandler:(void (^)(UNNotificationPresentationOptions options))completionHandler
{
    // Show the notification even when the app is in foreground
    completionHandler(UNAuthorizationOptionSound | UNAuthorizationOptionAlert | UNAuthorizationOptionBadge);
}

// Called when a user selects a notification or selects an action from a notification
- (void)userNotificationCenter:(UNUserNotificationCenter *)center
didReceiveNotificationResponse:(UNNotificationResponse *)response
         withCompletionHandler:(void(^)(void))completionHandler
{
    [DengageCRCoordinator.staticInstance didReceivePush:center response:response withCompletionHandler:completionHandler];
}

@end
