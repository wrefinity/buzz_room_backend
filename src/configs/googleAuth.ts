import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import userServices from '../services/user.services';
import { IUser } from '../models/users';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '../secrets';

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:9999/api/auth/google/callback',
    scope: ['profile', 'email']
}, async (accessToken, refreshToken, profile, done) => {
    console.log("This access token", accessToken);
    console.log("This refresh token", refreshToken);
    console.log("This profile", profile);

    try {
        let user = await userServices.findUserByEmail(profile.emails![0].value);
        if (!user) {
            user = await userServices.createUser({
                _id: profile.id,
                username: profile.displayName,
                email: profile.emails![0].value,
                password: '', // Since it's a Google login, password can be empty
                role: 'user',
                tokens: 0,
                completedTasks: []
            } as IUser);
        }
        return done(null, user);
    } catch (error) {
        return done(error, null);
    }
}));

// serialize user into sessions
passport.serializeUser((user: IUser, done) => {
    done(null, user);
});

//deserialize user from sessions
passport.deserializeUser(async (id: string, done) => {
    try {
        const user = await userServices.getUserById(id)
        return done(null, user)
    } catch (error) {
        done(error, null)
    }
});