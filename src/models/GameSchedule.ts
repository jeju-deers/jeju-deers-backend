import mongoose, { Document } from "mongoose";

export interface IGameSchedule extends Document {
  id: string; // ✅ 변경: string 타입으로 설정
  date: Date;
  location: string;
  homeTeam: string;
  homeScore: number;
  awayTeam: string;
  awayScore: number;
  isEditing?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const { Schema } = mongoose;

const gameScheduleSchema = new Schema<IGameSchedule>({
  id: { type: String, required: true, unique: true }, // ✅ string + unique
  date: { type: Date, required: true },
  location: { type: String, required: true },
  homeTeam: { type: String, required: true },
  homeScore: { type: Number, default: 0 },
  awayTeam: { type: String, required: true },
  awayScore: { type: Number, default: 0 },
  isEditing: { type: Boolean },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const GameSchedule = mongoose.model<IGameSchedule>(
  "GameSchedule",
  gameScheduleSchema
);

export default GameSchedule;
