# capture-pictures

A module that help to capture pictures of any object and returns the list of captured images

## Installation

```sh
yarn add capture-pictures
```

## Usage

```js
import { CapturePictures, type Result } from 'capture-pictures';

// Add this inside the component render
<CapturePictures
  steps={4}
  onCaptureComplete={(result: Result[]) => {
    console.log(result);
  }}
/>
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
