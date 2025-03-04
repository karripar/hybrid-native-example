import {Button, Card, Input} from '@rneui/base';
import React, { useEffect, useState } from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Image} from '@rneui/base';
import {Alert, StyleSheet} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import VideoPlayer from '../components/VideoPlayer';
import { useFile, useMedia } from '../hooks/apiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigatorType } from '../types/localTypes';

type UploadInputs = {
  title: string;
  description: string;
};

const UploadForm = () => {
  const initValues: UploadInputs = {title: '', description: ''};
  const [image, setImage] = useState<ImagePicker.ImagePickerResult | null>(null);
  const {postExpoFile, loading} = useFile();
  const {postMedia} = useMedia();
  const navigation = useNavigation<NativeStackNavigationProp<NavigatorType>>();
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset
  } = useForm({
    defaultValues: initValues,
  });

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      quality: 0.4
    });

    console.log(result);

    if (!result.canceled) {
      // TODO: Display the image in the <Image> component
      setImage(result);
    }
  };

  const resetForm = () => {
    reset(initValues);
    setImage(null);
  };

  const doUpload = async (inputs: UploadInputs) => {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      Alert.alert('Not logged in', 'Please log in to upload');
      return;
    }
    if (!image || !image.assets) {
      Alert.alert(
        'No file selected',
        'Please select a file before uploading',
      );
      return;
    }

    try {
      const fileResponse = await postExpoFile(image.assets[0].uri, token);
      console.log('file', fileResponse);

      const mediaResponse = await postMedia(fileResponse, inputs, token);
      console.log('media', mediaResponse);
      if (mediaResponse) {
        Alert.alert('Media uploaded', mediaResponse.message);

        // Reset the form
        resetForm();
        navigation.navigate('All Media');
      }


    } catch (error) {
      console.error('postExpoFile error', error);
      Alert.alert('File upload failed');
    }

  };

  useEffect(() => {
    const unSubscribe = navigation.addListener('blur', () => {
      resetForm();
    });
    return () => {
      unSubscribe();
    }
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  , []);

  return (
    <Card>
      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'is required'},
          minLength: {value: 3, message: 'minimum length is 3'},
          maxLength: {value: 100, message: 'maximum length is 100'},
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Title"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            errorMessage={errors.title?.message}
          />
        )}
        name="title"
      />

      <Controller
        control={control}
        rules={{
          minLength: {value: 3, message: 'minimum length is 5'},
          required: {value: false, message: 'is required'},
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Description"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorMessage={errors.description?.message}
          />
        )}
        name="description"
      />
      {image?.assets && image.assets[0].type === 'video' ? (
        <VideoPlayer videoFile={image.assets[0].uri} style={styles.image}/>
      ) : (
        <Image
          source={{
            uri: image?.assets ? image.assets[0].uri : 'https://placehold.co/500x200@2x/grey/white/png?text=Choose+File',
          }}
          style={styles.image}
          onPress={pickImage}
        ></Image>
      )}
      <Button
        title="Upload"
        loading={loading}
        onPress={handleSubmit(doUpload)}
        containerStyle={{marginBottom: 20}}
      ></Button>
      <Button title="Reset" onPress
      ={resetForm} />
    </Card>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 200,
    marginBottom: 20,
  },
});

export default UploadForm;
