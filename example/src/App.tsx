import { useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  Text,
  Button,
  SafeAreaView,
} from 'react-native';
import { CapturePictures, type Result } from 'capture-pictures';

export default function App() {
  const [imageUris, setImageUris] = useState<Result[]>([]);
  const width = Dimensions.get('screen').width - 32;

  const renderFooter = () => (
    <Button title="Recapture" onPress={() => setImageUris([])} />
  );

  const renderItem = (item: Result) => {
    return (
      <View style={styles.item}>
        <Image width={width} height={width} source={{ uri: item.result }} />
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        {imageUris.length ? (
          <FlatList
            data={imageUris}
            renderItem={({ item }) => renderItem(item)}
            ListFooterComponent={renderFooter}
            ListHeaderComponent={
              <Text style={styles.title}>Captured Photos</Text>
            }
          />
        ) : (
          <CapturePictures
            steps={4}
            onCaptureComplete={(result: Result[]) => {
              setImageUris(result);
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
  },
  title: {
    fontSize: 18,
    alignSelf: 'center',
    paddingVertical: 16,
    width: '100%',
    fontWeight: 600,
    textAlign: 'center',
    backgroundColor: '#d3d3d3',
  },
});
