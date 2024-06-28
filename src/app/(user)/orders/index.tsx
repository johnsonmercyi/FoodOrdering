import { FlatList, Text, View } from "react-native";
import orders from "@/assets/data/orders";
import { Stack } from "expo-router";
import OrderListItem from "@/src/components/OrderListItem/OrderListItem";

const OrdersScreen = () => {
  return (
    <View>
      <Stack.Screen options={{ title: "Orders" }} />
      <FlatList
        contentContainerStyle={{ padding: 10, gap: 10}}
        data={orders}
        renderItem={({ item, index }) => (
          <OrderListItem order={item} orderNo={(index += 1)} />
        )}
      />
    </View>
  );
};

export default OrdersScreen;
