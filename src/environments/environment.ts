// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyBtNW4aoKRTrUDzballdq9R994ndLdjv4c",
    authDomain: "measurenotebookandroidapp.firebaseapp.com",
    databaseURL: "https://measurenotebookandroidapp.firebaseio.com",
    projectId: "measurenotebookandroidapp",
    storageBucket: "measurenotebookandroidapp.appspot.com",
    messagingSenderId: "725391479229"
  }
};
