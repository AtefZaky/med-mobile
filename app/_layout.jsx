import { useEffect } from "react";
import { useFonts } from "expo-font";
import "react-native-url-polyfill/auto";
import { SplashScreen, Stack } from "expo-router";

import GlobalProvider from "../context/GlobalProvider";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "Tajawal-Bold": require("../assets/fonts/Tajawal-Bold.ttf"),
    "Tajawal-Light": require("../assets/fonts/Tajawal-Light.ttf"),
    "Tajawal-Medium": require("../assets/fonts/Tajawal-Medium.ttf"),
    "Tajawal-Regular": require("../assets/fonts/Tajawal-Regular.ttf"),
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded) {
    return null;
  }

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <GlobalProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(operator)" options={{ headerShown: false }} />
      </Stack>
    </GlobalProvider>
  );
};

export default RootLayout;