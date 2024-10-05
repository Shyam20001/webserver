function register() {
    navigator.serviceWorker
      .register('/sw.js', { scope: '/sw', type: 'module' })
      .then(
        function (_registration) {   
          console.log('Register Service Worker: Success')
        },
        function (_error) {
          console.log('Register Service Worker: Error')
        }
      )
  }
  function start() {
    navigator.serviceWorker
      .getRegistrations()
      .then(function (registrations) {
        for (const registration of registrations) {
          console.log('Unregister Service Worker')
          registration.unregister()
        }
        register()
      })
  }
  start()




// function register() {
//   // Dynamically create the Service Worker URL using import.meta.url
//   const swUrl = new URL('./sw.js', import.meta.url).href;
  
//   navigator.serviceWorker
//     .register(swUrl, { scope: '/sw', type: 'module' })
//     .then(
//       function (_registration) {
//         console.log('Register Service Worker: Success');
//       },
//       function (_error) {
//         console.log('Register Service Worker: Error');
//       }
//     );
// }

// function start() {
//   navigator.serviceWorker
//     .getRegistrations()
//     .then(function (registrations) {
//       for (const registration of registrations) {
//         console.log('Unregister Service Worker');
//         registration.unregister();
//       }
//       register();
//     });
// }

// start();


