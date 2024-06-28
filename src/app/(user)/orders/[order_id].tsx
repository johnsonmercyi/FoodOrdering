import OrderListItem from "@/src/components/OrderListItem/OrderListItem";
import { Stack, useLocalSearchParams } from "expo-router";
import { FlatList, StyleSheet, Text, View } from "react-native";
import orders from "@/assets/data/orders";
import { Order } from "@/assets/types";
import OrderItemListItem from "@/src/components/OrderItemListItem/OrderItemListItem";

const OrderDetailsScreen = () => {
  const { order_id, orderNo } = useLocalSearchParams();
  const order: Order | undefined = orders.find(
    (order) => order.id === Number(order_id)
  );
  if (!order) {
    return <Text>Order not found!</Text>
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Order #${orderNo}` }} />

      <FlatList
        contentContainerStyle={styles.orderListItems}
        data={order.order_items}
        renderItem={({ item }) => <OrderItemListItem orderListItem={item} />}
        ListHeaderComponent={
          <OrderListItem order={order} orderNo={Number(orderNo)} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
  orderListItems: {
    gap: 10,
  },
});
export default OrderDetailsScreen;
