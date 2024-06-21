import products from "@/assets/data/products";
import { PizzaSize } from "@/assets/types";
import Button from "@/src/components/Button/Button";
import Colors from "@/src/constants/Colors";
import { useCart } from "@/src/providers/CartProvider";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const Product = (): JSX.Element => {
  const { product_id } = useLocalSearchParams();
  const sizes: PizzaSize[] = ["S", "M", "L", "XL"];
  const product = products.find((p) => p.id === Number(product_id));

  const [selectedSize, setSelectedSize] = useState<PizzaSize>(sizes[0]);
  const { addItem } = useCart();

  const router = useRouter();

  const addToCart = () => {
    if (!product) return;
    addItem(product, selectedSize);
    router.push('/cart');
  };

  if (!product) {
    return <Text>Product not found!</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `${product.name}` }} />
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text>Select size</Text>
      <View style={styles.sizes}>
        {sizes.map((size) => (
          <Pressable
            key={size}
            onPress={() => {
              setSelectedSize(size);
            }}
            style={[
              styles.size,
              size === selectedSize ? styles.selectedSize : null,
            ]}
          >
            <Text
              style={[
                styles.sizeText,
                size === selectedSize ? styles.selectedSizeText : null,
              ]}
            >
              {size}
            </Text>
          </Pressable>
        ))}
      </View>
      <Text style={styles.price}>${product.price}</Text>
      <Button onPress={addToCart} text="Add to cart"/>
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
  price: {
    color: Colors.light.tint,
    fontWeight: "bold",
    marginTop: 'auto',
  },
  sizes: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  size: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.light.background,
  },
  selectedSize: {
    backgroundColor: Colors.light.tabIconDefault,
  },
  sizeText: {
    fontWeight: "500",
    fontSize: 16,
    color: "gray",
  },
  selectedSizeText: {
    color: Colors.light.text,
    fontWeight: "bold",
  },
});

export default Product;
