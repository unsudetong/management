const logging = (req, res, next) => {
  console.log('here');
  next();
};

export default logging;
