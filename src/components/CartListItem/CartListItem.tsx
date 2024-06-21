import { defaultPizzaImage } from "@/assets/data/products";
import { CartItem } from "@/assets/types";
import Colors from "@/src/constants/Colors";
import { useCart } from "@/src/providers/CartProvider";
import { FontAwesome } from "@expo/vector-icons";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

type CartItemType = {
  cartItem: CartItem;
};

const CartListItem = ({ cartItem }: CartItemType) => {
  const { updateQuantity, removeItem } = useCart();
  const { product, size, quantity } = cartItem;
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{ uri: product.image || defaultPizzaImage }}
        resizeMode="contain"
      />

      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{product.name}</Text>
        <View style={styles.subTitleContainer}>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          <Text>Size: {size}</Text>
        </View>
      </View>

      <View style={styles.quantitySelector}>
        <Pressable
          onPress={() => updateQuantity(cartItem.id, -1)}
          style={styles.actionButton}
        >
          <FontAwesome name="minus" color={"grey"} />
        </Pressable>

        <Text style={styles.quantity}>{quantity}</Text>

        <Pressable
          onPress={() => updateQuantity(cartItem.id, 1)}
          style={styles.actionButton}
        >
          <FontAwesome name="plus" color={"gray"} style={{ padding: 5 }} />
        </Pressable>

        <Pressable onPress={() => removeItem(cartItem.id)} style={{ marginLeft: 10 }}>
          <FontAwesome
            name="trash"
            color={"gray"}
            style={{ padding: 5, fontSize: 20, color: "#555" }}
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: Colors.light.background,
    borderRadius: 10,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  image: {
    width: 75,
    aspectRatio: 1,
    alignSelf: "center",
    marginRight: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 5,
    paddingRight: 10
  },
  subTitleContainer: {
    flexDirection: "row",
    gap: 5,
  },
  price: {
    fontWeight: "500",
    color: Colors.light.tint,
  },
  quantitySelector: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    marginVertical: 10,
  },
  quantity: {
    fontWeight: "500",
    fontSize: 13,
  },
  actionButton: {
    width: 25,
    borderRadius: 15,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.light.tabIconDefault,
  },
});

export default CartListItem;
