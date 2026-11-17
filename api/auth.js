import { createEmailAuth } from "../server/email-auth.mjs";
const handle = createEmailAuth();
export default async function auth(req, res) {
  const result = await handle(req);
  for (const [key, value] of Object.entries(result.headers))
    res.setHeader(key, value);
  res.status(result.status).json(result.body);
}
