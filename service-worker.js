/**
 * Copyright 2015 Google Inc. All rights reserved.
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

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren */
'use strict';


importScripts("scripts/sw/sw-toolbox.js","scripts/sw/runtime-caching.js");


/* eslint-disable quotes, comma-spacing */
var PrecacheConfig = [["images/calendar.svg","dc79c2fdfcc3d2fa156ccc3711994533"],["images/fb.png","2c640ecde8f8a684f188ae053507afb0"],["images/imm2016logotype_lgbg.svg","00e90ac629a97ffbe916f41cafa41d50"],["images/imm2016logotype_small.svg","25c1818c72ee013cf63a8e99271c131a"],["images/pin.svg","33f3e704f1001c2ec42a25b75b814f48"],["images/threejs/6-06.png","d25c4e2bc2e5c9ed2fa386ebc9086471"],["images/threejs/7-07.png","6f3219fc760198b854375b617177be1d"],["images/threejs/8-08.png","601bb39b68b381b2b254f1bf0d23180e"],["images/touch/android-chrome-144x144.png","b46e190b95c7065fb56eae70d98bb5e6"],["images/touch/android-chrome-192x192.png","7bf9a190acd2943ae513991cc771e99b"],["images/touch/android-chrome-36x36.png","590e60620fd32c531fa37a581aaa9cbf"],["images/touch/android-chrome-48x48.png","d5652c65afd7b29bd5867151760e1006"],["images/touch/android-chrome-72x72.png","552fa77b51fc23edee9577ae195bc91d"],["images/touch/android-chrome-96x96.png","356d7461cbf8b3b9fcb78cf05ddf55f3"],["images/touch/apple-touch-icon-114x114.png","dd1015a8082470a205840c76ecc02449"],["images/touch/apple-touch-icon-120x120.png","5d28600133308fb03955daf788f38e02"],["images/touch/apple-touch-icon-144x144.png","fc35c5c0f0376148494d1e09a8153832"],["images/touch/apple-touch-icon-152x152.png","45ace92c59932eea094cdd523fc6b7a7"],["images/touch/apple-touch-icon-180x180.png","da9ecba706273e17e8d5198532aa527f"],["images/touch/apple-touch-icon-57x57.png","5ae47a35533b32707f64378c8000be7d"],["images/touch/apple-touch-icon-60x60.png","e831ec61c8699d73b665ac7839440267"],["images/touch/apple-touch-icon-72x72.png","5f0b618ee2ff2e470e7a8f060c6ca7f4"],["images/touch/apple-touch-icon-76x76.png","0374b3965ba3d23a6e6659dcfe0413ca"],["images/touch/apple-touch-icon-precomposed.png","59a3beafc66f5398ac62d5b1a9a87ef3"],["images/touch/apple-touch-icon.png","da9ecba706273e17e8d5198532aa527f"],["images/touch/browserconfig.xml","9af3b0f8f0a7cc945459b97898f320c1"],["images/touch/favicon-16x16.png","9054bdf70f93697a4c862db52c3c643b"],["images/touch/favicon-32x32.png","cf04a67dd25d6d5ed5b31fcca493c809"],["images/touch/favicon-96x96.png","356d7461cbf8b3b9fcb78cf05ddf55f3"],["images/touch/favicon.ico","aaeec7c16a3b37bcf49a1267c339b662"],["images/touch/manifest.json","3ac772600ff29554b2e2cde75960b364"],["images/touch/ms-touch-icon-144x144-precomposed.png","452d90b250d6f41a0c8f9db729113ffd"],["images/touch/mstile-144x144.png","4b8c4e021c4883a5aa6c4c4e8370671b"],["images/touch/mstile-150x150.png","758b396fc93235c8184895bea165703a"],["images/touch/mstile-310x150.png","5982c319f97ab0f3e5cc01bfa7ec464a"],["images/touch/mstile-310x310.png","b96087ece10697d69f9220db9772c08d"],["images/touch/mstile-70x70.png","9de3f23a1edbda1bc5637e52c0a2f775"],["images/twitter.png","89136626e03c58cb0ba6624fc6d3120a"],["index.html","b36542e688bc21ffe581679a5d8f525b"],["scripts/main.min.js","023679369b1540c4c8508e246f8a829d"],["scripts/sw/runtime-caching.js","e3e34dcb62b5d62453b9215961585488"],["scripts/sw/sw-toolbox.js","42dd9073ba0a0c8e0ae2230432870678"],["styles/main.css","3202ab3c7e8d47467819be9b715d70de"]];
/* eslint-enable quotes, comma-spacing */
var CacheNamePrefix = 'sw-precache-v1-web-starter-kit-' + (self.registration ? self.registration.scope : '') + '-';


var IgnoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var getCacheBustedUrl = function (url, now) {
    now = now || Date.now();

    var urlWithCacheBusting = new URL(url);
    urlWithCacheBusting.search += (urlWithCacheBusting.search ? '&' : '') + 'sw-precache=' + now;

    return urlWithCacheBusting.toString();
  };

