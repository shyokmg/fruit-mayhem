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

        const user = await User.findById(context.user._id);

    // Update the maxLevel if the provided level is higher
    if (maxLevel > user.maxLevel && user.maxLevel <= 5) {
      user.maxLevel = maxLevel;
    }

    // Find the playerData entry with the same level and update its highScore
    const playerDataIndex = user.playerData.findIndex(
      (data) => data.level === level
    );
    if (playerDataIndex !== -1) {
      // Update the existing playerData entry
      if (highScore > user.playerData[playerDataIndex].highScore && highScore !== 0) {
        user.playerData[playerDataIndex].highScore = highScore;
        if (user.maxLevel <= 5) {
          user.playerData[playerDataIndex+1].unlocked = unlocked;
        }
      }
    } 
    // Save the updated user
    const updatedUser = await user.save();
    return updatedUser;
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
