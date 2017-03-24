/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["app/src/app.html","01e20d229f0b13d99b01ac54106f85a4"],["app/src/app.js","6be30c9c4f95494c31eb29a3984b25dd"],["app/src/app.js.map","dddbd43065125e833e1b438ae60e64ab"],["app/src/components/assistant/assistant.html","794d4edb9ccd39ce034030e9a1a65134"],["app/src/components/assistant/assistant.js","e4d84f9b71ae1d970c00795c86ba6c2b"],["app/src/components/assistant/assistant.js.map","688c12bd94a8d60f858c66ccf338a1e6"],["app/src/components/form-search/form-search.html","66ee1c9aeef40c3cb2d1ab101d062b99"],["app/src/components/icons/icon.html","33cae9e4eaa2df26d0aacf9392f5e8eb"],["app/src/components/icons/icons.html","80ce90ad6e1e8b8d57083c9d35285928"],["app/src/components/input-composite/input-composite.html","25954f1f1748454f13e242563f5ce4ba"],["app/src/components/input-composite/input-composite.js","19a2129ffb1cccdb115bc0278c538dd6"],["app/src/components/input-composite/input-composite.js.map","5a49c9695ed39afdec9d4701053c309c"],["app/src/components/master-detail/master-detail.html","65c5a33369baf431d2ed07662bd676d0"],["app/src/components/master-detail/master-detail.js","022a168adc929d0ae5bc64f5db7bd82a"],["app/src/components/master-detail/master-detail.js.map","b30e5aa74adf71686ce8db7d7e129021"],["app/src/components/menu/menu-items.js","c31e2a0aab5d3a2d794e911357118cd4"],["app/src/components/menu/menu-items.js.map","11503262f1f18d944c481a02413aae1f"],["app/src/components/menu/menu.html","a630b5e6d05b2133330cd1b7e710c750"],["app/src/components/menu/menu.js","0cdc1f780c4ad0269091f0defccb414b"],["app/src/components/menu/menu.js.map","3627bdf4136e8b2c46a5aa04403af3d5"],["app/src/custom-attributes/selectable.js","80e2d784d37e63b24ec2df33c1d5a2e5"],["app/src/custom-attributes/selectable.js.map","ceea7d28764c47ba035794cd9379d59e"],["app/src/index.js","f0297dd1ea9f748c4b49273b229cfa38"],["app/src/index.js.map","ca4a08ac705b44d54fafad057e3466fe"],["app/src/lib/device-helper.js","1ac4547c36ec53258c33b0674d7ee91e"],["app/src/lib/device-helper.js.map","9f7410b432643a440d2922b9c806f6eb"],["app/src/lib/dynamic-view-loader.js","1064f5c77f72f764fbf606e299146b4f"],["app/src/lib/dynamic-view-loader.js.map","0ddf7ec45adb97b1c8864593a8abf200"],["app/src/lib/template-parser-contstants.js","04ea92c67d76e48b98877974fdc547b2"],["app/src/lib/template-parser-contstants.js.map","3156d4f910addcbab64456a641aafa26"],["app/src/lib/template-parser.js","6811351a9239d59ed73f56dc611469c1"],["app/src/lib/template-parser.js.map","bcfaa1e0cfde814127d89ba6ed16be35"],["app/src/main.js","303421e91458b2864e865438e9f9b440"],["app/src/main.js.map","d1550bf98cdd059a96f42cba29414b52"],["app/src/menu-items.js","9540d19743d2b13153f4396775023220"],["app/src/menu-items.js.map","011f8f21dc81e4753376b17e6205c4fb"],["app/src/vendor-build.js","52feb5e43a4910f9307ae2c61a9f8ee7"],["app/src/views/input-tests/input-tests.html","e48589ac45e86a6a7a52863eba4d977f"],["app/src/views/input-tests/input-tests.js","a5de9f2361ed656ff6c6c93c04566f3c"],["app/src/views/input-tests/input-tests.js.map","344e5af137102f8f21b6844198826ed1"],["app/src/views/input/input.html","2bc38ef9432f5ba8c0eac7912a90bc80"],["app/src/views/input/input.js","4ee0159fee81ad533c0981298293d04e"],["app/src/views/input/input.js.map","5d1ab6627e2c011c21b8073c93c4de78"],["app/src/views/welcome/welcome.html","5a0ee75853bc81b3f1d155ce6bb2069a"],["app/src/views/welcome/welcome.js","4c1610a35920868bd2625b41f4e004ca"],["app/src/views/welcome/welcome.js.map","4168a7d6bc86a35aa1fd1544ffc93402"],["config.js","4b1a435baec2b62ab238e7f365570f6e"],["images/app.svg","c91b40bf4094f2a92c683600b49d58fc"],["index.html","e55c0935c6c0c0298c7299d07357121b"],["jspm_packages/system.js","eccc019329febb5a1b06bde008ca5614"],["styles/desktop.css","b5713078dbfe74efeafc29ab3cb2a7b3"],["styles/desktop/app.css","8dae88dee273cd2fd64449699d7fe1c7"],["styles/desktop/assistant.css","3504c4a9aafd625dd3806511ee409878"],["styles/desktop/input-composite.css","f72104f7ed3fe8f0cc5b021a6de06ea3"],["styles/desktop/master-detail.css","5b5b72eb5e8228e0ba3de5002a4cfbea"],["styles/desktop/menu.css","fd40b87bee71b5e219b4dbdbd4befcac"],["styles/mobile.css","7fbbd7041ea9b4822e0f269e042d7a5d"],["styles/mobile/app.css","285c59514fdd52a9506e98f1bbbb4a34"],["styles/mobile/assistant.css","8cfb0a071683b35b9acf854d6876f1f4"],["styles/normalize.css","761126c20e2413ab7c7126cca83d9f22"],["styles/style.css","8079f014116ae0e72582de2df1bb1819"]];
var cacheName = 'sw-precache-v2-untitled-' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.toString().match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              return cache.add(new Request(cacheKey, {
                credentials: 'same-origin',
                redirect: 'follow'
              }));
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameter and see if we have that URL
    // in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







