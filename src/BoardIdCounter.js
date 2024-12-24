import Counter from "./models/Counter"; // Counter 모델 임포트

export async function getNextSequence(name) {
  const counter = await Counter.findOneAndUpdate(
    { name },
    { $inc: { seq: 1 } },
    { new: true, upsert: true } // 카운터가 없으면 생성
  );
  return counter.seq;
}
