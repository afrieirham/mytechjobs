import { verifySession } from "supertokens-node/recipe/session/framework/express";
import { superTokensNextWrapper } from "supertokens-node/nextjs";
import { revokeAllSessionsForUser } from "supertokens-node/recipe/session";
import {
  getUserById,
  signIn,
  updateEmailOrPassword,
} from "supertokens-node/recipe/emailpassword";

export default async function changePassword(req, res) {
  await superTokensNextWrapper(
    async (next) => {
      // This is needed for production deployments with Vercel
      res.setHeader(
        "Cache-Control",
        "no-cache, no-store, max-age=0, must-revalidate"
      );
      await verifySession()(req, res, next);
    },
    req,
    res
  );

  const oldPassword = req.body.oldPassword;
  const updatedPassword = req.body.newPassword;

  const session = req.session;
  const userId = session.getUserId();
  const userInfo = await getUserById(userId);

  if (userInfo === undefined) {
    throw new Error("Should never come here");
  }

  const isPasswordValid = await signIn(userInfo.email, oldPassword);

  if (isPasswordValid.status !== "OK") {
    return res.status(400).json({ msg: "invalid password" });
  }

  // update the user's password using updateEmailOrPassword
  const response = await updateEmailOrPassword({
    userId,
    password: updatedPassword,
  });

  if (response.status !== "OK") {
    return res.status(500).json({ msg: "user not found" });
  }

  // revoke all sessions for the user
  await revokeAllSessionsForUser(userId);

  return res.status(200).json({ msg: "password updated" });
}
