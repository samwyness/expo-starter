import * as z from 'zod';

/**
 * Validates and parses the environment variables using a predefined schema.
 *
 * @returns {object} An object containing the validated environment variables.
 * @throws {Error} If the environment variables do not match the schema, an error is thrown
 * with details about the missing or invalid variables.
 */
const createEnv = () => {
  const EnvSchema = z.object({
    CLERK_JWT_ISSUER_DOMAIN: z.string(),
    CLERK_WEBHOOK_SECRET: z.string(),
  });

  const envVars = {
    CLERK_JWT_ISSUER_DOMAIN: process.env.CLERK_JWT_ISSUER_DOMAIN,
    CLERK_WEBHOOK_SECRET: process.env.CLERK_WEBHOOK_SECRET,
  };

  const parsedEnv = EnvSchema.safeParse(envVars);

  if (!parsedEnv.success) {
    throw new Error(
      `Invalid env provided. The following variables are missing or invalid:
${Object.entries(parsedEnv.error.flatten().fieldErrors)
  .map(([k, v]) => `- ${k}: ${v}`)
  .join('\n')}`,
    );
  }

  return parsedEnv.data;
};

export const env = createEnv();
