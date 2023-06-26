import ffmpeg from 'fluent-ffmpeg';
import concat from 'ffmpeg-concat';
import path from 'path';
import os from 'os';
import { promises as fs } from 'fs';
import readImageFiles from './util/file.js';
import sort from './util/sort.js';
import validateOptions from './util/validate.js';

/**
 * Generates a video clip from an image using fluent-ffmpeg.
 *
 * @param {string} imagePath - The path to the image file.
 * @param {string} outputDir - The directory to output the video clip to.
 * @param {number} duration - The duration of the video clip in seconds.
 * @return {Promise<string>} The path to the generated video clip.
 */
async function generateClip(imagePath, outputDir, duration) {
  const outputPath = path.join(outputDir, `${path.basename(imagePath, path.extname(imagePath))}.mp4`);
  
  return new Promise((resolve, reject) => {
    ffmpeg()
      .input(imagePath)
      .inputOptions([
        `-loop 1`,
        `-t ${duration}`
      ])
      .outputOptions('-c:v libx264')
      .output(outputPath)
      .on('end', () => resolve(outputPath))
      .on('error', reject)
      .run();
  });
}

/**
 * Generates a slideshow from the given images with the specified options.
 *
 * @param {string} dirPath - The path to the directory containing the images.
 * @param {object} options - The options for the slideshow.
 * @return {Promise<void>}
 */
async function createSlideshow(dirPath, options) {
  // Read and sort the image files
  const imageFiles = await readImageFiles(dirPath);
  const sortedImageFiles = options.sortMethod === 'creationTime'
    ? await sort.sortByCreationTime(imageFiles)
    : sort.sortAlphabetically(imageFiles);

  // Validate the options
  const validatedOptions = validateOptions(options);

  // Generate video clips from the images
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'ffmpegSlideshow-'));
  const clipPromises = sortedImageFiles.map(imagePath =>
    generateClip(imagePath, tempDir, validatedOptions.imageDuration)
  );
  const clips = await Promise.all(clipPromises);

  // Concatenate the clips with transitions
  await concat({
    output: `${validatedOptions.outputName}.${validatedOptions.outputFormat}`,
    videos: clips,
    transition: {
      name: validatedOptions.transition,
      duration: validatedOptions.transitionDuration,
    },
  });

  // Cleanup the temporary directory
  await fs.rm(tempDir, { recursive: true, force: true });
}

export default createSlideshow;
