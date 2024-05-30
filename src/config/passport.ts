import passport from 'passport'
import bcrypt from 'bcryptjs'

import { User } from '../models'

import { Strategy as FacebookStrategy, type Profile as FacebookProfile } from 'passport-facebook'
import { Strategy as GoogleStrategy, type Profile as GoogleProfile } from 'passport-google-oauth20'
import { processEnv } from '../helpers/env-helper'

const facebookOptions = {
  clientID: processEnv('FACEBOOK_CLIENT_ID'),
  clientSecret: processEnv('FACEBOOK_CLIENT_SECRET'),
  callbackURL: processEnv('FACEBOOK_CALLBACK_URL'),
  profileFields: ['displayName', 'email']
}

const googleOptions = {
  clientID: processEnv('GOOGLE_CLIENT_ID'),
  clientSecret: processEnv('GOOGLE_CLIENT_SECRET'),
  callbackURL: processEnv('GOOGLE_CALLBACK_URL'),
  scope: ['profile', 'email']
}

function verify (_accessToken: string, _refreshToken: string, profile: FacebookProfile | GoogleProfile, done: (error: any, user?: any, info?: any) => void): void {
  const { value: email } = (profile.emails as Array<{
    value: string
    type?: string | undefined
  }>)[0]

  const { displayName: name } = profile

  void (async () => {
    try {
      const user = await User.findOne({
        attributes: ['id', 'isTeacher', 'name', 'email'],
        where: { email },
        raw: true
      })
      if (user != null) {
        done(null, user)
      } else {
        const randomPwd = Math.random().toString(36).slice(-8)
        const newUser = {
          name,
          email,
          password: await bcrypt.hash(randomPwd, 10)
        }
        const { id } = await User.create(newUser as User)
        done(null, { id, isTeacher: 0, name, email })
      }
    } catch (err) {
      done(err)
    }
  })()
}

const facebookStrategy = new FacebookStrategy(facebookOptions, verify)
const googleStrategy = new GoogleStrategy(googleOptions, verify)

passport.use(facebookStrategy)
passport.use(googleStrategy)

export default passport
