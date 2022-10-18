import {
  createUserWithEmail,
  getUserByEmail,
  getUserById,
  updateUserById,
} from './../service/user.service'
import passport from 'passport'
import { Strategy as FacebookStrategy } from 'passport-facebook'
import FacebookTokenStrategy from 'passport-facebook-token'
import { Strategy as GoogleTokenStrategy } from 'passport-google-verify-token'
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

      await updateUserById(newUser.id, {
        facebookId: profile.id,
        name: profile.displayName,
      })

      return done(null, newUser)
    }

    return done(null, null)
  },
)

const googleTokenStrategy = new GoogleTokenStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    callbackURL: '/oauth2/redirect/google',
    scope: ['profile'],
    state: true,
  },
  async (parsedToken, googleId, done) => {
    console.log('hi from google token strategy', parsedToken, googleId, done)
    // if (profile.emails) {
    //   const email = profile.emails[0].value
    //   const user = await getUserByEmail(email)

    //   if (user) {
    //     return done(null, user)
    //   }

    //   const newUser = await createUserWithEmail(email)

    //   await updateUserById(newUser.id, {
    //     googleId: profile.id,
    //     name: profile.displayName,
    //   })

    //   return done(null, newUser)
    // }

    return done(null)
  },
)

// @ts-ignore
passport.serializeUser((user: User, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  const user = await getUserById(id)

  done(null, user)
})

passport.use('facebook', facebookStrategy)
passport.use('facebook-token', facebookTokenStrategy)
passport.use('google-token', googleTokenStrategy)

export default passport
