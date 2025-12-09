import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import AdicionarJogo from "../screens/AdicionarJogo";
import BibliotecaGrid from "../screens/BibliotecaGrid";
import DetalhesJogo from "../screens/DetalhesJogo";
import HomeScreen from "../screens/HomeScreen";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: true }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Biblioteca" component={BibliotecaGrid} />
        <Stack.Screen name="DetalhesJogo" component={DetalhesJogo} />
        <Stack.Screen name="AdicionarJogo" component={AdicionarJogo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
