import fs from 'fs/promises';
import path from 'path';

// Supported image formats
const IMAGE_FORMATS = ['jpeg', 'jpg', 'png'];

/**
 * Reads image files from the specified directory.
 *
 * @param {string} dirPath - The path to the directory.
 * @return {Promise<string[]>} The paths to the image files.
 */
async function readImageFiles(dirPath) {
  let entries;

  try {
    entries = await fs.readdir(dirPath, { withFileTypes: true });
  } catch (error) {
    throw new Error(`Cannot read directory at path: ${dirPath}`);
  }

  const imageFiles = entries
    .filter(
      (entry) =>
        entry.isFile() &&
        IMAGE_FORMATS.includes(path.extname(entry.name).slice(1)) // Remove the '.' from the extension
    )
    .map((entry) => path.join(dirPath, entry.name));

  if (imageFiles.length === 0) {
    throw new Error(`No image files found at path: ${dirPath}`);
  }

  return imageFiles;
}

export default readImageFiles;
