# Simple template for web with TypeScript

## Usage
This will build the project in development mode in `dist` folder and will watch for changes

`npm run build:dev:watch`

Source maps will be created inline.

If watching for changes is not needed

`npm run build:dev`

Make minimized production build with

`npm run build`

Source maps will be created in their own files.

## Serve
You must serve the contents of `dist` folder using any HTTP server like `http-server` in order to see them in a browser.