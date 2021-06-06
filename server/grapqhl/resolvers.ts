import userModel, { Users, User, Field } from '../models/userModel';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
interface TokenRespnse {
    token: string
}
const resolvers = {
    Query: {
        Users: async () => {
            const users = await Users.find()
            return users;
        },
    },
    Mutation: {
        signup: async (root, { user }, context): Promise<TokenRespnse> => {
            const newUser: User = user;
            const usersWithEmail: any = await Users.find().where({
                email: newUser.email
            });
            if (usersWithEmail.length > 0) {
                throw new Error("User with this email already exists");
            }
            const hash = await bcrypt.hash(newUser.password, 10);
            newUser.password = hash;
            await new Users(newUser).save();
            const token = jwt.sign({ email: [user.email], username: [user.username] },
                process.env.PRIVATE_KEY, {
                expiresIn: '1d'
            });
            return {
                token
            }
        },
        login: async (root, { user }, context): Promise<TokenRespnse> => {
            const dbUser: any = await Users.findOne({
                email: user.email
            });
            console.log(dbUser);
            const hash = dbUser.password;
            const isValid = await bcrypt.compare(user.password, hash);
            if (!isValid) {
                throw new Error("Password is not valid");
            }
            const token = jwt.sign({ email: user.email, username: user.username }, process.env.PRIVATE_KEY, {
                expiresIn: '1d'
            });
            return {
                token
            }
        }
    }
}
export default resolvers;