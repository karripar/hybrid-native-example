import { Text, View } from "react-native"
import { useUserContext } from "../hooks/ContextHooks";
import { Button, Card, ListItem } from "@rneui/base";
import { AtSign, Calendar} from "lucide-react-native";
import { NavigationProp, ParamListBase } from "@react-navigation/native";

const Profile = ({navigation}: {navigation: NavigationProp<ParamListBase>}) => {
  const {user, handleLogout} = useUserContext();

  return (
    <Card>
      <View>
        <Card.Title>{user?.username}</Card.Title>
        <ListItem>
          <AtSign size={20} color="black" />
          <Text>{user?.email}</Text>
        </ListItem>
        <ListItem>
          <Calendar size={20} color="black" />
          <Text>{new Date(user?.created_at ?? "").toLocaleDateString("fi-FI")}</Text>
        </ListItem>
      </View>
      <Button onPress={handleLogout}>Logout</Button>
      <Button onPress={
        ()=>navigation.navigate("My Files")
      }>My Files</Button>
    </Card>
  )
}

export default Profile
