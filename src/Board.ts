import Board from "./models/Board.js";
import fs from "fs";
import path from "path";
import { getNextSequence } from "./BoardIdCounter.js";

// 전체 게시글 조회
const boards = async (req, res) => {
  try {
    const boards = await Board.find();
    res.status(200).json(boards);
  } catch (error) {
    res.status(500).json({ error: "Error Fetching All Boards" });
  }
};

// 게시글 조회
const board = async (req, res) => {
  // const { id } = req.params;
  const id = parseInt(req.params.id, 10);
  try {
    const board = await Board.findOneAndUpdate(
      { id },
      { $inc: { views: 1 } },
      { new: true }
    );
    if (!board) {
      return res.status(404).json({ error: "Board not Found" });
    }

    res.status(200).json(board);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error Fetching Board" });
  }
};

// 게시글 작성
const createBoard = async (req, res) => {
  const requsetJson = JSON.stringify(req.body);
  console.log(requsetJson);
  const { title, content, owner, type } = req.body;

  // 파일 처리 with multer
  // const image = req.files["images"]
  //   ? req.files["images"].map((file) => file.path)
  //   : [];
  // const video = req.files["videos"]
  //   ? req.files["videos"].map((file) => file.path)
  //   : [];

  if (!title || !content || !owner || !type) {
    return res
      .status(400)
      .json({ error: "Title, content, and owner are required" });
  }

  try {
    const nextId = await getNextSequence("boardId"); // 자동 증가 ID 생성

    const newBoard = new Board({
      id: nextId, // 자동 증가된 ID 할당
      title,
      content,
      owner,
      type,
      // image,
      // video,
    });

    const savedBoard = await newBoard.save();
    res.status(201).json(savedBoard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error saving board" });
  }
};

// 게시글 수정
const updateBoards = async (req, res) => {
  const id = parseInt(req.params.id, 10);

  const { title, content, owner } = req.body;

  // 파일 처리 with multer
  // const image = req.files["images"]
  //   ? req.files["images"].map((file) => file.path)
  //   : [];
  // const video = req.files["videos"]
  //   ? req.files["videos"].map((file) => file.path)
  //   : [];

  if (!title || !content || !owner) {
    return res
      .status(400)
      .json({ error: "Title, content, owner are required" });
  }
  try {
    const updateBoard = await Board.findOneAndUpdate(
      { id },
      { title, content, owner },
      { new: true }
    );
    if (!updateBoard) {
      return res.status(404).json({ error: "Board not Found" });
    }
    res.status(200).json(updateBoard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error Updating Board" });
  }
};
// 게시글 삭제
const deleteBoard = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const board = await Board.findOne({ id });
    if (!board) {
      return res.status(404).json({ error: "Board not Found" });
    }
    /*
    board.images.forEach((imagePath) => {
      const fullPath = path.join(__dirname, "..", imagePath);
      fs.unlink(fullPath, (error) => {
        if (error) {
          console.error(`Failed to delete image at ${fullPath}: ${err}`);
        }
      });
    });
    board.videos.forEach((videoPath) => {
      const fullPath = path.join(__dirname, "..", videoPath);
      fs.unlink(fullPath, (error) => {
        if (error) {
          console.error(`Failed to delete video at ${fullPath}: ${err}`);
        }
      });
    });
     */
    console.log(req.params);

    await Board.findOneAndDelete({ id });
    console.log("삭제 성공");
    res.status(200).json({ message: "삭제 성공" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "삭제 실패" });
  }
};

export { createBoard, boards, updateBoards, deleteBoard, board };
