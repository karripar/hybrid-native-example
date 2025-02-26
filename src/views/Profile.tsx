import { Text, View } from "react-native"
import { useUserContext } from "../hooks/ContextHooks";
import { Button, Card } from "@rneui/base";

const Profile = () => {
  const {user, handleLogout} = useUserContext();

  return (
    <Card>
      <View>
        <Text>{user?.username}</Text>
        <Text>{user?.email}</Text>
        <Text>{user?.created_at
          ? new Date(user.created_at).toLocaleString('fi-FI')
          : ''}</Text>
      </View>
      <Button onPress={handleLogout}>Logout</Button>
    </Card>
  )
}

export default Profile
