
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
    console.log("Request body:", req.body);
    console.log("Uploaded file:", req.file);
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

    // Required field validation
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

    // Validate item type
    const normalizedType = type.toLowerCase();

    if (!["lost", "found"].includes(normalizedType)) {
      return res.status(400).json({
        success: false,
        message: "Item type must be either lost or found",
      });
    }

    // Validate report date
    const parsedDate = new Date(report_date);

    if (Number.isNaN(parsedDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid report date",
      });
    }

    // Find category by category name
    const selectedCategory = await Category.findOne({
      category_name: category.trim(),
    });

    if (!selectedCategory) {
      return res.status(404).json({
        success: false,
        message: "Selected category was not found",
      });
    }

    // Upload image to Cloudinary if an image is provided
    let imageUrl = item_image || "";

    if (req.file) {
      const uploadResult = await uploadToCloudinary(req.file.buffer);
      imageUrl = uploadResult.secure_url;
    }

    // Create item
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
