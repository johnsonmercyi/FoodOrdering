import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Stack, withLayoutContext } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const TopTabs = withLayoutContext(createMaterialTopTabNavigator().Navigator);

export default function OrderListNavigator() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Orders",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: "white" },
        }}
      />
      <TopTabs>
        <TopTabs.Screen name="index" options={{ title: "Active" }} />
      </TopTabs>
    </>
  );
}
