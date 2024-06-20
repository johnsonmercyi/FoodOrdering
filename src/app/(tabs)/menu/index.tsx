import { FlatList } from "react-native";
import products from "@/assets/data/products";
import ProductItem from "@/src/components/ProductItem/ProductItem";
import { Stack } from "expo-router";

export default function MenuScreen() {
  return (
    <>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductItem product={item} />}
        numColumns={2}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        columnWrapperStyle={{ gap: 10 }}
      />
    </>
  );
}
