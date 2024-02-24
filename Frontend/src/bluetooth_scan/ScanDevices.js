import React, { useState, useEffect, useDeferredValue } from 'react';
import {
    Text,
    Alert,
    View,
    FlatList,
    Platform,
    StatusBar,
    SafeAreaView,
    NativeModules,
    useColorScheme,
    TouchableOpacity,
    NativeEventEmitter,
    PermissionsAndroid,
    ScrollView,
} from 'react-native';
import BleManager from 'react-native-ble-manager';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import DeviceList from './DeviceList';
import { styles } from './styles/styles';

const BleManagerModule = NativeModules.BleManager;
const BleManagerEmitter = new NativeEventEmitter(BleManagerModule);
// const manager=new BleManager();

function ScanDevices() {
    // const manager=BleManager()
    const peripherals = new Map();
    const [isScanning, setIsScanning] = useState(false);
    const [connectedDevices, setConnectedDevices] = useState([]);
    const [discoveredDevices, setDiscoveredDevices] = useState([]);
    const handleGetConnectedDevices = () => {
        BleManager.getBondedPeripherals([]).then(results => {
            for (let i = 0; i < results.length; i++) {
                let peripheral = results[i];
                if(peripheral.name==="Ace Phone"){
                    console.log(peripheral)
                    BleManager.createBond(peripheral.id)
                    .then(()=>{
                        console.log("paired")
                        // let originalServiceUUID = 0x180D
                        // let service_uuid=originalServiceUUID.subst
                        BleManager.read(peripheral.id, "180D", '2A37').then((value)=>{
                            console.log("value is",value)
                        })
                        .catch((err)=>{
                            console.log(err,"error is ")
                        })
                    })
                    .catch((error)=>{
                        console.log("error is",error)
                    })
                }
                peripheral.connected = true;
                peripherals.set(peripheral.id, peripheral);
                setConnectedDevices(Array.from(peripherals.values()));
            }
        })
       
    };
    useEffect(() => {
        BleManager.enableBluetooth().then(() => {
            console.log('Bluetooth is turned on!');
        });
        BleManager.start({ showAlert: false }).then(() => {
            console.log('BleManager initialized');
            handleGetConnectedDevices();
        });
        let stopDiscoverListener = BleManagerEmitter.addListener(
            'BleManagerDiscoverPeripheral',
            peripheral => {
                peripherals.set(peripheral.id, peripheral);
                setDiscoveredDevices(Array.from(peripherals.values()));
            },
        );
        let stopConnectListener = BleManagerEmitter.addListener(
            'BleManagerConnectPeripheral',
            peripheral => {
                console.log('BleManagerConnectPeripheral:', peripheral);
            },
        );
        let stopScanListener = BleManagerEmitter.addListener(
            'BleManagerStopScan',
            () => {
                setIsScanning(false);
                console.log('scan stopped');
            },
        );
        if (Platform.OS === 'android' && Platform.Version >= 23) {
            PermissionsAndroid.check(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            ).then(result => {
                if (result) {
                    console.log('Permission is OK');
                } else {
                    PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    ).then(result => {
                        if (result) {
                            console.log('User accepted');
                        } else {
                            console.log('User refused');
                        }
                    });
                }
            });
        }
     
        return () => {
            // stopDiscoverListener;
            stopDiscoverListener.remove();
            stopConnectListener.remove();
            stopScanListener.remove();
        };

    },[isScanning]);

    const startScan = () => {
        if (!isScanning) {
            BleManager.scan([], 5, true)
                .then(() => {
                    console.log('Scanning...');
                    setIsScanning(true);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    };
    // pair with device first before connecting to it
    const connectToPeripheral = peripheral => {
        BleManager.createBond(peripheral.id)
            .then(() => {
                peripheral.connected = true;
                peripherals.set(peripheral.id, peripheral);
                setConnectedDevices(Array.from(peripherals.values()));
                setDiscoveredDevices(Array.from(peripherals.values()));
                console.log('BLE device paired successfully');
            })
            .catch(() => {
                console.log('failed to bond');
            });
    };
    // disconnect from device
    const disconnectFromPeripheral = peripheral => {
        BleManager.removeBond(peripheral.id)
            .then(() => {
                peripheral.connected = false;
                peripherals.set(peripheral.id, peripheral);
                setConnectedDevices(Array.from(peripherals.values()));
                setDiscoveredDevices(Array.from(peripherals.values()));
                Alert.alert(`Disconnected from ${peripheral.name}`);
            })
            .catch(() => {
                console.log('fail to remove the bond');
            });
    };
    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };
    // render list of bluetooth devices
    return (
        <SafeAreaView style={[backgroundStyle, styles.container]}>
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={backgroundStyle.backgroundColor}
            />
            <View style={{ pdadingHorizontal: 20 }}>
                <Text
                    style={[
                        styles.title,
                        { color: isDarkMode ? Colors.white : Colors.black },
                    ]}>
                    React Native BLE Manager Tutorial
                </Text>
                <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.scanButton}
                    onPress={startScan}>
                    <Text style={styles.scanButtonText}>
                        {isScanning ? 'Scanning...' : 'Scan Bluetooth Devices'}
                    </Text>
                </TouchableOpacity>
                <Text
                    style={[
                        styles.subtitle,
                        { color: isDarkMode ? Colors.white : Colors.black },
                    ]}>
                    Discovered Devices:
                </Text>
                {discoveredDevices.length > 0 ? (
                    <FlatList
                        data={discoveredDevices}
                        renderItem={({ item }) => (
                            <DeviceList
                                peripheral={item}
                                connect={connectToPeripheral}
                                disconnect={disconnectFromPeripheral}
                            />
                        )}
                        keyExtractor={item => item.id}
                    />
                ) : (
                    <Text style={styles.noDevicesText}>No Bluetooth devices found</Text>
                )}
                <Text
                    style={[
                        styles.subtitle,
                        { color: isDarkMode ? Colors.white : Colors.black },
                    ]}>
                    Connected Devices:
                </Text>
                {connectedDevices.length > 0 ? (
                    <FlatList
                        data={connectedDevices}
                        renderItem={({ item }) => (
                            <DeviceList
                                peripheral={item}
                                connect={connectToPeripheral}
                                disconnect={disconnectFromPeripheral}
                            />
                        )}
                        keyExtractor={item => item.id}
                    />
                ) : (
                    <Text style={styles.noDevicesText}>No connected devices</Text>
                )}
            </View>
        </SafeAreaView>
    );
};

export default ScanDevices
