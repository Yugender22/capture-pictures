import type { Result } from '../model/Result';
import { useEffect, useState } from 'react';
import { Option } from './Option';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  steps: number;
  onCaptureComplete: (result: Array<Result>) => void;
}

export const CapturePictures = ({ steps, onCaptureComplete }: Props) => {
  const [imageUris, setImageUris] = useState<Array<Result>>([]);
  const [options, setOptions] = useState<Array<number>>();

  useEffect(() => {
    if (imageUris.length === 4) {
      onCaptureComplete(imageUris);
    }
  }, [imageUris, onCaptureComplete]);

  useEffect(() => {
    const opts: number[] = [];
    for (let i = 1; i <= steps; i++) {
      opts.push(i);
    }
    setOptions(opts);
  }, [steps]);

  const onCapture = (result: string) => {
    setImageUris((prevUris) => [...prevUris, { result }]);
  };

  const renderOptions = () => {
    return options?.map((option: number) => (
      <Option key={option} step={option} onCapture={onCapture} />
    ));
  };

  return (
    <View>
      <Text style={styles.text}>Capture Pictures</Text>
      <View style={styles.container}>{renderOptions()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    alignSelf: 'center',
    paddingVertical: 16,
    width: '100%',
    fontWeight: 600,
    textAlign: 'center',
    backgroundColor: '#d3d3d3',
  },
  container: {
    padding: 16,
  },
});
