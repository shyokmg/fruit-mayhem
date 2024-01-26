const { Schema } = require('mongoose');

const playerSchema = new Schema({
  maxLevel: {
    type: Number,
    default: 1,
  },
  
  highScores: [
    {
      level: {
        type: Number,
        required: true,
      },
      highscore: {
        type: Number,
        default: 0,
      },
      unlocked: {
        type: Boolean,
        required: true
      },
    },
  ],
});

module.exports = playerSchema;
