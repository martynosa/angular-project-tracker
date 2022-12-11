// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  AUTH_URL: 'https://project-tracker-server.up.railway.app/auth',
  ITEMS_URL: 'https://project-tracker-server.up.railway.app/items',
  PHOTO_URL: 'https://project-tracker-server.up.railway.app/users',
  // LOCAL
  // AUTH_URL: 'http://localhost:5000/auth',
  // ITEMS_URL: 'http://localhost:5000/items',
  // PHOTO_URL: 'http://localhost:5000/users',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
