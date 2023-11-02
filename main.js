#!/usr/bin/env node
//imports
//import yargs from "yargs";
import inquirer from "inquirer";
import sharp from "sharp";
import path from "path";

//const options =

let inputImg;

async function setInput() {
  const answers = await inquirer.prompt({
    name: "input_file",
    type: "input",
    message: "which file do you want to convert?",
  });
  inputImg = `img/input/${answers.input_file}`;
}

await setInput();
await sharp(inputImg).toFile(`img/output/${path.parse(`./img/input/${inputImg}`).name}.webp`);
