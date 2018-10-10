import express from "express";
import User from "../models/User";
import parseErrors from "../utils/parseErrors";
import { sendConfirmationEmail } from "../utils/mailer";

const router = express.Router();

router.post("/", (req, res) => {
  const { email, password, provider } = req.body.user;
  const user = new User({ email });

  switch (provider) {
    case "email":
      user.setPassword(password);
      break;

    case "google":
      user.setGoogleData(req.body.user);
      break;
  }

  user.setConfirmationToken();

  user
    .save()
    .then(userRecord => {
      sendConfirmationEmail(userRecord);
      res.json({ user: userRecord.toAuthJSON() });
    })
    .catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));
});

export default router;
