"use strict";

function GraphNotFoundError(error) {
 this.name = "GraphNotFoundError";
 this.message = error;
}
module.exports = GraphNotFoundError;