import {MediaItemWithOwner} from 'hybrid-types/DBTypes';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Video} from 'expo-av';
import {Card, ListItem} from '@rneui/base';
import {Calendar, File, User, AlignLeft} from 'lucide-react-native';

// TODO: check route type
const Single = ({route}: any) => {
  const item: MediaItemWithOwner = route.params;
  return (
    <ScrollView>
    <Card>
      <Card.Title>{item.title}</Card.Title>
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
        <ListItem>
          <Calendar size={30} color="black" />
          <Text>
            Created at: {new Date(item.created_at).toLocaleString('fi-FI')}
          </Text>
        </ListItem>
        <ListItem>
          <User size={30} color="black" />
          <Text>Owner: {item.username}</Text>
        </ListItem>
        <ListItem>
          <AlignLeft size={30} color="black" />
          <Text>{item.description}</Text>
        </ListItem>
        <ListItem>
          <File size={30} color="black" />
          <Text>Filesize: {item.filesize}</Text>
        </ListItem>
        <View></View>
      </View>
      <View>
        <View>
          <Text>Comments</Text>
        </View>
      </View>
    </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 300,
  },
});

export default Single;
