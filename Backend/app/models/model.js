import mongoose, { model } from "mongoose";
import bcrypt from "bcrypt";

const { Schema } = mongoose;

const user = new Schema(
  {
    user_employee_id: { type: Number, default: 0 },
    user_first_name: { type: String, default: "" },
    user_last_name: { type: String, default: "" },
    date_of_birth: { type: Date, default: Date.now },
    gender: { type: String, default: "" },
    user_email: { type: String, default: "" },
    password: { type: String, select: false }, // Add this line
    password_hash: { type: String, default: "" },

    health_profile: {
      height: { type: Number, default: 0 },
      weight: { type: Number, default: 0 },
      bmi: { type: Number, default: 0 },

      risk_factors: {
        polyuria: { type: Number, default: 0 },
        age: { type: Number, default: 0 },
        gender: { type: Number, default: 0 },
        polydipsia: { type: Number, default: 0 },
        sudden_weight_loss: { type: Number, default: 0 },
        visual_blurring: { type: Number, default: 0 },
        delayed_healing: { type: Number, default: 0 },
        polyphagia: { type: Number, default: 0 },
        alopecia: { type: Number, default: 0 },
        partial_paresis: { type: Number, default: 0 },
        weakness: { type: Number, default: 0 },
        itching: { type: Number, default: 0 },
        irritability: { type: Number, default: 0 },
      },
      glucose_readings: [
        {
          date_time: { type: Date, default: Date.now },
          glucose_level: { type: Number, default: 0 },
        },
      ],
      HbA1c_readings: [
        {
          date_time: { type: Date, default: Date.now },
          HbA1c_value: { type: Number, default: 0 },
        },
      ],
      assessment_result: [
        {
          assessment_date: { type: Date, default: Date.now },
          risk_score: { type: String, default: "" },
          diabetes_prediction_result: { type: String, default: "" },
        },
      ],
    },
  },
  { collection: "User" }
);

const SALT_WORK_FACTOR = 10;

user.pre("save", function (next) {
  if (!this.isModified("password")) return next(); // Change this line

  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(this.password, salt, (err, hash) => {
      // Change this line
      if (err) return next(err);

      this.password_hash = hash;
      this.password = undefined; // Add this line
      next();
    });
  });
});

const User = model("User", user);

export { User };
