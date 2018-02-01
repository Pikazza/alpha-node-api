"use strict";

function UnknownError(error) {
  this.name = "UnknownError";
  this.message = error.message;
  this.inner = error;
}
module.exports = UnknownError;