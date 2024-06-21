import { StatusBar } from "expo-status-bar";
import { FlatList, Platform, Text, View } from "react-native";
import { useCart } from "../providers/CartProvider";
import CartListItem from "../components/CartListItem/CartListItem";
import Button from "../components/Button/Button";

const CartScreen = ({}): JSX.Element => {
  const { items, total } = useCart();
  return (
    <View style={{ padding: 10 }}>
      <FlatList
        data={items}
        renderItem={({ item, index }) => (
          <CartListItem cartItem={item} key={index} />
        )}
        contentContainerStyle={{ gap: 10 }}
      />

      <Text style={{
        fontWeight: 'bold',
        marginTop: 20,
      }}>Total: ${total}</Text>
      
      <Button text="Checkout" />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
};

export default CartScreen;
