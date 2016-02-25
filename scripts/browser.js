var browserSync = require("browser-sync").create();

browserSync.init({
  server: 'dist'
});

browserSync.init({
  proxy: 'localhost:1337'
});
