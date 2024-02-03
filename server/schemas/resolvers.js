const { User, Level } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");
const defaultLevels = require("../utils/defaultLevels.json");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      
      if (context.user) {
        const user = await User.findOne({ _id: context.user._id });
        return user;
      }
      throw AuthenticationError;
    },

    getLevel: async (parent, { level }) => {
      return Level.findOne({ level });
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const playerData = defaultLevels;
      const user = await User.create({ username, email, password, playerData });
      const token = signToken(user);
      return { token, user };
    },

    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);
      return { token, user };
    },

    saveScore: async (
      parent,
      { maxLevel, level, highScore, unlocked },
      context
    ) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $addToSet: {
              maxLevel,
              playerData: {
                level,
                highScore,
              },
            },
          },
          {
            $addToSet: {
              playerData: {
                level: maxLevel,
                unlocked,
              },
            },
          }
        );
        return updatedUser;
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
