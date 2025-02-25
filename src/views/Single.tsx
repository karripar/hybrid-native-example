import {MediaItemWithOwner} from 'hybrid-types/DBTypes';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Video} from 'expo-av';

const Single = ({route}: any) => {
  const item: MediaItemWithOwner = route.params;
  return (
    <View>
      <Text>{item.title}</Text>
      <View>
        {item.media_type.includes('image') ? (
          <Image style={styles.image} src={item.filename} />
        ) : (
          <Video
            style={styles.image}
            source={{uri: item.filename}}
            useNativeControls
          />
        )}
      </View>
      <View>
        <Text>Owner: {item.username}</Text>
        <Text>{item.description}</Text>
        <Text>
          Created at: {new Date(item.created_at).toLocaleString('fi-FI')}
        </Text>
        <Text>Filesize: {item.filesize}</Text>
        <View></View>
      </View>
      <View>
        <View>
          <Text>Comments</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 300,
  },
});

export default Single;
