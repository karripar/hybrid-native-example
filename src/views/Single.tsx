import {MediaItemWithOwner} from 'hybrid-types/DBTypes';
import {Image, Text, View} from 'react-native';

const Single = ({route}) => {
  const item: MediaItemWithOwner = route.params;
  return (
    <View>
      <Text>{item.title}</Text>
      <View style={{width: 300, height: 300}}>
        <Image
          style={{width: '100%', height: '100%'}}
          source={{uri: item.filename}}
        />
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

export default Single;
