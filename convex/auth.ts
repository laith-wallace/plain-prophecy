import { convexAuth } from "@convex-dev/auth/server";
import { Password } from "@convex-dev/auth/providers/Password";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [Password],
  callbacks: {
    async afterUserCreatedOrUpdated(ctx, { userId, profile }) {
      if (profile.email === "laithwallace@gmail.com") {
        await ctx.db.patch(userId, { role: "admin" });
      }
    },
  },
});
