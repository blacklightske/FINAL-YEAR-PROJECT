import 'react-native-gesture-handler';
import {
  NavigationContainer,
  useNavigation,
  DrawerActions,
} from '@react-navigation/native';
import HomeScreen from './Screens/HomeScreen';
import ProfileScreen from './Screens/ProfileScreen';
import UserScreen from './Screens/UserScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Entypo';
import DrawerContent from './DrawerContent';
import SplashScreen from 'react-native-splash-screen';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';
import UpdateProfile from './Screens/UpdateProfile/UpdateProfile';
import AdminScreen from './Screens/Admin/AdminScreen';
import Store from './Screens/store';
import LoginPage from './Screens/Login&Register/Login';
import RegisterPage from './Screens/Login&Register/Register';
import AdminHome from './Screens/Admin/AdminHome';
import ProdUpload from './Screens/Admin/ProdUpload';
import AdminHomeScreen from './Screens/Admin/AdminHome';
import Blog from './Screens/blog';
import 'react-native-gesture-handler';

const toastConfig = {
  success: props => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: 'green',
        borderLeftWidth: 7,
        width: '90%',
        height: 70,
        borderRightColor: 'green',
        borderRightWidth: 7,
      }}
      contentContainerStyle={{paddingHorizontal: 15}}
      text1Style={{
        fontSize: 17,
        fontWeight: '700',
      }}
      text2Style={{
        fontSize: 14,
      }}
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: props => (
    <ErrorToast
      {...props}
      text2NumberOfLines={3}
      style={{
        borderLeftColor: 'red',
        borderLeftWidth: 7,
        width: '90%',
        height: 70,
        borderRightColor: 'red',
        borderRightWidth: 7,
      }}
      contentContainerStyle={{paddingHorizontal: 15}}
      text1Style={{
        fontSize: 17,
        fontWeight: '700',
      }}
      text2Style={{
        fontSize: 14,
      }}
    />
  ),
};

const StackNav = () => {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      screenOptions={{
        statusBarColor: '#0163d2',
        headerShown: false,
        headerStyle: {
          backgroundColor: '#0163d2',
        },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={
          {
            // headerLeft: () => {
            //   return (
            //     <Icon
            //       name="menu"
            //       onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            //       size={30}
            //       color="#fff"
            //     />
            //   );
            // },
          }
        }
      />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen
        name="User"
        component={UserScreen}
        options={{
          headerShown: true,
        }}
      />

      <Stack.Screen
      name="Blog"
      component={Blog}
      options={{
        headerShown: true,
      }}
    />

    <Stack.Screen
      name="Store"
      component={Store}
      options={{
        headerShown: true,
      }}
    />

      <Stack.Screen
        name="UpdateProfile"
        component={UpdateProfile}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="LoginUser" component={LoginNav} />
    </Stack.Navigator>
  );
};

const DrawerNav = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      <Drawer.Screen name="Home" component={StackNav} />
      <Drawer.Screen name="Blog" component={StackNav} /> 
    </Drawer.Navigator>
  );
};

const LoginNav = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={LoginPage} />
      <Stack.Screen name="Register" component={RegisterPage} />
      <Stack.Screen name="Home" component={DrawerNav} />
      <Stack.Screen name="AdminScreen" component={AdminStack} />
      <Stack.Screen name="Blog" component={Blog} />
      <Stack.Screen name="Store" component={Store} /> 
      <Stack.Screen name="ProductUpload" component={ProdUpload} />
      <Stack.Screen name="AdminHome" component={AdminHome} />
      <Stack.Screen name="AdminHomeScreen" component={AdminHomeScreen} />
    </Stack.Navigator>
  );
};

const AdminStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
    
    <Stack.Screen
    options={{
      statusBarColor: '#0163d2',
      headerShown: true,
      headerBackVisible:false,
      headerStyle: {
        backgroundColor: '#0163d2',
      },
      headerTintColor: '#fff',
      headerTitleAlign: 'center',
    }}
    name="AdminHome"
    component={AdminHome}
  />

    
    <Stack.Screen
        options={{
          statusBarColor: '#0163d2',
          headerShown: true,
          headerBackVisible:false,
          headerStyle: {
            backgroundColor: '#0163d2',
          },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
        }}
        name="AdminScreen"
        component={AdminScreen}
      />

     
    <Stack.Screen
    options={{
      statusBarColor: '#0163d2',
      headerShown: true,
      headerBackVisible:false,
      headerStyle: {
        backgroundColor: '#0163d2',
      },
      headerTintColor: '#fff',
      headerTitleAlign: 'center',
    }}
    name="AdminHomeScreen"
    component={AdminHomeScreen}
  />


      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Login"
        component={LoginNav}
      />
    </Stack.Navigator>
  );
};
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setuserType] = useState(false);
  async function getData() {
    const data = await AsyncStorage.getItem('isLoggedIn');
    const userType1 = await AsyncStorage.getItem('userType');
    console.log(data, 'at app.jsx');
    setIsLoggedIn(data);
    setuserType(userType1);
  }

  useEffect(() => {
    getData();
    setTimeout(() => {
      SplashScreen.hide();
    }, 900);
  }, [isLoggedIn]);

  return (
    <NavigationContainer>
      {isLoggedIn && userType == 'Admin' ? (
        <AdminStack />
      ) : isLoggedIn ? (
        <DrawerNav />
      ) : (
        <LoginNav />
      )}
      <Toast config={toastConfig} />
    </NavigationContainer>
  );
}
export default App;
