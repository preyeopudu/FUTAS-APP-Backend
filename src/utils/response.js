class response {
  static success = (res, { message, data }, status = 200) => {
    return res.status(status).json({
      success: true,
      message,
      data,
    });
  };

  static error = (res, { message, data }, status = 500) => {
    return res.status(status).json({
      success: false,
      message,
      data,
    });
  };
}

module.exports = response;
