import { FlatList, View } from "react-native"
import { useMedia } from "../hooks/apiHooks";
import MediaListItem from "../components/MediaListItem";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { useUserContext } from "../hooks/ContextHooks";


const MyFiles = ({navigation}: {navigation: NavigationProp<ParamListBase>})=> {
  const {user} = useUserContext();
  const {mediaArray} = useMedia(user?.user_id);

  return (
    <View>
      <FlatList
        data={mediaArray}
        renderItem={({item}) => (
          <MediaListItem item={item} navigation={navigation} />
        )}
      />
    </View>
  )
}

export default MyFiles
