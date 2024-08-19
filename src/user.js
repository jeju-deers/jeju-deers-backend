import { User } from "./models/User.js";

export const user = async (req, res) => {
  try {
    const users = await User.find({}, "-password"); // 비밀번호 필드 제외
    res.json(users);
    //   console.log(users);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const findUserWithId = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ userId: id }, "-password");

    if (!user) {
      return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "서버 오류" });
  }
};

export const updateUser = async (req, res) => {
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
  } = res.body;

  if (
    !userType &&
    !userId &&
    !name &&
    !email &&
    !password &&
    !nickname &&
    !school &&
    !studentId &&
    !positions &&
    !backNumber
  ) {
    return res.status(400).send("하나의 항목이라도 변경되어야 합니다.");
  }
  try {
    const updateData = {};
    if (userType) updateData.userType = userType;
    if (userId) updateData.userId = userId;
    if (password) updateData.password = password;
    if (name) updateData.name = name;
    if (nickname) updateData.nickname = nickname;
    if (email) updateData.email = email;
    if (school) updateData.school = school;
    if (studentId) updateData.studentId = studentId;
    if (positions) updateData.positions = positions;
    if (backNumber) updateData.backNumber = backNumber;
    const updateUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updateUser) {
      return res.status(404).send("사용자를 찾을 수 없습니다.");
    }
    res.json(updateUser);
  } catch (error) {
    res.status(500).send("Server Error");
  }
};
