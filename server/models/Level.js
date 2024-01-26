const { Schema, model } = require('mongoose');

const levelSchema = new Schema(
  {
    level: {
        type: Number,
    },
    
    numberOfObjects: [
        {
            fruits: {
                type: Number
            },
            powerUps: {
                type: Number
            },
            hazards: {
                type: Number
            }
        }
    ],

    pointMultiplier: {
        type: Number,
    }

  },
);


const Level = model('level', levelSchema);

module.exports = Level;
