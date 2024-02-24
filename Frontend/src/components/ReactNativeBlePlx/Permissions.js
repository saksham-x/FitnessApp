import { Platform, PermissionsAndroid } from 'react-native';

const Permissions = async () => {
  console.log("permissions called")
  if (Platform.OS === 'ios') {
    return true;
  }

  if (Platform.OS === 'android' && PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION) {
    const apiLevel = parseInt(Platform.Version.toString(), 10);
    console.log("api level", apiLevel)
    if (apiLevel < 31) {

      console.log("android ")
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
      console.log("grabted", granted)
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }

    if (PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN && PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT) {
      const result = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      ]);

      return (
        result['android.permission.BLUETOOTH_CONNECT'] === PermissionsAndroid.RESULTS.GRANTED &&
        result['android.permission.BLUETOOTH_SCAN'] === PermissionsAndroid.RESULTS.GRANTED &&
        result['android.permission.ACCESS_FINE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED

      );
    }
  }

  // Display an error message if permissions are not granted
  console.error('Permission have not been granted');
  return false;
};

export default Permissions
