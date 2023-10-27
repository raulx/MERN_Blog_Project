const protect = async (req, res, next) => {
  res.send("protected");
  next();
};

export default protect;
