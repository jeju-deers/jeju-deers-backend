import mongoose, { Document } from "mongoose";

export interface IGameSchedule extends Document {
  date: Date;
  location: string;
  homeTeam: string;
  homeScore: number;
  awayTeam: string;
  awayScore: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const { Schema } = mongoose;

const gameScheduleSchema = new Schema<IGameSchedule>({
  date: { type: Date, required: true },
  location: { type: String, required: true },
  homeTeam: { type: String, required: true },
  homeScore: { type: Number, default: 0 },
  awayTeam: { type: String, required: true },
  awayScore: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const GameSchedule = mongoose.model<IGameSchedule>(
  "GameSchedule",
  gameScheduleSchema
);

export default GameSchedule;
