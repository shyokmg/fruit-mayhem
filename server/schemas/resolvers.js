const { User } = require('../models');
const  { signToken, AuthenticationError} = require('../utils/auth');

const resolvers = {
    Mutation: {
        addUser: async (parent, { username, password }) => {
            const user = await User.create({ username, password});
            const token = signToken(user);
            return { token, user};
        },

        login: async (parent, {username, password}) => {
            const user = await User.findOne({ username });

            if (!user) {
                throw AuthenticationError
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw AuthenticationError;
            }

            const token = signToken(user);
            return {token, user};
        },
    }
}

module.exports = resolvers;