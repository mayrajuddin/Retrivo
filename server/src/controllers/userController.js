
import User from "../models/User.js";
import Item from "../models/Item.js";
import Claim from "../models/Claim.js";

// Get all users for Admin Dashboard
export const getAllUsers = async (req, res) => {
  try {
    // Password and other private fields are not included
    const users = await User.find()
      .select("_id name email phone photoURL role status authProvider createdAt")
      .sort({ createdAt: -1 })
      .lean();

    // Get each user's report and claim count
    const usersWithCounts = await Promise.all(
      users.map(async (user) => {
        const [reportsCount, claimsCount] = await Promise.all([
          Item.countDocuments({ user_id: user._id }),
          Claim.countDocuments({ user_id: user._id }),
        ]);

        return {
          ...user,
          reportsCount,
          claimsCount,
        };
      })
    );

    return res.status(200).json({
      success: true,
      count: usersWithCounts.length,
      users: usersWithCounts,
    });
  } catch (error) {
    console.error("Get all users error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch users",
    });
  }
};
