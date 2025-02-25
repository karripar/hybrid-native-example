import {View, Text, FlatList} from 'react-native';
import {useMedia} from '../hooks/apiHooks';
import MediaListItem from '../components/MediaListItem';

const Home = () => {
  const {mediaArray} = useMedia();

  return (
    <View>
      <Text style={{color: "#fff"}}>Media Sharing App</Text>
      <FlatList
        data={mediaArray}
        renderItem={({item}) => <MediaListItem item={item} />}
      ></FlatList>
    </View>
  );
};

export default Home;
