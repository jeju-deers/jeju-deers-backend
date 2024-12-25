import mongoose, { Schema, Document, Model } from "mongoose";

/**
 * @swagger
 * components:
 *   schemas:
 *     Counter:
 *       type: object
 *       required:
 *         - name
 *         - seq
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the counter
 *           example: "boardId"
 *         seq:
 *           type: number
 *           description: The current sequence value
 *           example: 42
 */

// Counter 모델 인터페이스 정의
export interface ICounter extends Document {
  name: string;
  seq: number;
}

// Counter 스키마 정의
const CounterSchema: Schema<ICounter> = new Schema({
  name: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

// Counter 모델 생성
const Counter: Model<ICounter> = mongoose.model<ICounter>(
  "Counter",
  CounterSchema
);

export default Counter;
