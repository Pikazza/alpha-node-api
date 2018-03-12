"use strict";

function ScriptNotFoundError(error) {
 this.name = "ScriptNotFoundError";
 this.message = error;
}
module.exports = ScriptNotFoundError;