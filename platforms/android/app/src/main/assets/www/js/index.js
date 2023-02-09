/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

const showAlertMsg = (showAlertMsg) => {
    const loaderClassList = document.getElementById('loader').classList;
    if (loaderClassList) loaderClassList.remove('loader');

    document.getElementById('app-root').classList.remove('d-none');

    alert(showAlertMsg || 'Something went wrong')
}

/**
 * Function that is used to change callback behavior of cordova plugin to promise based
 * @param f
 * @returns {function(...[*]): Promise<unknown>}
 */
const promisify = (f) => (...a) => new Promise((res, rej) => f(...(a || {}), res, rej))

function onReceiveOpenPush (message) {
    alert(message)
}

function getContactKey() {
    document.getElementById('loader').classList.remove('loader');
    document.getElementById('app-root').classList.remove('d-none');
  
    promisify(DengageCR.getContactKey)()
        .then(contactKey => {
             document.getElementById('contact-key').value = contactKey
            DengageCR.registerNotification(onReceiveOpenPush, showAlertMsg)
        })
        .catch(showAlertMsg)
}

function setContactKey() {
    promisify(DengageCR.setContactKey)(document.getElementById('contact-key').value || '')
        .then(() => document.getElementById('loader').classList.remove('loader'))
        .catch(showAlertMsg)
}

function getToken() {
    promisify(DengageCR.getMobilePushToken)()
        .then(token => document.getElementById('tokenSubscription').innerHTML = token)
        .catch(showAlertMsg)
}


function getSubscription() {
    promisify(DengageCR.getSubscription)()
        .then(subscription => document.getElementById('tokenSubscription').innerHTML = subscription)
        .catch(showAlertMsg)
}

/**
 * Page View Event Example - Table (page_view_events)
 */
function pageView() {
    const pageViewDataObj = {
        page_type: 'category',
        category_id: '2001',
        page_url: 'https://app.DengageCR.com',
        page_title: 'cordova_test_page_title'
    }

    promisify(DengageCR.pageView)(pageViewDataObj)
        .catch(showAlertMsg)
}

/**
 * Add To Cart Event Example - Table (shopping_cart_events)
 */
function addToCart() {
    // addToCart action starts here.
    // All items currently exists in shopping cart must be added to an array
    const cartItem = {}
    cartItem["product_id"] = 102
    cartItem["product_variant_id"] = 1
    cartItem["quantity"] = 1
    cartItem["unit_price"] = 10.00
    cartItem["discounted_price"] = 9.99
    // ... extra columns in shopping_cart_events_detail table, can be added in cartItem

    let cartItems = []
    cartItems.push(cartItem)
    cartItems.push(cartItem)


    // Add to cart action
    const addParams = {
        "product_id": 101,
        "product_variant_id": 1,
        "quantity": 1,
        "unit_price": 10.00,
        "discounted_price": 9.99,
        // ... extra columns in shopping_cart_events table, can be added here
        "cartItems": cartItems // all items in cart
    }

    promisify(DengageCR.addToCart)(addParams)
        .catch(showAlertMsg)
    // addToCart action ends here.
}

/**
 * Remove From Cart Event Example - Table (shopping_cart_events)
 */
function removeFromCart() {
    const cartItem = {}
    cartItem["product_id"] = 1
    cartItem["product_variant_id"] = 1
    cartItem["quantity"] = 1
    cartItem["unit_price"] = 10.00
    cartItem["discounted_price"] = 9.99
    // ... extra columns in shopping_cart_events_detail table, can be added in cartItem

    let cartItems = []
    cartItems.push(cartItem)
    cartItems.push(cartItem)

    // Remove from cart action
    const removeParams = {
        "product_id": 1,
        "product_variant_id": 1,
        "quantity": 1,
        "unit_price": 10.00,
        "discounted_price": 9.99,
        // ... extra columns in shopping_cart_events table, can be added here
        "cartItems": cartItems // all items in cart
    }

    promisify(DengageCR.removeFromCart)(removeParams)
        .catch(showAlertMsg)
}

