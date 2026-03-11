const errorHandler = async (err, req, res, next) => {
  console.log("Error Name: ", err.name);
  if (err.name === "ValidationError") {
    const customMessage = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
    return res.status(400).json({ message: customMessage });
  }
  return res.status(500).json({ message: err.name });
};

export default errorHandler;
