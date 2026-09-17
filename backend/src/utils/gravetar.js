// imported items:-
import crypto from "crypto";


/* Create gravatar for user profile image */
const generateGravatarUrl = (email) => {
  const hash = crypto
    .createHash("md5")
    .update(email.trim().toLowerCase())
    .digest("hex");

  return `https://www.gravatar.com/avatar/${hash}?d=identicon&s=200`;
};

export default generateGravatarUrl;
