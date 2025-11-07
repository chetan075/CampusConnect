const cloudinary = require("../config/cloudinary");

exports.deleteFromCloudinary = async (url) => {
  try {
    if (!url) return;

    const publicId = url.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(`campus-connect/${publicId}`);
  } catch (err) {
    console.error("Error deleting from Cloudinary:", err.message);
  }
};