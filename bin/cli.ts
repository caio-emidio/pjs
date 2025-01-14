#!/usr/bin/env node

import { Orchestrator } from "../src";
import { ScriptAdapter } from "../src/adapters/ScriptAdapter";
import { SetupAdapter } from "../src/adapters/SetupAdapter";
import yargs, { Arguments } from "yargs";
import { log, LogCategory } from "../src/lib/log";

// show usage message
const usage = "\nUsage: pjs <alias> <project name>";
yargs
  .usage(usage)
  .option("a", {
    alias: "alias",
    describe: "Alias of a setup configured.",
    type: "string",
    demandOption: false,
  })
  .option("p", {
    alias: "projectName",
    describe: "Name of the project to be created.",
    type: "string",
    demandOption: false,
  })
  .option("l", {
    alias: "listSetups",
    describe: "List all configured setups.",
    type: "string",
    demandOption: false,
  })
  .option("dir", {
    alias: "directory",
    describe: "Show the directory of the configured setups.",
    type: "string",
    demandOption: false,
  })
  .locale("en")
  .help(true).argv;

const setupAdapter = new SetupAdapter();
const scriptAdapter = new ScriptAdapter();

const orchestrator = new Orchestrator(setupAdapter, scriptAdapter);
const args = Object.entries({
  ...(yargs.argv as Arguments),
});

if (Array.isArray(args[0][1]) && args[0][1].length === 0) {
  log(LogCategory.INFO, "No arguments provided. type 'pjs --help' for more info.");
  process.exit(0);
}

if (args.find(arg => arg[0] === "l" || arg[0] === "listSetups")) {
  orchestrator.listSetups(args[1][1] as string);
}

if (args.find(arg => arg[0] === "dir" || arg[0] === "directory")) {
  orchestrator.getDirectory();
}

orchestrator.execute(yargs.argv as Arguments);
