import * as mongoose from "mongoose";

export const CharacterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  image: {
    type: String,
    required: true
  }
});

// declare interface

export interface Character extends mongoose.Document {
  id: string;
  name: string;
  description: string;
  image: string;
}