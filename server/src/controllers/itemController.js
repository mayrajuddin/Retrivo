
import mongoose from "mongoose";
import Item from "../models/Item.js";
import Category from "../models/Category.js";
import cloudinary from "../config/cloudinary.js";

// Upload image to Cloudinary
const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "retrivo/items",
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    uploadStream.end(fileBuffer);
  });
};

// Get all categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find()
      .select("_id category_name description")
      .sort({ category_name: 1 });

    return res.status(200).json({
      success: true,
      count: categories.length,
      categories,
    });
  } catch (error) {
    console.error("Get categories error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch categories",
    });
  }
};

// Create a new item report
export const createItem = async (req, res) => {
  try {
    const {
      title,
      type,
      category,
      description,
      location,
      exact_location,
      report_date,
      item_image,
      contact_number,
    } = req.body;

    if (
      !title ||
      !type ||
      !category ||
      !description ||
      !location ||
      !report_date ||
      !contact_number
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    const normalizedType = type.toLowerCase();

    if (!["lost", "found"].includes(normalizedType)) {
      return res.status(400).json({
        success: false,
        message: "Item type must be either lost or found",
      });
    }

    const parsedDate = new Date(report_date);

    if (Number.isNaN(parsedDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid report date",
      });
    }

    const selectedCategory = await Category.findOne({
      category_name: category.trim(),
    });

    if (!selectedCategory) {
      return res.status(404).json({
        success: false,
        message: "Selected category was not found",
      });
    }

    let imageUrl = item_image || "";

    if (req.file) {
      const uploadResult = await uploadToCloudinary(req.file.buffer);
      imageUrl = uploadResult.secure_url;
    }

    const newItem = await Item.create({
      user_id: req.user._id,
      category_id: selectedCategory._id,
      title: title.trim(),
      type: normalizedType,
      description: description.trim(),
      location: location.trim(),
      exact_location: exact_location?.trim() || "",
      report_date: parsedDate,
      item_image: imageUrl,
      contact_number: contact_number.trim(),
    });

    return res.status(201).json({
      success: true,
      message: "Item report submitted successfully",
      item: newItem,
    });
  } catch (error) {
    console.error("Create item error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to submit item report",
    });
  }
};

// Get reports created by the logged-in user
export const getMyReports = async (req, res) => {
  try {
    const reports = await Item.find({
      user_id: req.user._id,
    })
      .populate("category_id", "category_name")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: reports.length,
      reports,
    });
  } catch (error) {
    console.error("Get my reports error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch your reports",
    });
  }
};

// Admin: Get all submitted reports
export const getAllReportsAdmin = async (req, res) => {
  try {
    const reports = await Item.find()
      .populate("category_id", "category_name")
      .populate("user_id", "name email phone")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: reports.length,
      reports,
    });
  } catch (error) {
    console.error("Get all admin reports error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch reports",
    });
  }
};

// Get only approved reports
export const getApprovedReports = async (req, res) => {
  try {
    const reports = await Item.find({
      approvalStatus: "approved",
    })
      .populate("category_id", "category_name")
      .populate("user_id", "name")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: reports.length,
      reports,
    });
  } catch (error) {
    console.error("Get approved reports error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch approved reports",
    });
  }
};

// Admin: Approve or reject a report
export const updateReportApprovalStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { approvalStatus } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid report ID",
      });
    }

    const normalizedStatus = approvalStatus?.toLowerCase();

    if (!["approved", "rejected"].includes(normalizedStatus)) {
      return res.status(400).json({
        success: false,
        message: "Status must be approved or rejected",
      });
    }

    const report = await Item.findById(id);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    report.approvalStatus = normalizedStatus;
    await report.save();

    const updatedReport = await Item.findById(id)
      .populate("category_id", "category_name")
      .populate("user_id", "name email phone");

    return res.status(200).json({
      success: true,
      message: `Report ${normalizedStatus} successfully`,
      report: updatedReport,
    });
  } catch (error) {
    console.error("Update report approval status error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update report status",
    });
  }
};


// Admin: Delete an approved report
export const deleteApprovedReport = async (req, res) => {
  try {
    const { id } = req.params;

    const report = await Item.findById(id);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    if (report.approvalStatus !== "approved") {
      return res.status(400).json({
        success: false,
        message: "Only approved reports can be deleted",
      });
    }

    await report.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Report deleted successfully",
    });
  } catch (error) {
    console.error("Delete approved report error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete report",
    });
  }
};

// Get a single approved item by ID
export const getItemById = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Item.findOne({
      _id: id,
      approvalStatus: "approved",
      itemStatus: "active",
    })
      .populate("category_id", "category_name")
      .populate("user_id", "name email");

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found or no longer available",
      });
    }

    return res.status(200).json({
      success: true,
      item,
    });
  } catch (error) {
    console.error("Get item by ID error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch item",
    });
  }
};

// Get approved and active items for public Browse Items page
export const getApprovedPublicItems = async (req, res) => {
  try {
    const items = await Item.find({
      approvalStatus: "approved",
      itemStatus: "active",
    })
      .populate("category_id", "category_name")
      .populate("user_id", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: items.length,
      items,
    });
  } catch (error) {
    console.error("Get approved public items error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch approved items",
    });
  }
};