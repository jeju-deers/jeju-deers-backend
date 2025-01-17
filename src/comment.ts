import { Request, Response } from "express";
import Comment from "./models/comment";
import Board from "./models/Board";

// 댓글 생성
export const createComment = async (
  req: Request<
    { id: string }, // 게시물의 고유 id
    {}, // 응답의 제네릭 타입 (기본 값 {})
    { name: string; belong: string; content: string } // 요청 body의 타입
  >,
  res: Response
): Promise<void> => {
  // 반환 타입을 void로 설정
  const { id } = req.params; // 게시물의 고유 id
  const { name, belong, content } = req.body;

  try {
    const postId = parseInt(id, 10); // String을 Number로 변환

    // 댓글 생성 전 게시글 존재 여부 확인
    const boardExists = await Board.findOne({ id: postId });
    if (!boardExists) {
      res.status(404).json({ error: "해당 게시글을 찾을 수 없습니다." });
      return; // 핸들러 종료
    }

    // 고유한 commentId 생성 로직
    const lastComment = await Comment.findOne({ postId }).sort({
      commentId: -1,
    });
    const newCommentId = lastComment ? lastComment.commentId + 1 : 1;

    // 새로운 댓글 생성
    const newComment = new Comment({
      postId, // Number 타입으로 저장
      commentId: newCommentId,
      name,
      belong,
      content,
    });

    // 댓글 저장
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    console.error(`댓글 생성 실패 에러: ${error}`);
    res.status(500).json({
      error: "댓글 생성 실패",
      details: error instanceof Error ? error.message : error,
    });
  }
};

// 댓글 조회
export const readComments = async (
  req: Request<{ id: string }>, // 게시물의 고유 id
  res: Response
): Promise<void> => {
  const { id } = req.params;
  console.log(id);
  try {
    const comments = await Comment.find({ postId: id }); // postId로 검색
    res.status(200).json(comments);
  } catch (error) {
    console.error(`댓글 조회 실패 에러: ${error}`);
    res.status(500).json({
      error: "댓글 조회 실패",
      details: error instanceof Error ? error.message : error,
    });
  }
};

// 댓글 수정
export const updateComments = async (
  req: Request<{ commentId: string }, {}, { content: string }>, // 댓글의 고유 id
  res: Response
): Promise<void> => {
  const commentId = parseInt(req.params.commentId, 10); // 댓글의 id를 숫자로 변환
  const { content } = req.body;

  try {
    const updatedComment = await Comment.findOneAndUpdate(
      { commentId }, // commentId로 검색
      { content, updatedAt: Date.now() },
      { new: true }
    );

    if (!updatedComment) {
      res.status(404).json({ error: "댓글을 찾을 수 없습니다" });
      return;
    }

    res.status(200).json(updatedComment);
  } catch (error) {
    console.error(`댓글 수정 실패 에러: ${error}`);
    res.status(500).json({
      error: "댓글 수정 실패",
      details: error instanceof Error ? error.message : error,
    });
  }
};

// 댓글 삭제
export const deleteComments = async (
  req: Request<{ commentId: string }>, // 댓글의 고유 id
  res: Response
): Promise<void> => {
  const commentId = parseInt(req.params.commentId, 10); // 댓글의 id를 숫자로 변환

  try {
    const deletedComment = await Comment.findOneAndDelete({ commentId }); // commentId로 검색 및 삭제

    if (!deletedComment) {
      res.status(404).json({ error: "댓글을 찾을 수 없습니다" });
      return;
    }

    res.status(200).json({ message: "댓글 삭제 성공" });
  } catch (error) {
    console.error(`댓글 삭제 실패 에러: ${error}`);
    res.status(500).json({
      error: "댓글 삭제 실패",
      details: error instanceof Error ? error.message : error,
    });
  }
};
