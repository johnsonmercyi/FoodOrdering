import products from "@/assets/data/products";
import { Stack, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

const Product = (): JSX.Element => {
  const { product_id } = useLocalSearchParams();
  console.log("INDEX: ", Number(product_id));
  return (
    <View>
      <Stack.Screen
        options={{
          title: `${products.find(
            (product) => product.id === Number(product_id)
          )?.name} Details`,
        }}
      />
      <Text style={{ color: "white" }}>Product Details: {product_id}</Text>
    </View>
  );
}

export default Product;