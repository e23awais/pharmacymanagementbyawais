import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import MainScreen from './MainScreen';
import ManagerScreen from './ManagerScreen';
import PharmacistScreen from './PharmacistScreen';
import AddMedicine from './AddMedicine';
import SearchMedicine from './SearchMedicine';
import UpdateMedicine from './UpdateMedicine';
import DeleteMedicine from './DeleteMedicine';
import InvoiceScreen from './InvoiceScreen';
import ExpireSoonScreen from './ExpireSoonScreen';
import CashierScreen from './CashierScreen';
import SalesReportScreen from './SalesReportScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MainScreen" component={MainScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ManagerScreen" component={ManagerScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PharmacistScreen" component={PharmacistScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AddMedicine" component={AddMedicine} options={{ headerShown: false }} />
        <Stack.Screen name="SearchMedicine" component={SearchMedicine} options={{ headerShown: false }} />
        <Stack.Screen name="UpdateMedicine" component={UpdateMedicine} options={{ headerShown: false }} />
        <Stack.Screen name="DeleteMedicine" component={DeleteMedicine} options={{ headerShown: false }} />
        <Stack.Screen name="InvoiceScreen" component={InvoiceScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ExpireSoonScreen" component={ExpireSoonScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CashierScreen" component={CashierScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SalesReportScreen" component={SalesReportScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
