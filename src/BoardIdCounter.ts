import Counter from "./models/Counter";

// Counter 모델 필드 타입 정의
interface CounterDocument {
  name: string;
  seq: number;
}

// getNextSequence 함수
export async function getNextSequence(name: string): Promise<number> {
  try {
    // 카운터 업데이트 또는 생성
    const counter = await Counter.findOneAndUpdate<CounterDocument>(
      { name },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    // counter가 없을 경우 기본 값 처리
    if (!counter) {
      throw new Error(`Failed to update or create counter for name: ${name}`);
    }

    return counter.seq;
  } catch (error) {
    console.error(`Error in getNextSequence for name: ${name}`, error);
    throw new Error("Could not retrieve or update the sequence.");
  }
}
