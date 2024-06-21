import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Link, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/src/components/useColorScheme";
import CartProvider from "../providers/CartProvider";
import { Pressable, Text, View } from "react-native";
import Colors from "../constants/Colors";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <CartProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="cart"
            options={{
              headerRight: () => (
                <View>
                  <Link href="/menu/" asChild>
                    <Pressable
                      style={{
                        alignItems: "center",
                        justifyContent: "flex-end",
                      }}
                    >
                      {({ pressed }) => (
                        <FontAwesome
                          name="cutlery"
                          size={25}
                          color={Colors[colorScheme ?? "light"].tint}
                          style={{
                            opacity: pressed ? 0.5 : 1,
                            marginRight: 15,
                          }}
                        />
                      )}
                    </Pressable>
                  </Link>
                  {/* <Text style={{ fontSize: 11 }}>Menu</Text> */}
                </View>
              ),
              presentation: "modal",
              title: "Shopping Cart",
            }}
          />
        </Stack>
      </CartProvider>
    </ThemeProvider>
  );
}
