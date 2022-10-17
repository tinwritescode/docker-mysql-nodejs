import {
  createUserWithEmail,
  defaultUserFields,
  getUserByEmail,
  getUserById,
  updateUserById,
} from './../service/user.service'
import passport from 'passport'
import { Strategy as FacebookStrategy } from 'passport-facebook'
import FacebookTokenStrategy from 'passport-facebook-token'
import { prisma } from '../lib/prisma'
import { User } from '@prisma/client'

const facebookStrategy = new FacebookStrategy(
  {
    clientID: process.env.FACEBOOK_CLIENT_ID as string,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL as string,
    profileFields: ['id', 'displayName', 'email'],
  },
  async (accessToken, refreshToken, profile, done) => {
    if (profile.emails) {
      const email = profile.emails[0].value
      const user = await getUserByEmail(email)

      if (user) {
        return done(null, user)
      }

      const newUser = await createUserWithEmail(email)

      await updateUserById(newUser.id, {
        facebookId: profile.id,
        name: profile.displayName,
      })

      return done(null, newUser)
    }

    return done(null, null)
  },
)

const facebookTokenStrategy = new FacebookTokenStrategy(
  {
    clientID: process.env.FACEBOOK_CLIENT_ID as string,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    profileFields: ['id', 'displayName', 'email'],
  },
  async (accessToken, refreshToken, profile, done) => {
    if (profile.emails) {
      const email = profile.emails[0].value
      const user = await getUserByEmail(email)

      if (user) {
        return done(null, user)
      }

      const newUser = await createUserWithEmail(email)

      return done(null, newUser)
    }

    return done(null, null)
  },
)

// @ts-ignore
passport.serializeUser((user: User, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  const user = await getUserById(id, defaultUserFields)

  done(null, user)
})

passport.use(facebookStrategy)
passport.use(facebookTokenStrategy)

export default passport
