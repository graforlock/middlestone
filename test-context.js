require('es6-promise').polyfill();
var context = require.context('./test', true, /\.spec\.js$/);

context.keys().forEach(context);