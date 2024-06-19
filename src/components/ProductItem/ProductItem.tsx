import { StyleSheet, View, Text, Image } from "react-native";
import products from "@/assets/data/products";
import Colors from "@/src/constants/Colors";
import { Product } from "@/assets/types";

const defaultPizzaImage =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";


type ProductItemProps = {
  product: Product;
};

const ProductItem = ({ product }: ProductItemProps): JSX.Element => {
  return (
    <View style={styles.product}>
      <Image source={{ uri: product.image || defaultPizzaImage}} style={styles.image} />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
    </View>
  );
};
export default ProductItem;

const styles = StyleSheet.create({
  product: {
    backgroundColor: Colors.light.background,
    padding: 10,
    borderRadius: 12,
    overflow: "scroll",
    marginVertical: 5,
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
