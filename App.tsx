import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { GlobalStyles } from './constants/styles';
import { RootStackParamList } from './interfaces/types';
import AllExpenses from './screens/AllExpenses';
import ExpensesContextProvider from './store/expenses-context';
import IconButton from './components/UI/IconButton';
import ManageExpense from './screens/ManageExpense';
import RecentExpenses from './screens/RecentExpenses';

const Stack = createNativeStackNavigator<RootStackParamList>();
const BottomTabs = createBottomTabNavigator<RootStackParamList>();

interface BottomTabScreenOptions {
  route: RouteProp<Record<string, object | undefined>, string>;
  navigation: BottomTabNavigationProp<RootStackParamList>;
}

const ExpensesOverview = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }: BottomTabScreenOptions) => ({
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: 'white',
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({ tintColor }) => (
          <IconButton
            icon='add'
            size={24}
            color={tintColor}
            onPress={() => {
              navigation.navigate('ManageExpense');
            }}
          />
        ),
      })}>
      <BottomTabs.Screen
        name='RecentExpenses'
        component={RecentExpenses}
        options={{
          title: 'Recent Expenses',
          tabBarLabel: 'Recent',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='hourglass' size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name='AllExpenses'
        component={AllExpenses}
        options={{
          title: 'All Expenses',
          tabBarLabel: 'All Expenses',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='calendar' size={size} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
};

export default function App() {
  return (
    <>
      <StatusBar style='light' />
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
              headerTintColor: 'white',
            }}>
            <Stack.Screen
              name='ExpensesOverview'
              component={ExpensesOverview}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name='ManageExpense'
              component={ManageExpense}
              options={{
                // title: 'Manage Expense' I'll config the title in the ManageExpense component
                presentation: 'modal',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}
