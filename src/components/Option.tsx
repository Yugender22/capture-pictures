import { captureImage } from 'capture-pictures';
import { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

interface Props {
  step: number;
  onCapture: (uri: string) => void;
}

export const Option = ({ step, onCapture }: Props) => {
  const [imageUri, setImageUri] = useState<string>();
  const [error, setError] = useState<boolean>(false);
  const handleCaptureImage = async () => {
    captureImage()
      .then((result) => {
        setImageUri(result);
        onCapture(result);
        setError(false);
      })
      .catch((error) => {
        console.log('error', error);
        setError(true);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <Text style={styles.text}>{`Capture image ${step}`}</Text>
        {imageUri && <Text style={styles.successText}>Captured</Text>}
        {error && <Text style={styles.errorText}>Retry</Text>}
      </View>
      <Button title="Capture" onPress={handleCaptureImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
  },
  successText: {
    color: '#00FF00',
  },
  errorText: {
    color: '#FF0000',
  },
});
