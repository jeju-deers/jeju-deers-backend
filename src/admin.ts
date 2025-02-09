import { Request, Response } from "express";
import { User } from "./models/User";

/**
 * Controller for /admin/dashboard
 */
export const getAdminDashboard = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userCount = await User.countDocuments();
    const latestUsers = await User.find({}, "-password").sort({
      createdAt: -1,
    });

    res.status(200).json({
      userCount,
      latestUsers,
      message: "Admin Dashboard Data",
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ error: "Failed to fetch dashboard data" });
  }
};

/**
 * Controller for /admin/users
 */
export const getAdminUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, belong, role, permission } = req.query;

  try {
    const searchCriteria: any[] = [];
    if (name) searchCriteria.push({ name: { $regex: name, $options: "i" } });
    if (belong)
      searchCriteria.push({ belong: { $regex: belong, $options: "i" } });
    if (role)
      searchCriteria.push({ userType: { $regex: role, $options: "i" } });
    if (permission)
      searchCriteria.push({
        permission: { $regex: permission, $options: "i" },
      });

    const query = searchCriteria.length > 0 ? { $or: searchCriteria } : {};
    const users = await User.find(query, "-password");

    res.status(200).json(
      users.map((user) => ({
        ...user.toObject(),
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      }))
    );
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Failed to fetch user data" });
  }
};

/**
 * Delete multiple users by userIds
 */
export const deleteUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { ids } = req.body;

  if (!Array.isArray(ids) || ids.length === 0) {
    res
      .status(400)
      .json({ error: "Invalid input. 'ids' must be a non-empty array." });
    return;
  }

  try {
    const result = await User.deleteMany({ userId: { $in: ids } });

    res.status(200).json({
      message: "Users successfully deleted.",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("Error deleting users:", error);
    res.status(500).json({ error: "Failed to delete users" });
  }
};

/**
 * Update user by userId
 */
export const updateUser = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const {
    belong,
    userType,
    permission,
    name,
    nickname,
    email,
    school,
    studentId,
    positions,
  } = req.body;

  // 'guest'인 경우 school, studentId, positions 필수 입력에서 제외
  if (
    !belong ||
    !userType ||
    !permission ||
    !name ||
    !email ||
    (userType !== "external" && (!school || !studentId || !positions))
  ) {
    res.status(400).json({ error: "All required fields must be filled." });
    return;
  }

  try {
    const updateData: any = {
      belong,
      userType,
      permission,
      name,
      nickname,
      email,
    };

    // userType이 guest가 아닌 경우에만 추가
    if (userType !== "external") {
      updateData.school = school;
      updateData.studentId = studentId;
      updateData.positions = positions;
    }

    const updatedUser = await User.findOneAndUpdate(
      { userId: id },
      updateData,
      { new: true }
    );

    if (!updatedUser) {
      res.status(404).json({ error: "User not found." });
      return;
    }

    res.status(200).json({
      message: "User updated successfully.",
      user: {
        ...updatedUser.toObject(),
        createdAt: updatedUser.createdAt,
        updatedAt: updatedUser.updatedAt,
      },
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Failed to update user." });
  }
};

/**
 * Get user details by userId
 */
export const getUserDetails = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const user = await User.findOne({ userId: id }, "-password");

    if (!user) {
      res.status(404).json({ error: "User not found." });
      return;
    }

    res.status(200).json({
      message: "User details fetched successfully.",
      user: {
        ...user.toObject(),
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ error: "Failed to fetch user details." });
  }
};
