import { getTimeAgo } from "@/assets/dateUtil";
import { Order } from "@/assets/types";
import Colors from "@/src/constants/Colors";
import { Link, useSegments } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

type OrderItemProps = {
  order: Order;
  orderNo: string | number;
};

const OrderListItem = ({ order, orderNo }: OrderItemProps) => {
  const segments = useSegments();
  return (
    <Link href={`${segments[0]}/orders/${order.id}?orderNo=${orderNo}`} asChild>
      <Pressable style={styles.container}>
        <View style={styles.details}>
          <Text style={styles.orderNo}>Order #{orderNo}</Text>
          <Text style={styles.createAt}>{getTimeAgo(order.created_at)}</Text>
        </View>
        <Text style={styles.status}>{order.status}</Text>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.background,
    borderRadius: 10,
    flexDirection: "row",
  },
  details: {
    flex: 1,
    padding: 10,
    gap: 5,
  },
  orderNo: {
    fontWeight: "bold",
  },
  createAt: {
    color: "gray",
  },
  status: {
    fontWeight: "500",
    padding: 10,
    textAlignVertical: "center",
    textAlign: "center",
  },
});

export default OrderListItem;
