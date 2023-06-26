// Default values
const DEFAULT_OPTIONS = {
    transition: 'fade',
    transitionDuration: 1,
    imageDuration: 5,
    outputFormat: 'mp4',
    outputName: 'slideshow',
    sortMethod: 'alphabetically',
  };
  
  /**
   * Validates the options provided by the user.
   *
   * @param {object} options - The options provided by the user.
   * @return {object} The validated and normalized options.
   * @throws {TypeError} If an option has an incorrect type.
   * @throws {RangeError} If an option has an incorrect value.
   */
  function validateOptions(options = {}) {
    const finalOptions = { ...DEFAULT_OPTIONS, ...options };
  
    if (typeof finalOptions.transition !== 'string') {
      throw new TypeError(`Option 'transition' must be a string, but received ${typeof finalOptions.transition}`);
    }
  
    if (typeof finalOptions.transitionDuration !== 'number' || finalOptions.transitionDuration <= 0) {
      throw new TypeError(`Option 'transitionDuration' must be a positive number, but received ${finalOptions.transitionDuration}`);
    }
  
    if (typeof finalOptions.imageDuration !== 'number' || finalOptions.imageDuration <= 0) {
      throw new TypeError(`Option 'imageDuration' must be a positive number, but received ${finalOptions.imageDuration}`);
    }
  
    if (typeof finalOptions.outputFormat !== 'string') {
      throw new TypeError(`Option 'outputFormat' must be a string, but received ${typeof finalOptions.outputFormat}`);
    }
  
    if (typeof finalOptions.outputName !== 'string') {
      throw new TypeError(`Option 'outputName' must be a string, but received ${typeof finalOptions.outputName}`);
    }
  
    if (typeof finalOptions.sortMethod !== 'string') {
      throw new TypeError(`Option 'sortMethod' must be a string, but received ${typeof finalOptions.sortMethod}`);
    }
  
    return finalOptions;
  }
  
  export default validateOptions;
  