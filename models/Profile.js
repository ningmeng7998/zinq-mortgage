const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  firstName: {
    type: String,
    required: true
  },
  middleName: {
    type: String
  },
  lastName: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date
  },
  income: {
    type: String,
    required: true
  },
  expenses: {
    type: String,
    required: true
  },
  estimatedResult: {
    type: Boolean
  },

  property: [
    {
      propertyValue: {
        type: String
      },
      deposit: {
        type: String
      },
      postCode: {
        type: String
      }
    }
  ],
  education: [
    {
      school: {
        type: String
      }
    }
  ],
  partner: {
    partnerIncome: {
      type: String
    },
    partnerExpenses: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
