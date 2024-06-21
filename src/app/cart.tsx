import { StatusBar } from "expo-status-bar";
import { FlatList, Platform, Text, View } from "react-native";
import { useCart } from "../providers/CartProvider";
import CartListItem from "../components/CartListItem/CartListItem";

const CartScreen = ({}): JSX.Element => {
  const { items } = useCart();
  return (
    <View>
      <FlatList
        data={items}
        renderItem={({ item, index }) => <CartListItem cartItem={item} key={index} />}
        contentContainerStyle={{padding: 10, gap: 10}}
      />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
};

export default CartScreen;
