// index.tsx
import { registerRootComponent } from "expo";
import AppNavigator from "../../src/navigation/AppNavigation";

// registerRootComponent cuida de AppRegistry.registerComponent e compatibilidade com Expo Go
registerRootComponent(AppNavigator);
