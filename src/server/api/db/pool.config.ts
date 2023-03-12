const { env } = process;

const poolConfig = {
  host: env.PG_HOST,
  port: parseInt(env.PG_PORT, 10),
  database: env.PG_DATABASE,
  user: env.PG_USER,
  password: env.PG_PASS
};

export default poolConfig;