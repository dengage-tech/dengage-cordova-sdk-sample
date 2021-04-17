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

const showAlertMsg = (showAlertMsg) => alert(showAlertMsg)

/**
 * Function that is used to change callback behavior of cordova plugin to promise based
 * @param f
 * @returns {function(...[*]): Promise<unknown>}
 */
const promisify = (f) => (...a) => new Promise((res, rej) => f(...(a || {}), res, rej))

function onDeviceReady() {
    // Cordova is now initialized. Have fun!
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');

    /**
     *
     *  setupDengage will Return OK if setup succesfully
     * Other it will give error message
     * User need to be provide LogStatus, FirebaseKey and Huawei Key
     * One is required from Firebase Key and Huawei key
     *
     */
    promisify(Dengage.setupDengage)(true,
        "x9n1OYdlpqmz_s_l_IMW10YREw1T1V6CKyww7_s_l_NiXZ0RPV0_p_l_y5DJddPsS20QPXiOUvZGjYmsL0mEY3PIeAcLLfqDBblxbpHPfIubh6DrQsaUPP3RuP1Uz5ZjrLz1gwtluCZL",
        null)
        // .then(() => {
        //     /**
        //      * setContactKey will return `Contact Key` that is set by user
        //      * In error case, it will return a error message
        //      *
        //      */
        //     return promisify(Dengage.setContactKey)('Cordova-DEV-Test-Real-Device-Contact-KEY')
        // })
        .then((contactKey)=> {
            /**
             * getContactKey to retrieve `Contact key`
             */
            return promisify(Dengage.getContactKey)()
        })
        .then((contactKey)=> {
            /**
             * getMobilePushToken to retrieve `Push Notification Token`
             * In error case, it will return a error message `unable to get token.` (If unable to get token)
             */
            return promisify(Dengage.getMobilePushToken)()
        })
        // .then((token)=> {
        //     return promisify(Dengage.setPermission)(true)
        // })

        .then(showAlertMsg)
        .catch(showAlertMsg)
}
