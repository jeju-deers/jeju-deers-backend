import { Request, Response } from "express";
import GameSchedule from "./models/GameSchedule";

// 경기 일정 생성
export const createGameSchedule = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { date, location, homeTeam, homeScore, awayTeam, awayScore } = req.body;

  try {
    const newSchedule = new GameSchedule({
      date,
      location,
      homeTeam,
      homeScore,
      awayTeam,
      awayScore,
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
): Promise<void> => {
  const { id } = req.params;
  const { date, location, homeTeam, homeScore, awayTeam, awayScore } = req.body;

  try {
    const updatedSchedule = await GameSchedule.findByIdAndUpdate(
      id,
      {
        date,
        location,
        homeTeam,
        homeScore,
        awayTeam,
        awayScore,
        updatedAt: Date.now(),
      },
      { new: true }
    );

    if (!updatedSchedule) {
      res.status(404).json({ error: "Game schedule not found" });
      return;
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
): Promise<void> => {
  const { id } = req.params;

  try {
    const deletedSchedule = await GameSchedule.findByIdAndDelete(id);
    if (!deletedSchedule) {
      res.status(404).json({ error: "Game schedule not found" });
      return;
    }

    res.status(200).json({ message: "Game schedule deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete game schedule" });
  }
};
