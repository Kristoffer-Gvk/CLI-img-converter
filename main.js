#!/usr/bin/env node
//imports
//import yargs from "yargs";
import inquirer from "inquirer";
import sharp from "sharp";
import path from "path";

//const options =

let inputImg;
let outFormat;

async function setInput() {
  const answers = await inquirer.prompt({
    name: "input_file",
    type: "input",
    message: "which file do you want to convert?",
  });
  inputImg = `img/input/${answers.input_file}`;
}

async function setFormat() {
  const answers = await inquirer.prompt({
    name: "format",
    type: "list",
    message: "What format do you want to convert to?\n",
    choices: ["jpeg", "png", "webp", "avif", "tiff"],
  });
  outFormat = answers.format;
}

await setInput();
await setFormat();
await sharp(inputImg).toFile(
  `img/output/${path.parse(`./img/input/${inputImg}`).name}.${outFormat}`
);
