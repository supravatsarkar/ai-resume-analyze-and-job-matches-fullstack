import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: { type: String },
  role: { type: String, enum: ["jobseeker", "admin"], default: "jobseeker" },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  refreshToken: { type: String, default: null },
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// userSchema.pre("save", async function (next) {
//   // const salt = await bcrypt.genSalt(10);
//   // const salt = 10;
//   // this.password = await bcrypt.hash(this.password, salt);
//   console.log("original", this.password);
//   this.password = await bcrypt.hash(this.password, 10);
//   console.log("hashed", this.password);
// });

const User = mongoose.model("User", userSchema);
export default User;
