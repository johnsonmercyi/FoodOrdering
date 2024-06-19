import { StyleSheet, View} from "react-native";
import products from "@/assets/data/products";
import ProductItem from "@/src/components/ProductItem/ProductItem";


export default function TabOneScreen() {
  return (
    <View>
      <ProductItem product={products[0]} />
      <ProductItem product={products[3]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    overflow: 'scroll'
  }
});
