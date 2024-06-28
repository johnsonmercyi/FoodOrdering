import { defaultPizzaImage } from "@/assets/data/products";
import { OrderItem } from "@/assets/types";
import Colors from "@/src/constants/Colors";
import { Image, StyleSheet, Text, View } from "react-native";

type OrderItemListItemProps = {
  orderListItem: OrderItem;
};

const OrderItemListItem = ({ orderListItem }: OrderItemListItemProps) => {
  const { products, size, quantity } = orderListItem;
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{ uri: products.image || defaultPizzaImage }}
        resizeMode="contain"
      />
      <View style={{ flex: 1, gap: 5 }}>
        <Text style={styles.title}>{products.name}</Text>
        <View style={styles.subTitleContainer}>
          <Text style={styles.price}>${products.price}</Text>
          <Text>Size: {size}</Text>
        </View>
      </View>
      <Text style={styles.quantity}>{quantity}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.background,
    flexDirection: "row",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    gap: 10
  },
  image: {
    width: "23%",
    aspectRatio: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  subTitleContainer: {
    flexDirection: "row",
    gap: 10,
  },
  price: {
    fontWeight: "600",
    color: Colors.light.tint,
    fontSize: 15,
  },
  quantity: {
    padding: 10,
    fontSize: 15,
    fontWeight: "600",
  },
});

export default OrderItemListItem;
