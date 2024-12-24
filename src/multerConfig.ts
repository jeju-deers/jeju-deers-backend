import multer from "multer";
import path from "path";

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
const upload = multer({ storage });

// ES 모듈로 export
export default upload;
