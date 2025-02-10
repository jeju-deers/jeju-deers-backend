import { Request, Response } from "express";
import GameSchedule from "./models/GameSchedule";

// 경기 일정 생성
export const createGameSchedule = async (
  req: Request,
  res: Response
): Promise<any> => {
  const {
    id,
    date,
    location,
    homeTeam,
    homeScore,
    awayTeam,
    awayScore,
    isEditing,
  } = req.body; // ✅ id 추가

  try {
    // 필수 값 검증
    if (!id || !date || !location || !homeTeam || !awayTeam) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // id 중복 검사
    const existingSchedule = await GameSchedule.findOne({ id });
    if (existingSchedule) {
      return res.status(409).json({ error: "ID already exists" }); // ✅ 중복 방지
    }

    const newSchedule = new GameSchedule({
      id, // ✅ 요청으로 받은 id 저장
      date: new Date(date),
      location,
      homeTeam,
      homeScore: Number(homeScore),
      awayTeam,
      awayScore: Number(awayScore),
      isEditing,
    });

    const savedSchedule = await newSchedule.save();
    res.status(201).json(savedSchedule);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create game schedule" });
  }
};

// 경기 일정 조회 (전체)
export const getGameSchedules = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const schedules = await GameSchedule.find();
    res.status(200).json(schedules);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch game schedules" });
  }
};

// 특정 경기 일정 조회
export const getGameSchedule = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const schedule = await GameSchedule.findById(id);
    if (!schedule) {
      res.status(404).json({ error: "Game schedule not found" });
      return;
    }
    res.status(200).json(schedule);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch game schedule" });
  }
};

// 경기 일정 수정
export const updateGameSchedule = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params; // ✅ string 타입으로 받음
  const {
    date,
    location,
    homeTeam,
    homeScore,
    awayTeam,
    awayScore,
    isEditing,
  } = req.body;

  try {
    const updatedSchedule = await GameSchedule.findOneAndUpdate(
      { id }, // ✅ id로 찾기
      {
        date: new Date(date),
        location,
        homeTeam,
        homeScore: Number(homeScore),
        awayTeam,
        awayScore: Number(awayScore),
        updatedAt: Date.now(),
        isEditing,
      },
      { new: true }
    );

    if (!updatedSchedule) {
      return res.status(404).json({ error: "Game schedule not found" });
    }

    res.status(200).json(updatedSchedule);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update game schedule" });
  }
};

// 경기 일정 삭제
export const deleteGameSchedule = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params; // ✅ string 타입

  try {
    const deletedSchedule = await GameSchedule.findOneAndDelete({ id }); // ✅ id로 삭제
    if (!deletedSchedule) {
      return res.status(404).json({ error: "Game schedule not found" });
    }

    res.status(200).json({ message: "Game schedule deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete game schedule" });
  }
};
