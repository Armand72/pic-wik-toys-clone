import * as mongoose from "mongoose";

const bcrypt = require("bcrypt");

export interface IUser extends mongoose.Document {
  email: string;
  password: string;
  name: string;
  fidelity?: number;
}

const UsersSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    trim: true,
    required: true,
  },
  fidelity: {
    type: Number,
    required: false,
  },
});

UsersSchema.pre<IUser>("save", async function save(next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export default mongoose.model<IUser>("Users", UsersSchema);
