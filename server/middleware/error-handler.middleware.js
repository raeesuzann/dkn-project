export const errorHandler = (err, req, res, next) => {
  console.error('Error : ', err);

  if (err?.name == 'TokenExpiredError') {
    return res.status(401).json({ message: 'Token Expired', success: false });
  }

  res.status(err.status ?? 500).json({
    message: err.message || 'Internal Server Error',
    success: false,
  });
};
