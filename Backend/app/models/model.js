import mongoose, { model } from "mongoose";
import bcrypt from "bcrypt";

const { Schema } = mongoose;



const user = new Schema(
  { 
    
    user_employee_id: String,
    user_first_name: String,
    user_last_name: String,
    date_of_birth: Date,
    gender: String,
    user_email: String,
    password_hash: String,


    health_profile: {

      height:Number,
      weight:Number,
      bmi:Number,
      
      risk_factors: {
        polyuria: Number,
        age:Number,
        gender:Number,
        polydipsia: Number, 
        sudden_weight_loss: Number,
        visual_blurring: Number,
        delayed_healing: Number,
        polyphagia: Number, 
        alopecia: Number,
        partial_paresis: Number, 
        weakness: Number, 
        itching: Number, 
        irritability: Number,

        
      },
      glucose_readings: [
        {
          date_time:Date,
          glucose_level: Double

        },
      ],
      HbA1c_readings: [
        {
          date_time:Date,
          HbA1c_value: Double

        },
      ],
      assessment_result: [
        {
          assessment_date:Date,
          risk_score: String,
          diabetes_prediction_result:String

        },
      ],
    },
  },
  { collection: "User" }
);

const SALT_WORK_FACTOR = 10;

user.pre("save", function (next) {
  
  if (!this.isModified("password_hash")) return next();

  
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);

    
    bcrypt.hash(this.password_hash, salt, (err, hash) => {
      if (err) return next(err);

      
      this.password_hash = hash;
      next();
    });
  });
});




    const User = model("User", user);



    
export { User, ExerciseTracking, MealSuggestions };
