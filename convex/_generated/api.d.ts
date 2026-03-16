/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as admin from "../admin.js";
import type * as auth from "../auth.js";
import type * as blog from "../blog.js";
import type * as compareHighlights from "../compareHighlights.js";
import type * as doctrines from "../doctrines.js";
import type * as evidence from "../evidence.js";
import type * as http from "../http.js";
import type * as pillars from "../pillars.js";
import type * as prophecies from "../prophecies.js";
import type * as seed from "../seed.js";
import type * as studyCourses from "../studyCourses.js";
import type * as studyLessons from "../studyLessons.js";
import type * as timelines from "../timelines.js";
import type * as users from "../users.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  admin: typeof admin;
  auth: typeof auth;
  blog: typeof blog;
  compareHighlights: typeof compareHighlights;
  doctrines: typeof doctrines;
  evidence: typeof evidence;
  http: typeof http;
  pillars: typeof pillars;
  prophecies: typeof prophecies;
  seed: typeof seed;
  studyCourses: typeof studyCourses;
  studyLessons: typeof studyLessons;
  timelines: typeof timelines;
  users: typeof users;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
