export const config = () => ({
  mongodbUri: process.env.MONGODB_URI,

  jwt: {
    atSecret: process.env.ACCESS_SECRET,
    atLife: process.env.ACCESS_EXPIRATION,
    rtSecret: process.env.REFRESH_SECRET,
    rtLife: process.env.REFRESH_EXPIRATION,
  },

  email: {
    smtp: {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    },
    from: process.env.EMAIL_FROM,
  },

  cloudinaryV2: {
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
  },

  cookies: {
    key: {
      rfToken: '_apprftoken',
    },
    options: {
      signed: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7days
      httpOnly: true,
      sameSite: true,
      secure: true,
    },
  },
});
