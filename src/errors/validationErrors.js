module.exports = function ValidationError(message) {
  this.name = "Validation error";
  this.message = message;
};
