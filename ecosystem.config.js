module.exports = {
  apps: [
    {
      name: 'React SSR boilerplate',
      script: 'dist/server/index.js',
      env: {
        NODE_ENV: 'production',
        SERVER_LISTEN_PORT: 8000
      },
    },
  ],
};
