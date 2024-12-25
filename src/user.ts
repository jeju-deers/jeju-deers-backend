import { Request, Response } from "express";
import { User } from "./models/User";
import bcrypt from "bcrypt";

// 사용자 목록 조회
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find({}, "-password"); // 비밀번호 필드 제외
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res
      .status(500)
      .json({
        message: "Server Error",
        details: error instanceof Error ? error.message : String(error),
      });
  }
};

// 사용자 ID로 조회
export const findUserById = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  console.log(`Fetching user with ID: ${id}`);

  try {
    const user = await User.findOne({ userId: id }, "-password");
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res
      .status(500)
      .json({
        message: "Server Error",
        details: error instanceof Error ? error.message : String(error),
      });
  }
};

// 사용자 정보 업데이트
export const updateUser = async (
  req: Request<{ id: string }, {}, Partial<UserUpdateBody>>,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const {
    userType,
    userId,
    password,
    name,
    nickname,
    email,
    school,
    studentId,
    positions,
    backNumber,
    birth,
    belong,
    joinYear,
  } = req.body;

  // 업데이트할 데이터가 존재하는지 확인
  if (
    !userType &&
    !userId &&
    !password &&
    !name &&
    !nickname &&
    !email &&
    !school &&
    !studentId &&
    !positions &&
    !backNumber &&
    !birth &&
    !belong &&
    !joinYear
  ) {
    res.status(400).json({ message: "At least one field must be updated" });
    return;
  }

  try {
    const updateData: Partial<UserUpdateBody> = {};

    if (userType) updateData.userType = userType;
    if (userId) updateData.userId = userId;
    if (password && password !== "") {
      updateData.password = await bcrypt.hash(password, 10);
    }
    if (name) updateData.name = name;
    if (nickname) updateData.nickname = nickname;
    if (email) updateData.email = email;
    if (school) updateData.school = school;
    if (studentId) updateData.studentId = studentId;
    if (positions) updateData.positions = positions;
    if (backNumber) updateData.backNumber = backNumber;
    if (birth) updateData.birth = birth;
    if (belong) updateData.belong = belong;
    if (joinYear) updateData.joinYear = joinYear;

    const updatedUser = await User.findOneAndUpdate(
      { userId: id },
      updateData,
      { new: true }
    );

    if (!updatedUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res
      .status(500)
      .json({
        message: "Server Error",
        details: error instanceof Error ? error.message : String(error),
      });
  }
};

// 타입 정의
interface UserUpdateBody {
  userType?: string;
  userId?: string;
  password?: string;
  name?: string;
  nickname?: string;
  email?: string;
  school?: string;
  studentId?: string;
  positions?: string[];
  backNumber?: string;
  birth?: string;
  belong?: string;
  joinYear?: string;
}
