function requireEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing ${name}. Copy .env.example to .env and fill in the values.`);
  }

  return value;
}

export const standardUser = {
  username: requireEnv('SAUCE_USERNAME'),
  password: requireEnv('SAUCE_PASSWORD'),
};