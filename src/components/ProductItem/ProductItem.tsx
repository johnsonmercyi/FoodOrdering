import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import products from "@/assets/data/products";
import Colors from "@/src/constants/Colors";
import { Product } from "@/assets/types";
import { Link } from "expo-router";

const defaultPizzaImage =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";

type ProductItemProps = {
  product: Product;
};

const ProductItem = ({ product }: ProductItemProps): JSX.Element => {
  return (
    <Link href={`/menu/${product.id}`} asChild>
      <Pressable style={styles.container}>
        <Image
          source={{ uri: product.image || defaultPizzaImage }}
          style={styles.image}
          resizeMode={'contain'}
        />
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </Pressable>
    </Link>
  );
};
export default ProductItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.background,
    padding: 10,
    borderRadius: 12,
    flex: 1,
    maxWidth: "50%"
  },

  image: {
    width: "100%",
    aspectRatio: 1,
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 10,
  },

  price: {
    color: Colors.light.tint,
    fontWeight: "bold",
  },
});
