import Board from "./models/Board";
import { RequestHandler } from "express";
import { getNextSequence } from "./BoardIdCounter";

// 요청 본문에 대한 타입 정의
interface BoardRequestBody {
  title?: string;
  content?: string;
  owner?: string;
  type: string;
}

// 전체 게시글 조회
export const boards: RequestHandler = async (req, res) => {
  try {
    const boardList = await Board.find();
    res.status(200).json(boardList);
  } catch (error) {
    console.error("Error Fetching All Boards:", error);
    res.status(500).json({ error: "Error Fetching All Boards" });
  }
};

// 게시글 조회
export const board: RequestHandler<{ id: string }> = async (req, res) => {
  const id = parseInt(req.params.id, 10);

  try {
    const foundBoard = await Board.findOneAndUpdate(
      { id },
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!foundBoard) {
      res.status(404).json({ error: "Board not Found" });
      return;
    }

    res.status(200).json(foundBoard);
  } catch (error) {
    console.error("Error Fetching Board:", error);
    res.status(500).json({ error: "Error Fetching Board" });
  }
};

// 게시글 작성
export const createBoard: RequestHandler<{}, {}, BoardRequestBody> = async (
  req,
  res
) => {
  const { title, content, owner, type } = req.body;

  if (!title || !content || !owner || !type) {
    res
      .status(400)
      .json({ error: "Title, content, owner, and type are required" });
    return;
  }

  try {
    const nextId = await getNextSequence("boardId");

    const newBoard = new Board({
      id: nextId,
      title,
      content,
      owner,
      type,
    });

    const savedBoard = await newBoard.save();
    res.status(201).json(savedBoard);
  } catch (error) {
    console.error("Error Saving Board:", error);
    res.status(500).json({ error: "Error Saving Board" });
  }
};

// 게시글 수정
export const updateBoards: RequestHandler<
  { id: string },
  {},
  Partial<BoardRequestBody>
> = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { title, content, owner } = req.body;

  if (!title && !content && !owner) {
    res.status(400).json({ error: "At least one field must be updated" });
    return;
  }

  try {
    const updatedBoard = await Board.findOneAndUpdate(
      { id },
      { title, content, owner },
      { new: true }
    );

    if (!updatedBoard) {
      res.status(404).json({ error: "Board not Found" });
      return;
    }

    res.status(200).json(updatedBoard);
  } catch (error) {
    console.error("Error Updating Board:", error);
    res.status(500).json({ error: "Error Updating Board" });
  }
};

// 게시글 삭제
export const deleteBoard: RequestHandler<{ id: string }> = async (req, res) => {
  const id = parseInt(req.params.id, 10);

  try {
    const foundBoard = await Board.findOne({ id });

    if (!foundBoard) {
      res.status(404).json({ error: "Board not Found" });
      return;
    }

    await Board.findOneAndDelete({ id });
    res.status(200).json({ message: "Board deleted successfully" });
  } catch (error) {
    console.error("Error Deleting Board:", error);
    res.status(500).json({ error: "Error Deleting Board" });
  }
};
