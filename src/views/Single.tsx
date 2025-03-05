import {MediaItemWithOwner} from 'hybrid-types/DBTypes';
import {Alert, ScrollView, StyleSheet, Text} from 'react-native';
import {Button, Card, ListItem} from '@rneui/base';
import {
  Calendar,
  File,
  User,
  MessageCircle,
  ImageIcon,
} from 'lucide-react-native';
import {NavigatorType} from '../types/localTypes';
import {Link, RouteProp, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMedia} from '../hooks/apiHooks';
import {useUpdateContext, useUserContext} from '../hooks/ContextHooks';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useState} from 'react';
import VideoPlayer from '../components/VideoPlayer';
import Comments from '../components/Comments';
import Likes from '../components/Likes';
import React from 'react';
import {Image} from '@rneui/base';

type SingleProps = {
  route: RouteProp<NavigatorType, 'Single'>;
};

// TODO: check route type
const Single = ({route}: SingleProps) => {
  const item: MediaItemWithOwner = route.params.item;
  const {deleteMedia} = useMedia();
  const {triggerUpdate} = useUpdateContext();
  const navigation = useNavigation<NativeStackNavigationProp<NavigatorType>>();
  const {user} = useUserContext();
  const [expanded, setExpanded] = useState(false);

  const handleDelete = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        return;
      }
      Alert.alert('Delete', 'Are you sure?', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              const result = await deleteMedia(item.media_id, token);
              console.log(result);
              triggerUpdate();
              navigation.goBack();
            } catch (e) {
              console.log((e as Error).message);
              Alert.alert(
                'Delete failed',
                (e as Error).message || 'Unknown error',
              );
            }
          },
        },
      ]);
    } catch (error) {
      console.error((error as Error).message);
    }
  };

  return (
    <ScrollView>
      <Card>
        <Card.Title>{item.title}</Card.Title>
        <Card.Divider />
        {item.media_type.includes('image') ? (
          <>
            <Image source={{uri: item.filename}} style={styles.image} />
            <Link screen={'Modal'} params={{item}}>
              <Text>View Full Image</Text>
            </Link>
          </>
        ) : (
          <VideoPlayer videoFile={item.filename} style={styles.image} />
        )}

        <ListItem>
          <ListItem.Content></ListItem.Content>
          <ListItem.Content right>
            <Likes item={item} />
          </ListItem.Content>
        </ListItem>
        <ListItem>
          <Text>
            <Calendar size={20} color={'black'}></Calendar>
          </Text>
          <Text>{new Date(item.created_at).toLocaleString('fi-FI')}</Text>
        </ListItem>
        <ListItem>
          <Text>{item.description}</Text>
        </ListItem>
        <ListItem>
          <Text>
            <ImageIcon size={20} color={'black'}></ImageIcon>
          </Text>
          <Text>{item.media_type}</Text>
        </ListItem>
        <ListItem>
          <Text>
            <User size={20} color={'black'} />
          </Text>
          <Text>{item.username}</Text>
        </ListItem>
        <ListItem>
          <Text>
            <File size={20} color={'black'}></File>
          </Text>
          <Text>{Math.round(item.filesize / 1024)} kB</Text>
        </ListItem>

        <ListItem.Accordion
          content={
            <>
              <ListItem.Content>
                <Text>
                  <MessageCircle size={20} color={'black'}></MessageCircle>
                </Text>
              </ListItem.Content>
              <ListItem.Content>
                <ListItem.Title>Comments</ListItem.Title>
              </ListItem.Content>
            </>
          }
          isExpanded={expanded}
          onPress={() => {
            setExpanded(!expanded);
          }}
        >
          <Comments item={item} />
        </ListItem.Accordion>
        <ListItem>
          {user && user.user_id === item.user_id && (
            <Button
              color={'secondary'}
              containerStyle={{width: '100%'}}
              onPress={handleDelete}
            >
              Delete
            </Button>
          )}
        </ListItem>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 500,
  },
});

export default Single;
