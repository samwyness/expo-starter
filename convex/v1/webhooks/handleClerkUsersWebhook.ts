import type { WebhookEvent } from '@clerk/backend';
import { Webhook } from 'svix';

import { internal } from '../../_generated/api';
import { httpAction } from '../../_generated/server';
import { env } from '../../env';

export const handleClerkUsersWebhook = httpAction(async (ctx, request) => {
  const event = await validateRequest(request);
  if (!event) {
    return new Response('Error occurred', { status: 400 });
  }
  switch (event.type) {
    case 'user.created':
    case 'user.updated':
      await ctx.runMutation(internal.v1.users.upsertFromClerk, {
        data: event.data,
      });
      break;

    case 'user.deleted': {
      const clerkUserId = event.data.id;
      if (!clerkUserId) {
        console.error('Missing user id in user.deleted event', event);
        return new Response('Missing user id in user.deleted event', {
          status: 400,
        });
      }
      await ctx.runMutation(internal.v1.users.deleteFromClerk, {
        externalId: clerkUserId,
      });
      break;
    }
    default:
      console.log('Ignored Clerk webhook event', event.type);
  }

  return new Response(null, { status: 200 });
});

/**
 * Validates the incoming webhook request from Clerk.
 * @param req The incoming request object.
 * @returns The validated webhook event or null if validation fails.
 */
async function validateRequest(req: Request): Promise<WebhookEvent | null> {
  const payloadString = await req.text();

  const svixId = req.headers.get('svix-id');
  const svixTimestamp = req.headers.get('svix-timestamp');
  const svixSignature = req.headers.get('svix-signature');
  if (!svixId || !svixTimestamp || !svixSignature) {
    console.error('Missing required Svix headers:', {
      svixId,
      svixTimestamp,
      svixSignature,
    });
    return null;
  }

  const svixHeaders = {
    'svix-id': svixId,
    'svix-timestamp': svixTimestamp,
    'svix-signature': svixSignature,
  };

  const wh = new Webhook(env.CLERK_WEBHOOK_SECRET);

  try {
    return wh.verify(payloadString, svixHeaders) as unknown as WebhookEvent;
  } catch (error) {
    console.error('Error verifying webhook event', error);
    return null;
  }
}
