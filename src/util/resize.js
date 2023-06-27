import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

async function resizeImages(imageDir) {
  // Create resized directory if it doesn't exist
  const resizedDirPath = path.join(imageDir, "resized");
  await fs.mkdir(resizedDirPath, { recursive: true });

  // Read all files in the directory
  const files = await fs.readdir(imageDir);

  // Filter to get only the image files (this example assumes .jpg, modify as necessary)
  const imageFiles = files.filter(
    (file) =>
      path.extname(file).toLowerCase() === ".jpg" ||
      path.extname(file).toLowerCase() === ".jpeg" ||
      path.extname(file).toLowerCase() === ".png"
  );

  // Get the dimensions of all images
  const dimensions = await Promise.all(
    imageFiles.map((file) =>
      sharp(path.join(imageDir, file))
        .metadata()
        .then((metadata) => ({
          width: metadata.width,
          height: metadata.height,
        }))
    )
  );

  // Find the largest width and height
  const maxWidth = Math.max(...dimensions.map((dim) => dim.width));
  const maxHeight = Math.max(...dimensions.map((dim) => dim.height));

  // Resize all images to the largest width and height
  await Promise.all(
    imageFiles.map((file) =>
      sharp(path.join(imageDir, file))
        .resize(maxWidth, maxHeight, {
          fit: "contain",
          background: { r: 0, g: 0, b: 0 },
        }) // Fill with white background
        .toFile(path.join(resizedDirPath, file))
    )
  );
}

export default resizeImages;
