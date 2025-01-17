import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'capture-pictures' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const CapturePictures = NativeModules.CapturePictures
  ? NativeModules.CapturePictures
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export const captureImage = (): Promise<string> => {
  return CapturePictures.captureImage();
};

export * from './components/CapturePictures';
export * from './model/Result';
