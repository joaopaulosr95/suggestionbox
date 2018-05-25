#!/usr/bin/env node

import * as http from "http";
import * as Mongoose from "mongoose";
import { app } from "../app";
import { serverPort } from "../config";

app.set("port", serverPort);

const server = http.createServer(app);

server.listen(serverPort);
server.on("error", onError);
server.on("listening", onListening);

/**
 * Event listener for HTTP server 'error' event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof serverPort === "string"
    ? "Pipe " + serverPort
    : "Port " + serverPort;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server 'listening' event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string"
    ? "pipe " + addr
    : "port " + addr.port;
}

process.on("SIGINT", () => {
  Mongoose.connection.close(() => {
    console.log("Gracefully disconnected from MongoDB");
    console.log("App terminating...");
    process.exit(0);
  });
});