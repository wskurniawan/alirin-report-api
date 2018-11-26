module.exports = {
   /**
    * Application configuration section
    * http://pm2.keymetrics.io/docs/usage/application-declaration/
    */
   apps: [
      // First application
      {
         name: 'alirin-report',
         script: 'main.js',
         watch: true,
         ignore_watch : ["node_modules"],
         env: {
            COMMON_VARIABLE: 'true',
            PORT: 5008
         },
         env_production: {
            NODE_ENV: 'production'
         }
      }
   ]
};
