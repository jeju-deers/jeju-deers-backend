import { Comment } from "./models/comment";

export const createComment = async (req, res) => {
  console.log(req.params);
  const { id } = req.params; // 게시물의 MongoDB 고유 ID (ObjectId)
  const { name, belong, content } = req.body;

  try {
    // 고유한 commentId 생성 로직 추가 (예: 가장 높은 commentId를 가져와 +1 하기)
    const lastComment = await Comment.findOne().sort({ commentId: -1 });
    const newCommentId = lastComment ? lastComment.commentId + 1 : 1;

    // 새로운 댓글 생성
    const newComment = new Comment({
      postId: id, // 게시물의 ObjectId를 참조로 설정
      commentId: newCommentId, // 고유한 댓글 ID
      name,
      belong,
      content,
    });

    // 댓글 저장
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    console.log(`댓글 생성 실패 에러 ${error}`);
    res.status(500).json({ error: "댓글 생성 실패" });
  }
};

export const readComments = async (req, res) => {
  console.log(req.params);
  const { id } = req.params;

  try {
    const comments = await Comment.find({ postId: id }).populate("postId");
    res.status(200).json(comments);
  } catch (error) {
    console.log(`댓글 조회 실패 에러 ${error}`);
    res.status(500).json({ error: "댓글 조회 실패" });
  }
};

export const updateComments = async (req, res) => {
  console.log(req.params);
  const commentId = parseInt(req.params.commentId, 10);
  const { content } = req.body;

  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { content, updatedAt: Date.now() },
      { new: true }
    );
    if (!updatedComment) {
      return res.status(404).json({ error: "댓글을 찾을 수 없습니다" });
    }
    res.status(200).json(updatedComment);
  } catch (error) {
    console.log(`댓글 수정 실패 에러 ${error}`);
    res.status(500).json({ error: "댓글 수정 실패" });
  }
};

export const deleteComments = async (req, res) => {
  const commentId = parseInt(req.params.commentId, 10);

  try {
    const deletedComment = await Comment.findByIdAndDelete(commentId);
    if (!deletedComment) {
      return res.status(404).json({ error: "댓글을 찾을 수 없습니다" });
    }
    res.status(200).json({ message: "댓글 삭제 성공" });
  } catch (error) {
    console.log(`댓글 삭제 실패 에러 ${error}`);
    res.status(500).json({ error: "댓글 삭제 실패" });
  }
};
