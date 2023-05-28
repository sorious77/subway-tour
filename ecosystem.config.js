module.exports = {
  apps: [
    {
      name: "subwaytour",
      script: "src/app.js",
      autorestart: true,
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
        PORT: "8080",
      },
    },
  ],
};
