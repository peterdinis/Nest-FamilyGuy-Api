import * as mongoose from 'mongoose';

export const EpisodeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    author: {
        type: String,
        required: true
    },

    // how long is episode
    minutes: {
        type: String,
        required: true
    }
})

export interface Episode extends mongoose.Document {
    id: string,
    name: string
    description: string
    author: string
    minutes: string
    image: string
}