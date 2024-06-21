import Input from "@/src/components/ui/Input/Input";
import { useState } from "react";
import { Text, View } from "react-native";

type ProductType = {
  name: string;
  price: number;
};

type ProductErrorType = {
  name: boolean;
  price: boolean;
};

const CreateProductScreen = (): JSX.Element => {
  const [product, setProduct] = useState<ProductType>({
    name: "",
    price: 0,
  });

  const [productError, setProductError] = useState<ProductErrorType>({
    name: false,
    price: false,
  });

  return (
    <View>
      <Text>Create Screen</Text>
      <Input value={product.name} onChange={() => {}} />
      <Input
        value={Number(product.price).toFixed(2).toString()}
        onChange={() => {}}
      />
    </View>
  );
};

export default CreateProductScreen;
