import fs from 'fs/promises';

/**
 * Sorts the file paths alphabetically.
 *
 * @param {string[]} files - The file paths.
 * @return {string[]} The sorted file paths.
 */
function sortAlphabetically(files) {
  return [...files].sort((a, b) => a.localeCompare(b));
}

/**
 * Sorts the file paths by the creation time of the files.
 *
 * @param {string[]} files - The file paths.
 * @return {Promise<string[]>} The sorted file paths.
 */
async function sortByCreationTime(files) {
  const fileStats = await Promise.all(
    files.map(async (file) => ({
      file,
      stats: await fs.stat(file),
    }))
  );

  fileStats.sort((a, b) => a.stats.birthtimeMs - b.stats.birthtimeMs);

  return fileStats.map(({ file }) => file);
}

export default { sortAlphabetically, sortByCreationTime };
