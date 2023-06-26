import path from 'path';
import fs from 'fs/promises';
import createSlideshow from '../slideshow';

describe('createSlideshow', () => {
  const options = {
    transition: 'fade',
    transitionDuration: 1,
    imageDuration: 3,
    outputFormat: 'mp4',
    outputName: 'test_slideshow',
    sortMethod: 'alphabetically',
  };

  test('generates a slideshow video', async () => {
    const dirPath = path.join(__dirname, 'test-images');  // Replace 'images' with the actual path to your test images

    // Call the function to test
    await createSlideshow(dirPath, options);

    // Check if the slideshow video was created
    const videoPath = `${options.outputName}.${options.outputFormat}`;
    const videoExists = await fs.access(videoPath)
      .then(() => true)
      .catch(() => false);

    expect(videoExists).toBe(true);

    // If you want, you can delete the created video after the test
    await fs.unlink(videoPath);
  });

}, 30000); // Increase timeout to 30 seconds

