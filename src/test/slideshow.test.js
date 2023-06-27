import path from "path";
import fs from "fs/promises";
import createSlideshow from "../slideshow";

describe("createSlideshow", () => {
  const testCases = [
    {
      name: "Fade transition, 0.5s transition duration, 2s image duration",
      options: {
        transition: "fade",
        transitionDuration: 0.5,
        imageDuration: 2,
        outputFormat: "mp4",
        outputName: "test_slideshow_1",
        sortMethod: "alphabetically",
      },
    },
    {
      name: "Slide transition, 1s transition duration, 3s image duration",
      options: {
        transition: "slide",
        transitionDuration: 1,
        imageDuration: 3,
        outputFormat: "mp4",
        outputName: "test_slideshow_2",
        sortMethod: "alphabetically",
      },
    },
    {
      name: "circleOpen transition, 1s transition duration, 1s image duration",
      options: {
        transition: "circleOpen",
        transitionDuration: 1,
        imageDuration: 1,
        outputFormat: "mp4",
        outputName: "test_slideshow_3",
        sortMethod: "alphabetically",
      },
    },
    {
      name: "wipeLeft transition, 0.3s transition duration, 0.5s image duration",
      options: {
        transition: "wipeLeft",
        transitionDuration: 0.6,
        imageDuration: 1.2,
        outputFormat: "mp4",
        outputName: "test_slideshow_4",
        sortMethod: "alphabetically",
      },
    },
    {
      name: "Random transitions, 1s transition duration, 3s image duration",
      options: {
        transition: [
          "wipeLeft",
          "swap",
          "cube",
          "radial",
          "angular",
          "squareswire",
          "dreamy",
          "crosszoom",
          "crosswarp",
          "circleopen",
        ], // Or any other transitions
        transitionDuration: 1,
        imageDuration: 2,
        outputFormat: "mp4",
        outputName: "test_slideshow_random",
        sortMethod: "alphabetically",
      },
    },
    // Add more test cases here
  ];

  testCases.forEach(({ name, options }) => {
    test(
      name,
      async () => {
        const dirPath = path.join(__dirname, "test-images");

        // Call the function to test
        await createSlideshow(dirPath, options);

        // Check if the slideshow video was created
        const videoPath = `${dirPath}/${options.outputName}.${options.outputFormat}`;
        const videoExists = await fs
          .access(videoPath)
          .then(() => true)
          .catch(() => false);

        expect(videoExists).toBe(true);

        // If you want, you can delete the created video after the test
        // await fs.unlink(videoPath);
      },
      30000
    ); // Increase timeout to 30 seconds
  });
});
