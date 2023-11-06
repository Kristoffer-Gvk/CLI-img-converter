### CLI Image converter with Sharp

A CLI app using Sharp to convert images to webp and some other formats.

- Sharp:
  https://github.com/lovell/sharp
  https://sharp.pixelplumbing.com/

### Usage:

- Run this through the terminal by typing "node ." while you are in this programs main directory.
- Make sure to put the file you want to convert into the input folder in the img folder.
- Enter name of the file (including file extension ex: "doggo.jpg") you want to convert when prompted, then select a format from the list with the arrow keys and pressing enter.
- The converted file should be deposited in the output directory as a jpeg, png, webp, avif or tiff file.

- You can also use the -i and -o arguments to name the file to convert and the format to convert to, directly upon running the program; thus skipping the prompts and starting conversion immediately if typed correctly.
- ex: node . -i doggo.jpg -o webp
