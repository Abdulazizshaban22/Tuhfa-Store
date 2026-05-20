export const isDemo = () => (process.env.DEMO_MODE === 'true') ||
  (!process.env.TAP_SECRET_KEY && !process.env.SPL_API_KEY && !process.env.WEB3_PRIVATE_KEY);
