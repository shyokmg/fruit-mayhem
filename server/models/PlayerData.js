const { Schema } = require('mongoose');

const playerDataSchema = new Schema({

      level: {
        type: Number,
        required: true,
      },
      highScore: {
        type: Number,
        default: 0,
      },
      unlocked: {
        type: Boolean,
        required: true
      },
  
});

module.exports = playerDataSchema;
