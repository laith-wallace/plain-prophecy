/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as blog from "../blog.js";
import type * as evidence from "../evidence.js";
import type * as prophecies from "../prophecies.js";
import type * as seed from "../seed.js";
import type * as studyCourses from "../studyCourses.js";
import type * as studyLessons from "../studyLessons.js";
import type * as timelines from "../timelines.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  blog: typeof blog;
  evidence: typeof evidence;
  prophecies: typeof prophecies;
  seed: typeof seed;
  studyCourses: typeof studyCourses;
  studyLessons: typeof studyLessons;
  timelines: typeof timelines;
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
