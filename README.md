```
npm install -g jspm gulp --verbose
npm install -D jspm gulp gulp-jspm
jspm init
```

* Set the **server baseURL** to `./public/`
* Set the **config file path** to `./public/js/config.js`

Tried the below for an older version of jQuery...

```
jspm install jquery@1.7.2 npm:location npm:navigator 
```

... but I kept getting dependency errors, so I just stuck with the default 
jQuery version for now.

```
jspm install jquery
jspm bundle-sfx --minify --skip-source-maps ./dev/js/global/global.js ./public/js/global.min.js
```

Gulp makes things a little easier.

```
gulp jspm:global
gulp jspm:components
```