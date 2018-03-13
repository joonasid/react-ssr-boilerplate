# React / redux / server-side rendering boilerplate

This project contains boilerplate code for server-side rendered React application, using the following technologies and libraries:

 - [React 16](https://reactjs.org/)
 - [Redux](https://github.com/reactjs/react-redux)
 - [Redux-saga](https://github.com/redux-saga/redux-saga)
 - [Re-ducks](https://github.com/alexnm/re-ducks)
 - [Styled components](https://www.styled-components.com/)
 - [Node.js](https://nodejs.org/en/) + [Express](https://expressjs.com/)

### Requirements

 - node.js (v8.9) and preferably [nvm](https://github.com/creationix/nvm)
 - [yarn](https://yarnpkg.com/en/) (v 1.3.2)

## Installation and startup

 - clone this repo
 - `yarn`
 - `yarn build; yarn start`
 - open `http://localhost:1337` with your favourite browser

## Development (live-reload of client and server sides)

Start the following processes in separate windows (do the latter only once the former has started):

 - `yarn watch-client`
 - `yarn watch-server`

## Environment variables

(Default values for `production` modes in parenthesis)

 - `APP_ENV` (also `NODE_ENV`) (`production`) `production` or `development`
 - `SERVER_LISTEN_ADDRESS` (127.0.0.1) - the app listen address
 - `SERVER_LISTEN_ADDRESS` (1337) - the app listen port
 - `SERVER_BASE_URL` (`http://localhost:1337)` the internet-facing application base URL
 - `SERVER_ROUTES_FRONT_PAGE_CACHE_TTL` (15 minutes) - the cache TTL for server-rendered app pages, in format `HH:mm:ss`
 - `SERVER_ROUTES_SITEMAP_CACHE_TTL` (24 hours) - the cache TTL for site metadata, e.g. `sitemap.xml`, in format `HH:mm:ss`
 - `SERVER_LOG_LEVEL` (`info`) the minimum log message level to write to console

LICENCE: MIT
