const uploadController = (req, res) => {
  console.log(req.file);
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "No file uploaded or invalid file",
    });
  }
  return res.json({
    success: true,
    message: "Resume uploaded successfully!",
  });
};

export default {
  uploadController,
};
