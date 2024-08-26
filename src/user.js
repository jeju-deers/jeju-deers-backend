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
  console.log(`${id} user 찾기`);
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
    birth,
    belong,
    joinYear,
  } = req.body;

  // 최소 하나의 항목이 변경되었는지 확인
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
    return res.status(400).send("하나의 항목이라도 변경되어야 합니다.");
  }

  try {
    const updateData = {};
    if (userType) updateData.userType = userType;
    if (userId) updateData.userId = userId;
    if (password !== undefined) {
      // 비밀번호가 정의되어 있으면 처리
      if (password === "") {
        return res
          .status(400)
          .send("비밀번호를 빈 문자열로 설정할 수 없습니다.");
      }
      // 비밀번호가 빈 문자열이 아니면 해싱
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
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

    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).send("사용자를 찾을 수 없습니다.");
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(500).send("Server Error");
  }
};