var populateCurrentCacheNames = function (precacheConfig,
    cacheNamePrefix, baseUrl) {
    var absoluteUrlToCacheName = {};
    var currentCacheNamesToAbsoluteUrl = {};

    precacheConfig.forEach(function(cacheOption) {
      var absoluteUrl = new URL(cacheOption[0], baseUrl).toString();
      var cacheName = cacheNamePrefix + absoluteUrl + '-' + cacheOption[1];
      currentCacheNamesToAbsoluteUrl[cacheName] = absoluteUrl;
      absoluteUrlToCacheName[absoluteUrl] = cacheName;
    });

    return {
      absoluteUrlToCacheName: absoluteUrlToCacheName,
      currentCacheNamesToAbsoluteUrl: currentCacheNamesToAbsoluteUrl
    };
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


var mappings = populateCurrentCacheNames(PrecacheConfig, CacheNamePrefix, self.location);
var AbsoluteUrlToCacheName = mappings.absoluteUrlToCacheName;
var CurrentCacheNamesToAbsoluteUrl = mappings.currentCacheNamesToAbsoluteUrl;

function deleteAllCaches() {
  return caches.keys().then(function(cacheNames) {
    return Promise.all(
      cacheNames.map(function(cacheName) {
        return caches.delete(cacheName);
      })
    );
  });
}

self.addEventListener('install', function(event) {
  var now = Date.now();

  event.waitUntil(
    caches.keys().then(function(allCacheNames) {
      return Promise.all(
        Object.keys(CurrentCacheNamesToAbsoluteUrl).filter(function(cacheName) {
          return allCacheNames.indexOf(cacheName) === -1;
        }).map(function(cacheName) {
          var urlWithCacheBusting = getCacheBustedUrl(CurrentCacheNamesToAbsoluteUrl[cacheName],
            now);

          return caches.open(cacheName).then(function(cache) {
            var request = new Request(urlWithCacheBusting, {credentials: 'same-origin'});
            return fetch(request).then(function(response) {
              if (response.ok) {
                return cache.put(CurrentCacheNamesToAbsoluteUrl[cacheName], response);
              }

              console.error('Request for %s returned a response with status %d, so not attempting to cache it.',
                urlWithCacheBusting, response.status);
              // Get rid of the empty cache if we can't add a successful response to it.
              return caches.delete(cacheName);
            });
          });
        })
      ).then(function() {
        return Promise.all(
          allCacheNames.filter(function(cacheName) {
            return cacheName.indexOf(CacheNamePrefix) === 0 &&
                   !(cacheName in CurrentCacheNamesToAbsoluteUrl);
          }).map(function(cacheName) {
            return caches.delete(cacheName);
          })
        );
      });
    }).then(function() {
      if (typeof self.skipWaiting === 'function') {
        // Force the SW to transition from installing -> active state
        self.skipWaiting();
      }
    })
  );
});

if (self.clients && (typeof self.clients.claim === 'function')) {
  self.addEventListener('activate', function(event) {
    event.waitUntil(self.clients.claim());
  });
}

self.addEventListener('message', function(event) {
  if (event.data.command === 'delete_all') {
    console.log('About to delete all caches...');
    deleteAllCaches().then(function() {
      console.log('Caches deleted.');
      event.ports[0].postMessage({
        error: null
      });
    }).catch(function(error) {
      console.log('Caches not deleted:', error);
      event.ports[0].postMessage({
        error: error
      });
    });
  }
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    var urlWithoutIgnoredParameters = stripIgnoredUrlParameters(event.request.url,
      IgnoreUrlParametersMatching);

    var cacheName = AbsoluteUrlToCacheName[urlWithoutIgnoredParameters];
    var directoryIndex = 'index.html';
    if (!cacheName && directoryIndex) {
      urlWithoutIgnoredParameters = addDirectoryIndex(urlWithoutIgnoredParameters, directoryIndex);
      cacheName = AbsoluteUrlToCacheName[urlWithoutIgnoredParameters];
    }

    var navigateFallback = '';
    // Ideally, this would check for event.request.mode === 'navigate', but that is not widely
    // supported yet:
    // https://code.google.com/p/chromium/issues/detail?id=540967
    // https://bugzilla.mozilla.org/show_bug.cgi?id=1209081
    if (!cacheName && navigateFallback && event.request.headers.has('accept') &&
        event.request.headers.get('accept').includes('text/html')) {
      var navigateFallbackUrl = new URL(navigateFallback, self.location);
      cacheName = AbsoluteUrlToCacheName[navigateFallbackUrl.toString()];
    }

    if (cacheName) {
      event.respondWith(
        // Rely on the fact that each cache we manage should only have one entry, and return that.
        caches.open(cacheName).then(function(cache) {
          return cache.keys().then(function(keys) {
            return cache.match(keys[0]).then(function(response) {
              if (response) {
                return response;
              }
              // If for some reason the response was deleted from the cache,
              // raise and exception and fall back to the fetch() triggered in the catch().
              throw Error('The cache ' + cacheName + ' is empty.');
            });
          });
        }).catch(function(e) {
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});

