// This is a simple one file replacement for nodemon
// This script monitors for changes in a folder and runs a build and execute command to help in local devleopment

const fs = require("fs");
const spawn = require("child_process").spawn;

const prnt = console.log;

const OUTPUT_FILE = "build/index.js";

const BUILD_COMMAND = "yarn";
const BUILD_ARGS = ["build"];

const RUN_COMMAND = "node";
const RUN_ARGS = [OUTPUT_FILE];

const WATCH_PATH = "./src/";

var childProc = null;

function getLogTime() {
  return new Date().toISOString().slice(0, -5)
}

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function spawnProcess(cmd, args, exitFunc) {
  const myProc = spawn(cmd, args);
  myProc.stdout.on("data", function (data) {
    process.stdout.write(data.toString());
  });
  myProc.stderr.on("data", function (data) {
    process.stdout.write(data.toString());
  });

  myProc.on("exit", function (code) {
    if (typeof exitFunc === "function") exitFunc(code);
  });

  return myProc;
}

async function spawnProcessAsync(cmd, args) {
  return new Promise((resolve) => {
    spawnProcess(cmd, args, resolve);
  });
}

async function rerun() {
  if (childProc !== null) childProc.kill("SIGHUP");

  // wait half a second after killing command to rebuild and run again
  await sleep(500);

  prnt(`${getLogTime()} Building app:`);
  const buildProc = await spawnProcessAsync(BUILD_COMMAND, BUILD_ARGS);
  prnt(`exit status: ${buildProc}`);

  if (fs.existsSync(OUTPUT_FILE)) {
    prnt(`${getLogTime()} Running app:`);
    childProc = spawnProcess(RUN_COMMAND, RUN_ARGS);
  } else {
    prnt(`${getLogTime()} Nothing to run`);
  }
}

fs.watch(WATCH_PATH, { recursive: true }, (event, filename) => {
  prnt(event.type);

  if (filename) {
    console.log(`${filename} file Changed`);
    rerun();
  }
});

rerun();
