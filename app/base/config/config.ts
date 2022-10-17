const config = {
  projectName: 'My Project',
  jwt: {
    secret: process.env.JWT_SECRET,
    resetPasswordExpirationMinutes: 10,
    verifyEmailExpirationMinutes: 10,
    accessExpirationMinutes: 30,
    refreshExpirationDays: 30,
  },
  email: {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      password: process.env.EMAIL_PASSWORD,
    },
    from: process.env.EMAIL_FROM,
  },
}

Object.freeze(config)

export default config
