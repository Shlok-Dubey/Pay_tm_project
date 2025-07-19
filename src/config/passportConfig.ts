import passport from 'passport';
import { Strategy } from 'passport-google-oauth20';
export default function intialise(){
    passport.use(new Strategy({
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL: "http://localhost:3000/app/vi/sign/google/auth"
    },
        async function (accessToken, refreshToken, profile, done) {
            const user = {
                googleId: Number(profile.id),
                firstName: profile.name?.givenName,
                lastName: profile.name?.familyName
            };
            return done(null, user)
    
        }
    ));
}