/**
 * View Cart Event Example - Table (shopping_cart_events)
 */
function viewCart() {
    const cartItem = {}
    cartItem["product_id"] = 1
    cartItem["product_variant_id"] = 1
    cartItem["quantity"] = 1
    cartItem["unit_price"] = 10.00
    cartItem["discounted_price"] = 9.99
    // ... extra columns in shopping_cart_events_detail table, can be added in cartItem

    let cartItems = []
    cartItems.push(cartItem)
    cartItems.push(cartItem)

    // View from cart action
    const viewCartParams = {
        "product_id": 1,
        "product_variant_id": 1,
        "quantity": 1,
        "unit_price": 10.00,
        "discounted_price": 9.99,
        // ... extra columns in shopping_cart_events table, can be added here
        "cartItems": cartItems // all items in cart
    }

    promisify(DengageCR.viewCart)(viewCartParams)
        .catch(showAlertMsg)
}

/**
 * Begin Checkout Event Example - Table (shopping_cart_events)
 */
function beginCheckout() {
    const cartItem = {}
    cartItem["product_id"] = 1
    cartItem["product_variant_id"] = 1
    cartItem["quantity"] = 1
    cartItem["unit_price"] = 10.00
    cartItem["discounted_price"] = 9.99
    // ... extra columns in shopping_cart_events_detail table, can be added in cartItem

    let cartItems = []
    cartItems.push(cartItem)
    cartItems.push(cartItem)

    // Begin Checkout Action
    const beginCheckoutParams = {
        "product_id": 1,
        "product_variant_id": 1,
        "quantity": 1,
        "unit_price": 10.00,
        "discounted_price": 9.99,
        // ... extra columns in shopping_cart_events table, can be added here
        "cartItems": cartItems // all items in cart
    }

    promisify(DengageCR.beginCheckout)(beginCheckoutParams)
        .catch(showAlertMsg)
}

/**
 * Place Order Event Example - Table (shopping_cart_events)
 */
function placeOrder() {
    const cartItem = {}
    cartItem["product_id"] = 1
    cartItem["product_variant_id"] = 1
    cartItem["quantity"] = 1
    cartItem["unit_price"] = 10.00
    cartItem["discounted_price"] = 9.99
    // ... extra columns in shopping_cart_events_detail table, can be added in cartItem

    const cartItems = []
    cartItems.push(cartItem)
    cartItems.push(cartItem)

    const orderData = {
        order_id: '123',
        item_count: 1,
        total_amount: 99.9,
        payment_method: 'card',
        shipping: 5,
        discounted_price: 29.99,
        coupon_code: '',
        cartItems // all items in cart
    }

    promisify(DengageCR.placeOrder)(orderData)
        .catch(showAlertMsg)
}

/**
 * Cancel Order Event Example - Table (shopping_cart_events)
 */
function cancelOrder() {
    const cartItem = {}
    cartItem["product_id"] = 1
    cartItem["product_variant_id"] = 1
    cartItem["quantity"] = 1
    cartItem["unit_price"] = 10.00
    cartItem["discounted_price"] = 9.99
    // ... extra columns in shopping_cart_events_detail table, can be added in cartItem

    const cartItems = []
    cartItems.push(cartItem)
    cartItems.push(cartItem)

    const orderData = {
        item_count: 1,
        total_amount: 99, //total amount is int
        discounted_price: 29.99,
        cartItems
    }

    promisify(DengageCR.cancelOrder)(orderData)
        .catch(showAlertMsg)
}

/**
 * Add To Wishlist Event Example - Table (wishlist_events)
 */
function addToWishList() {
    const cartItem = {}
    cartItem["product_id"] = 1
    // ... extra columns in shopping_cart_events_detail table, can be added in cartItem

    const cartItems = []
    cartItems.push(cartItem)
    cartItems.push(cartItem)

    const wishListData = {
        product_id: 1,
        cartItems
    }

    promisify(DengageCR.addToWishList)(wishListData)
        .catch(showAlertMsg)
}

