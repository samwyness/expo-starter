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
    CLERK_PUBLISHABLE_KEY: z.string(),
  });

  const envVars = {
    CLERK_PUBLISHABLE_KEY: process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY,
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
