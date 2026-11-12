
import "dotenv/config";
import mongoose from "mongoose";
import Category from "../models/Category.js";

const categories = [
  { category_name: "Bag", description: "Bags and backpacks" },
  { category_name: "Handbag", description: "Handbags and purses" },
  { category_name: "Wallet", description: "Wallets and card holders" },
  { category_name: "ID Card", description: "Student and staff ID cards" },
  { category_name: "Book", description: "Books and notebooks" },
  { category_name: "Mobile", description: "Mobile phones" },
  { category_name: "Laptop", description: "Laptops and computers" },
  { category_name: "Electronics", description: "Electronic devices" },
  { category_name: "Keys", description: "Keys and keychains" },
  { category_name: "Personal Item", description: "Personal belongings" },
  { category_name: "Accessories", description: "Personal accessories" },
  { category_name: "Other", description: "Other miscellaneous items" },
];

const seedCategories = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected!");

    const operations = categories.map((category) => ({
      updateOne: {
        filter: { category_name: category.category_name },
        update: { $setOnInsert: category },
        upsert: true,
      },
    }));

    await Category.bulkWrite(operations);

    console.log("Categories seeded successfully!");
    console.log(`Total categories: ${categories.length}`);
  } catch (error) {
    console.error("Category seeding failed:", error);
  } finally {
    await mongoose.disconnect();
    console.log("MongoDB disconnected.");
  }
};

seedCategories();
