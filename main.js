#!/usr/bin/env node
//imports
import yargs from "yargs";
import inquirer from "inquirer";
import sharp from "sharp";
import path from "path";
import chalk from "chalk";
import fs from "fs";

const options = yargs
  .option("i", { alias: "input", describe: "File to use as input", type: "string" })
  .option("o", { alias: "output", describe: "Desired output format", type: "string" }).argv;

let inputImg;
let outFormat;
let files = [];

async function getInputFiles() {
  files = [];
  files = fs.readdirSync("./img/input");
  return files;
}

async function userInstructions() {
  if (!options.input || !options.output) {
    console.log(`
  ${chalk.bgRed("HOW TO USE:")}
  1. Put the file you want to convert into the input folder in the img folder.
  2. Select which file you want to convert from the list with the arrow keys and pressing enter. The files listed will be the ones in the input folder.
  3. Select your desired output format from the list with the arrow keys and pressing enter, then wait for the conversion to complete.
  
  Available formats: avif, tiff, jpeg, png, webp.

  ${chalk.magenta(
    `You can also use the -i and -o arguments when running this program to name the file and outputs directly if you want to.\n
    ex: node . -i doggo.jpg -o webp`
  )}
  
  `);
  }
}

async function setInput() {
  if (!options.input) {
    const answers = await inquirer.prompt({
      name: "input_file",
      type: "input",
      message: "which file do you want to convert?\n",
    });
    inputImg = `img/input/${answers.input_file}`;
  } else {
    inputImg = `img/input/${options.input}`;
  }
}
async function selectFile() {
  if (!options.input) {
    const inputFiles = await getInputFiles();
    const answers = await inquirer.prompt({
      name: "input_file",
      type: "list",
      message: "which file do you want to convert?\n",
      choices: inputFiles,
    });
    inputImg = `img/input/${answers.input_file}`;
  } else {
    inputImg = `img/input/${options.input}`;
  }
}

async function setFormat() {
  if (!options.output) {
    const answers = await inquirer.prompt({
      name: "format",
      type: "list",
      message: "What format do you want to convert to?\n",
      choices: ["jpeg", "png", "webp", "avif", "tiff"],
    });
    outFormat = answers.format;
  } else {
    outFormat = options.output;
  }
}

async function convert() {
  console.log("Converting...");
  try {
    sharp(inputImg).toFile(
      `img/output/${path.parse(`./img/input/${inputImg}`).name}.${outFormat}`
    );
    console.log("Done!");
  } catch (err) {
    console.error(err);
  }
}

await userInstructions();
//await setInput();
await selectFile();
await setFormat();
await convert();
