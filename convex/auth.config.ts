export default {
  providers: [
    {
      // Your Convex site URL is provided in a system
      // environment variable
      domain: process.env.CLERK_JWT_ISSUER_DOMAIN,

      // Application ID has to be "convex"
      applicationID: 'convex',
    },
  ],
};
