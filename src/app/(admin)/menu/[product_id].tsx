import products from "@/assets/data/products";
import Colors from "@/src/constants/Colors";
import { Stack, useLocalSearchParams } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";

const Product = (): JSX.Element => {
  const { product_id } = useLocalSearchParams();
  const product = products.find((p) => p.id === Number(product_id));

  if (!product) {
    return <Text>Product not found!</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `${product.name}` }} />
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.background,
    flex: 1,
    padding: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  title: {
    color: Colors.light.text,
    fontWeight: "bold",
    fontSize: 15,
  },
  price: {
    color: Colors.light.tint,
    fontWeight: "bold",
  },
});

export default Product;
