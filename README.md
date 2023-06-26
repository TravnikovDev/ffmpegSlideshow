# ffmpegSlideshow

ffmpegSlideshow simplifies the creation of visually engaging slideshows with seamless transitions from a collection of images. While ffmpeg's default capabilities allow for basic slideshow creation, it doesn't support transitions, making for a less smooth and less engaging experience. ffmpegSlideshow bridges this gap by providing an intuitive, simple-to-use wrapper. With ffmpegSlideshow, you can effortlessly convert a folder of images into a dynamic video slideshow, complete with customizable transitions.

## Installation

To install ffmpegSlideshow, use the following command:

```bash
npm install ffmpegslideshow
```

## Usage

Here is a basic example of how to use ffmpegSlideshow:

```js
const slideshow = require('ffmpegslideshow');

const options = {
  transition: 'fade',
  transitionDuration: 1,  // in seconds
  imageDuration: 5,       // in seconds
  outputFormat: 'mp4',
  outputName: 'myslideshow'
};

slideshow('/path/to/images', options)
  .then(() => console.log('Slideshow created!'))
  .catch((error) => console.error('Error creating slideshow:', error));
```

In addition to defining a single transition for all image transitions, you can also specify an array of transitions to use a different transition for each image pair:

```js
const options = {
  transition: ['fade', 'crossfade', 'fadeBlack', 'smpteWipe', 'slide', 'randomDissolve'],
  transitionDuration: 1,  // in seconds
  imageDuration: 5,       // in seconds
  outputFormat: 'mp4',
  outputName: 'myslideshow'
};

slideshow('/path/to/images', options)
  .then(() => console.log('Slideshow created!'))
  .catch((error) => console.error('Error creating slideshow:', error));
```

## API

### slideshow(path, options)

Generates a video slideshow from the images in the specified directory.

#### path

Type: string

The path to the directory containing the images.

#### options

Type: object

The options object can have the following properties:

transition: The type of transition to use between images. Default is 'fade'.
transitionDuration: The duration of the transitions in seconds. Default is 1.
imageDuration: The duration each image is shown in seconds. Default is 5.
outputFormat: The format of the output video file. Default is 'mp4'.
outputName: The name of the output video file. Default is 'slideshow'.

## Contributing

Contributions are welcome! Please read the contributing guidelines first.

## License

MIT
