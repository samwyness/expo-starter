/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as env from "../env.js";
import type * as http from "../http.js";
import type * as repos_users from "../repos/users.js";
import type * as schema_users from "../schema/users.js";
import type * as types from "../types.js";
import type * as utils_auth from "../utils/auth.js";
import type * as v1_users from "../v1/users.js";
import type * as v1_webhooks_handleClerkUsersWebhook from "../v1/webhooks/handleClerkUsersWebhook.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  env: typeof env;
  http: typeof http;
  "repos/users": typeof repos_users;
  "schema/users": typeof schema_users;
  types: typeof types;
  "utils/auth": typeof utils_auth;
  "v1/users": typeof v1_users;
  "v1/webhooks/handleClerkUsersWebhook": typeof v1_webhooks_handleClerkUsersWebhook;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
