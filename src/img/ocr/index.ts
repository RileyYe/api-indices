import { Hono } from "hono";
import { z } from "zod";

import { processBase64Images } from "./helper.js";

const ImgOCRRequestBodySchema = z.object({
  model: z.string(),
  token: z.string(),
  prompt: z.string(),
  base64Strings: z.array(z.string())
});

const imgOCR = new Hono();

imgOCR.post("/", async (c) => {
  const body = await c.req.json();
  const parsedBody = ImgOCRRequestBodySchema.parse(body);
  const text = await processBase64Images(
    parsedBody.token, 
    parsedBody.model, 
    parsedBody.prompt, 
    parsedBody.base64Strings
  );
  return c.json({ text });
});

export default imgOCR;