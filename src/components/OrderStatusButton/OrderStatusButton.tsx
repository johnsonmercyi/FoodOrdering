import { Pressable, StyleSheet, Text, View } from "react-native";
import { OrderStatus, OrderStatusList } from "@/assets/types";
import Colors from "@/src/constants/Colors";

type OrderStatusProps = {
  orderStatus: OrderStatus;
};

const OrderStatusButton = ({ orderStatus }: OrderStatusProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Status</Text>
      <View style={styles.statusesContainer}>
        {OrderStatusList.map((status) => (
          <Pressable
            key={status}
            style={[
              styles.status,
              {
                backgroundColor:
                  status === orderStatus
                    ? Colors.light.tint
                    : 'transparent',
              },
            ]}
          >
            <Text
              style={[
                styles.statusText,
                {
                  color:
                    status === orderStatus
                      ? Colors.light.background
                      : Colors.light.tint,
                },
              ]}
            >
              {status}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  statusesContainer: {
    flexDirection: "row",
    gap: 10,
  },
  status: {
    padding: 10,
    borderColor: Colors.light.tint,
    borderWidth: 1,
    borderRadius: 5,
  },
  statusText: {},
});

export default OrderStatusButton;
