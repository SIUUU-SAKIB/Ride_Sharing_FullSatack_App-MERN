import passport from 'passport'
import { Strategy as googleStrategy } from "passport-google-oauth20"
import { UserDB } from '../modules/USER/user.model'
import { enviromentVariables } from './env'
import { generateToken } from '../utils/jwt'
import jwt from "jsonwebtoken"

passport.use(
    new googleStrategy({
        clientID: enviromentVariables.GOOGLE.GOOGLE_CLIENT_ID,
        clientSecret: enviromentVariables.GOOGLE.GOOGLE_CLIENT_SECRET,
        callbackURL: `http://localhost:${enviromentVariables.PORT}/api/v1/auth/google/callback`
    },
        async (_accessToken, _refreshToken, profile, done) => {
            try {
                let user = await UserDB.findOne({ googleId: profile.id })

                if (!user) {
                    user = await UserDB.create({
                        googleId: profile.id,
                        name: profile.displayName,
                        email: profile.emails?.[0].value,
                        profilePhoto: profile.photos?.[0].value
                    })
                }
                const jwtPayload = {
                    _id: user._id,
                    role: user.role
                }
                const token = jwt.sign(jwtPayload, enviromentVariables.JWT_SECRET, { expiresIn: enviromentVariables.JWT_SECRET_TOKEN_EXPIRES })
                done(null, { user, token })
            } catch (err) {
                done(err, false)
            }
        }
    )

)

passport.serializeUser((user: any, done) => {
    done(null, user._id)
})
passport.deserializeUser(async (id, done) => {
    const user = await UserDB.findById(id)
    done(null, user)
})