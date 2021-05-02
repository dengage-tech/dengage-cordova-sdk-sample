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

    alert(showAlertMsg || 'Something went wrong')
}

/**
 * Function that is used to change callback behavior of cordova plugin to promise based
 * @param f
 * @returns {function(...[*]): Promise<unknown>}
 */
const promisify = (f) => (...a) => new Promise((res, rej) => f(...(a || {}), res, rej))

function getContactKey() {
    promisify(Dengage.getContactKey)()
        .then(contactKey => {
            document.getElementById('loader').classList.remove('loader');
            document.getElementById('contact-key').value = contactKey
        })
        .catch(showAlertMsg)
}

function setContactKey() {
    promisify(Dengage.setContactKey)(document.getElementById('contact-key').value || '')
        .then(() => document.getElementById('loader').classList.remove('loader'))
        .catch(showAlertMsg)
}

function getToken() {
    promisify(Dengage.getMobilePushToken)()
        .then(token => document.getElementById('token').innerHTML = token)
        .catch(showAlertMsg)
}

/**
 * Page View Event Example - Table (page_view_events)
 */
function pageView() {
    const pageViewDataObj = {
        page_type: 'category',
        category_id: '2001',
        page_url: 'https://app.dengage.com',
        page_title: 'cordova_test_page_title'
    }

    promisify(Dengage.pageView)(pageViewDataObj)
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

    promisify(Dengage.addToCart)(addParams)
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

    promisify(Dengage.removeFromCart)(removeParams)
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

    promisify(Dengage.viewCart)(viewCartParams)
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

    promisify(Dengage.beginCheckout)(beginCheckoutParams)
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
        "cartItems": cartItems // all items in cart
    }

    promisify(Dengage.placeOrder)(orderData)
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

    promisify(Dengage.cancelOrder)(orderData)
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

    promisify(Dengage.addToWishList)(wishListData)
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

    promisify(Dengage.removeFromWishList)(wishListData)
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

    promisify(Dengage.search)(data)
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

    promisify(Dengage.sendDeviceEvent)('events', data)
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
        return promisify(Dengage.setInboxMessageAsClicked)('your-message-id-here')
            .catch(showAlertMsg)
    },
    deleteInboxMessage: function () {
        return promisify(Dengage.setInboxMessageAsClicked)('your-message-id-here')
            .catch(showAlertMsg)
    },
    getInboxMessages: function (offset = 0, limit = 10) {
        return promisify(Dengage.getInboxMessages)(offset, limit)
            .then(msgs => console.log(msgs)) // array of inbox messages
            .catch(showAlertMsg)
    }
}

function askNotificationPermission() {
    promisify(Dengage.promptForPushNotificationsWithCallback)()
        .then(permission => {
            alert("Push Notification Permission set to: " + permission)
        })
        .catch(showAlertMsg)
}

function onDeviceReady() {
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    /**
     *
     *  setupDengage will Return OK if setup succesfully
     * Other it will give error message
     * User need to be provide LogStatus, FirebaseKey and Huawei Key
     * One is required from Firebase Key and Huawei key
     *
     */
    // promisify(Dengage.setupDengage)(true,
    //     "x9n1OYdlpqmz_s_l_IMW10YREw1T1V6CKyww7_s_l_NiXZ0RPV0_p_l_y5DJddPsS20QPXiOUvZGjYmsL0mEY3PIeAcLLfqDBblxbpHPfIubh6DrQsaUPP3RuP1Uz5ZjrLz1gwtluCZL",
    //     null)

    // iOS Example SetupDengage(logStatus, integrationKey, launchOptions)
    promisify(Dengage.setupDengage)(
        true, "X6n4T_s_l_Ws_p_l_jX_s_l_n06hzDns_s_l_AhrVyf_s_l_J2ZotOZXkTeiGX3iDw56FruUOh1C2_s_l_ojdCb26_p_l_uErBVC1Ff8kRvzAIUWIEajaJu8zUv5XBtB_s_l_DfjEpuGvKuGRkzW4fpvyPr5OzXg", null)
        .then(getContactKey)
        .catch(showAlertMsg)
}
