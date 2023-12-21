import storage from '@react-native-firebase/storage';
import RNFetchBlob from 'rn-fetch-blob';
import { Platform } from 'react-native';

const uploadImage = (path) => {
 // console.log("uri upload image : ", path);
  return new Promise(async (resolve, reject) => {
    try {
      const uri = path;
      const fileName = uri.substring(uri.lastIndexOf('/') + 1);
      const pathForFirebaseStorage = await getPathForFirebaseStorage(uri);

      const storageRef = storage().ref(fileName);

      await storageRef.putFile(pathForFirebaseStorage);
      const downloadURL = await storageRef.getDownloadURL();

      resolve(downloadURL);
    } catch (error) {
      console.warn(error);
      reject(error);
    }
  });
};

const getPathForFirebaseStorage = async (uri) => {
  if (Platform.OS === 'ios') {
    return uri;
  }
  const stat = await RNFetchBlob.fs.stat(uri);
  return stat.path;
};

export default uploadImage;

