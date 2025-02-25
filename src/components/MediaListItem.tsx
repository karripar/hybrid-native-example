import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {MediaItemWithOwner} from 'hybrid-types/DBTypes';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

type MediaItemProps = {
  item: MediaItemWithOwner;
  navigation: NavigationProp<ParamListBase>;
};

const MediaListItem = ({item, navigation}: MediaItemProps) => {
  return (
    <TouchableOpacity style={styles.listItem} onPress={() => {
      navigation.navigate('Single', item);
    }}>
      <Image
        style={styles.img}
        source={{
          uri:
            item.thumbnail ||
            (item.screenshots ? item.screenshots[0] : ''),
        }}
      />
      <View style={styles.desc}>
        <Text style={styles.heading}>{item.title}</Text>
        <Text>{ new Date(item.created_at).toLocaleDateString('fi-FI') }</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create( {
  listItem: {
    padding: 10,
    margin: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },

  desc: {
    marginLeft: 10,
  },

  heading: {
    fontSize: 18,
    fontWeight: 'bold' as 'bold',
  },

  img: {
    width: 250,
    height: 250,
    borderRadius: 10,
  },
});

export default MediaListItem;