/**
 * Remove From Wishlist Event Example - Table (wishlist_events)
 */
function removeFromWishList() {
    const cartItem = {}
    cartItem["product_id"] = 1
    // ... extra columns in shopping_cart_events_detail table, can be added in cartItem

    const cartItems = []
    cartItems.push(cartItem)
    cartItems.push(cartItem)

    const wishListData = {
        product_id: 1,
        cartItems
    }

    promisify(DengageCR.removeFromWishList)(wishListData)
        .catch(showAlertMsg)
}

/**
 * Search Event Example - Table (search_events)
 */
function search() {
    const data = {
        keywords: "hello",
        result_count: 123,
        filters: "q=keywords"
    }

    promisify(DengageCR.search)(data)
        .catch(showAlertMsg)
}

/**
 * Send Device Event
 */
function sendDeviceEvent() {
    // for example if you have a table named "events"
    // and events table has "key", "event_date", "event_name", "product_id" columns
    // you just have to send the columns except "key" and "event_date", because those columns sent by the SDK

    const data = {
        event_name: 'page_view',
        product_id: '12345'
    }

    promisify(DengageCR.sendDeviceEvent)('events', data)
        .catch(showAlertMsg)
}

/**
 *
 * @type {{getInboxMessages: (function(): Promise<unknown>),
 * setInboxMessageAsClicked: (function(): Promise<unknown>),
 * deleteInboxMessage: (function(): Promise<unknown>)}}
 */
const appInboxEvents = {
    setInboxMessageAsClicked: function () {
        return promisify(DengageCR.setInboxMessageAsClicked)('your-message-id-here')
            .catch(showAlertMsg)
    },
    deleteInboxMessage: function () {
        return promisify(DengageCR.setInboxMessageAsClicked)('your-message-id-here')
            .catch(showAlertMsg)
    },
    getInboxMessages: function (offset = 0, limit = 10) {
        return promisify(DengageCR.getInboxMessages)(offset, limit)
            .then(msgs => console.log(msgs)) // array of inbox messages
            .catch(showAlertMsg)
    }
}

function askNotificationPermission() {
    promisify(DengageCR.promptForPushNotificationsWithCallback)()
        .then(permission => {
            alert("Push Notification Permission set to: " + permission)
        })
        .catch(showAlertMsg)
}

function setNavigationWithName() {
    const navigationValue = document.getElementById('navigationVal').value || ''
    promisify(DengageCR.setNavigationWithName)(navigationValue)
        .catch(showAlertMsg)
}

function setTags() {
    const tags = [
        {
            "tagName": "ZeeshanAfzalSatti",
            "tagValue": "CordovaSDK",
        }
    ];

    promisify(DengageCR.setTags)(tags)
        .then(() => {
            alert("Tagged Added Successfully")
        })
        .catch(showAlertMsg)
}


function onDeviceReady() {
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
   
    console.log("running babaes");

    /**
     *
     *  setupDengageCR will Return OK if setup succesfully
     * Other it will give error message
     * User need to be provide LogStatus, FirebaseKey and Huawei Key
     * One is required from Firebase Key and Huawei key
     *
     */
   

    // iOS Example SetupDengageCR(logStatus, integrationKey, launchOptions)
     promisify(DengageCR.setupDengage)(
         true, "PE99_s_l_xjb2hXe42KaWrIXx6iEnwsQNvMGPH_s_l_lMfG3CpPTTxLhrGgcC55KMa2IuAdNBRGOTR4Bx2o_p_l_z1c63X_p_l_vWTeKdKHkeNOVYVezsv4ERVaZw9FkXHsbex_p_l_M6gujQEEb5Ld2zg8eg8w1w_p_l_PKlOU21g_e_q__e_q_", null)
        .then(getContactKey)
        .catch(showAlertMsg)

    /**
     * Prod iOS Sample App IntegerationKey
     */
    //

}