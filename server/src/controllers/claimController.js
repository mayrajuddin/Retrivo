
import Claim from "../models/Claim.js";
import Item from "../models/Item.js";

// Submit a new ownership claim
export const createClaim = async (req, res) => {
  try {
    const {
      item_id,
      item_color,
      lost_location,
      lost_date,
      lost_time,
      unique_feature,
      ownership_details,
      phone,
    } = req.body;

    if (
      !item_id ||
      !item_color?.trim() ||
      !lost_location?.trim() ||
      !lost_date ||
      !unique_feature?.trim() ||
      !ownership_details?.trim() ||
      !phone?.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required claim details",
      });
    }

    const item = await Item.findById(item_id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    // Only approved and active found items can be claimed
    if (
      item.type !== "found" ||
      item.approvalStatus !== "approved" ||
      item.itemStatus !== "active"
    ) {
      return res.status(400).json({
        success: false,
        message: "This item is not available for claiming",
      });
    }

    // Prevent users from claiming their own reports
    if (item.user_id.toString() === req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You cannot claim your own reported item",
      });
    }

    const selectedDate = new Date(lost_date);
    const today = new Date();
    today.setHours(23, 59, 59, 999);

    if (
      Number.isNaN(selectedDate.getTime()) ||
      selectedDate > today
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid past or current lost date",
      });
    }

    // Prevent duplicate pending or approved claims
    const existingClaim = await Claim.findOne({
      item_id,
      user_id: req.user._id,
      status: { $in: ["pending", "approved"] },
    });

    if (existingClaim) {
      return res.status(409).json({
        success: false,
        message: "You have already submitted a claim for this item",
      });
    }

    const claim = await Claim.create({
      item_id,
      user_id: req.user._id,
      item_color: item_color.trim(),
      lost_location: lost_location.trim(),
      lost_date: selectedDate,
      lost_time: lost_time || "",
      unique_feature: unique_feature.trim(),
      ownership_details: ownership_details.trim(),
      phone: phone.trim(),
    });

    return res.status(201).json({
      success: true,
      message: "Claim submitted successfully",
      claim,
    });
  } catch (error) {
    console.error("Create claim error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to submit claim",
    });
  }
};

// Get claims submitted by the logged-in user
export const getMyClaims = async (req, res) => {
  try {
    const claims = await Claim.find({
      user_id: req.user._id,
    })
      .populate({
        path: "item_id",
        select: "title type item_image report_date location itemStatus",
        populate: {
          path: "category_id",
          select: "category_name",
        },
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: claims.length,
      claims,
    });
  } catch (error) {
    console.error("Get my claims error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch your claims",
    });
  }
};

// Get claims submitted for items reported by the logged-in user
export const getReporterClaims = async (req, res) => {
  try {
    const myItems = await Item.find({
      user_id: req.user._id,
    }).select("_id");

    const itemIds = myItems.map((item) => item._id);

    const claims = await Claim.find({
      item_id: { $in: itemIds },
    })
      .populate({
        path: "item_id",
        select: "title type item_image report_date itemStatus",
        populate: {
          path: "category_id",
          select: "category_name",
        },
      })
      .populate("user_id", "name email phone photoURL")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: claims.length,
      claims,
    });
  } catch (error) {
    console.error("Get reporter claims error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch claim requests",
    });
  }
};

// Only the original item reporter can approve or reject a claim
export const updateClaimStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid claim status",
      });
    }

    const claim = await Claim.findById(id);

    if (!claim) {
      return res.status(404).json({
        success: false,
        message: "Claim not found",
      });
    }

    const item = await Item.findById(claim.item_id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Reported item not found",
      });
    }

    // Only the user who reported this item can review its claims
    if (item.user_id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Only the item reporter can review this claim",
      });
    }

    if (claim.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "This claim has already been reviewed",
      });
    }

    if (status === "approved") {
      if (item.itemStatus !== "active") {
        return res.status(400).json({
          success: false,
          message: "This item is no longer available",
        });
      }

      item.itemStatus = "resolved";
      await item.save();
    }

    claim.status = status;
    claim.verified_at = new Date();
    await claim.save();

    return res.status(200).json({
      success: true,
      message: `Claim ${status} successfully`,
      claim,
    });
  } catch (error) {
    console.error("Update claim status error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update claim status",
    });
  }
};
