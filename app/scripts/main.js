/*!
 *
 *  Web Starter Kit
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */
/* eslint-env browser */
(function() {
  'use strict';

  // Check to make sure service workers are supported in the current browser,
  // and that the current page is accessed from a secure origin. Using a
  // service worker from an insecure origin will trigger JS console errors. See
  // http://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features
  var isLocalhost = Boolean(window.location.hostname === 'localhost' ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === '[::1]' ||
      // 127.0.0.1/8 is considered localhost for IPv4.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
    );

  if ('serviceWorker' in navigator &&
      (window.location.protocol === 'https:' || isLocalhost)) {
    navigator.serviceWorker.register('service-worker.js')
    .then(function(registration) {
      // Check to see if there's an updated version of service-worker.js with
      // new files to cache:
      // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-registration-update-method
      if (typeof registration.update === 'function') {
        registration.update();
      }

      // updatefound is fired if service-worker.js changes.
      registration.onupdatefound = function() {
        // updatefound is also fired the very first time the SW is installed,
        // and there's no need to prompt for a reload at that point.
        // So check here to see if the page is already controlled,
        // i.e. whether there's an existing service worker.
        if (navigator.serviceWorker.controller) {
          // The updatefound event implies that registration.installing is set:
          // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
          var installingWorker = registration.installing;

          installingWorker.onstatechange = function() {
            switch (installingWorker.state) {
              case 'installed':
                // At this point, the old content will have been purged and the
                // fresh content will have been added to the cache.
                // It's the perfect time to display a "New content is
                // available; please refresh." message in the page's interface.
                break;

              case 'redundant':
                throw new Error('The installing ' +
                                'service worker became redundant.');

              default:
                // Ignore
            }
          };
        }
      };
    }).catch(function(e) {
      console.error('Error during service worker registration:', e);
    });
  }
  createThreeJsBg();

  // Ajax form submit

  // validate input
  function validateEmail( email ) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test( email );
  }
  var form = $("form");
  // submit form
  form.submit( function(evt) {
    evt.preventDefault();
    var input = $(".email-input").val();

    // Test if email is validated
    if ( validateEmail( input ) ) {
      $.ajax({
        url: form.attr("action"),
        method: form.attr("method"),
        data: form.serialize(),
        dataType: 'json',
        contentType: "application/json; charset=utf-8"
      })
      .done(function(data) {
        if ( data.result == "success" ) {
          form.hide();
          $("#form-hide").hide();
          $("#form-response").text("");
          $("#form-response").append("<h3>Thank you!</h3><p>Check your inbox to confirm your subscription.</p>");
        } else {
          $("#form-response").text("Something went wrong, give it another shot!");
        }
      });
    } else {
      $("#form-response").text("Invalid email, give it another shot!");
    }
  })

})();

function createThreeJsBg(){
  /*scene*/
  var scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2( "red", 0.0003);
  /*camera*/
  var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  /*renderer*/
  var renderer = new THREE.WebGLRenderer({antialias:true}); //create canvas
  renderer.setSize(window.innerWidth, window.innerHeight); //set canvas size;
  renderer.setClearColor(new THREE.Color(0x292a5d, 1.0));// set rendering background color
  document.getElementById("bg--threejs").appendChild(renderer.domElement); // pass in _canvas
  window.addEventListener("resize", function(){
    renderer.setSize(window.innerWidth, window.innerHeight);
  })
  var cloud;
  var cloud2;
  var cloud3;
  var cloud4;
  function createPointCloud(arg){
      var texture = new THREE.TextureLoader().load(arg.img);
      var geom = new THREE.Geometry();
      var material = new THREE.PointsMaterial({
        size: 11,
        transparent: true,
        opacity: 1,
        map: texture,
        sizeAttenuation: false,
        color: 0xffffff,
        blending: THREE.AdditiveBlending,
      })
      var num= arg.num; 
      var range = 500;
      for (var i = 0; i < num; i++) {
        var particle = new THREE.Vector3(
          Math.random()*range-range/2,
          Math.random()*range-range/2,
          Math.random()*range-range/2
          )
        geom.vertices.push(particle);
      };
      return {
        geom:geom,
        material :material 
      }
  } 
  var a = createPointCloud({img:'images/threejs/6-06.png',num:11,size:100,})
  cloud = new THREE.Points(a.geom, a.material);
  scene.add(cloud);
  var b = createPointCloud({img:"images/threejs/7-07.png",num:22,size:100,})
  cloud2 = new THREE.Points(b.geom, b.material);
  scene.add(cloud2);
  var c = createPointCloud({img:"images/threejs/8-08.png",num:30,size:100,})
  cloud3 = new THREE.Points(c.geom, c.material);
  scene.add(cloud3);
  function createPointCloud4(img){
      var texture = new THREE.TextureLoader().load(img);
      var geom = new THREE.Geometry();
      var material = new THREE.PointsMaterial({
        size: 7,
        transparent:true,
        opacity:0.2,
        map: texture,
        sizeAttenuation:true,
        color:0xffffff,
      })
      var num= 1; 
      var range = 1;
      for (var i = 0; i < num; i++) {
        var particle = new THREE.Vector3(
          Math.random()*range-range/2,
         0.4,
          Math.random()*range-range/2-10
          )
        geom.vertices.push(particle);
      };
      geom.applyMatrix(new THREE.Matrix4().makeTranslation(-1,-1,7));
      cloud4 = new THREE.Points(geom, material);
      cloud4.name ="pointCloud";
      scene.add(cloud4);
  } 
  createPointCloud4("images/imm2016logotype_lgbg.svg")
  var light = new THREE.PointLight(0xffffff);
  light.lookAt(scene.position);
  light.position.set(40,170,11);
  light.castShadow = true;
  scene.add(light);
  var light = new THREE.AmbientLight( 0x404040 ); // soft white light
  scene.add( light );
  function render() {
        cloud.rotation.x += 0.0001;
        cloud.rotation.z += 0.001;
        cloud2.rotation.x += 0.0008;
        cloud2.rotation.z += 0.002;
        cloud3.rotation.y += 0.0008;
        cloud3.rotation.z += 0.002;
        cloud4.rotation.z += 0.002;
        requestAnimationFrame( render );
        renderer.render( scene, camera );
  }
  render();
}