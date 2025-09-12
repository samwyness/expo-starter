import { httpRouter } from 'convex/server';

import { handleClerkUsersWebhook } from './v1/webhooks/handleClerkUsersWebhook';

const http = httpRouter();

http.route({
  path: '/webhooks/clerk-user',
  method: 'POST',
  handler: handleClerkUsersWebhook,
});

export default http;
