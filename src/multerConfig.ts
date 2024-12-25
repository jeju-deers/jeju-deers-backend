import multer from "multer";
import path from "path";
import { Request } from "express";

// 파일 필터 옵션
const fileFilter: multer.Options["fileFilter"] = (req, file, cb) => {
  const allowedExtensions = [".jpg", ".jpeg", ".png", ".gif", ".mp4"];
  const ext = path.extname(file.originalname).toLowerCase();

  if (!allowedExtensions.includes(ext)) {
    console.error(`File type not allowed: ${ext}`);
    cb(new Error(`File type not allowed: ${ext}`));
  } else {
    cb(null, true); // 에러가 없고 파일이 허용될 경우
  }
};

// 디스크 저장소 설정
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});

// Multer 미들웨어 생성
const upload = multer({
  storage,
  fileFilter, // 수정된 fileFilter 추가
  limits: {
    fileSize: 5 * 1024 * 1024, // 파일 크기 제한 (5MB)
  },
});

export default upload;
