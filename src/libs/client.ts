import { createClient } from "microcms-js-sdk";

export const client = createClient({
  serviceDomain: process.env.SERVICE_DOMAIN ?? "service-domain",
  apiKey: process.env.MICROCMS_API_KEY ?? "microcms_api_key",
});
