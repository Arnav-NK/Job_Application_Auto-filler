export const catchAsyncErr = (theFunction) => {
  return (req, res, next) => {
   
    Promise.resolve(theFunction(req, res, next)).catch(next);
  };
};
