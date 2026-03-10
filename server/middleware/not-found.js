const notFound = (req, res) => {
  return res
    .status(404)
    .json({ message: `Route ${req.originalUrl} does not exist` });
};

export default notFound;
