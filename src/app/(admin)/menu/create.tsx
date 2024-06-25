import { defaultPizzaImage } from "@/assets/data/products";
import Button from "@/src/components/ui/Button/Button";
import Input from "@/src/components/ui/Input/Input";
import Colors from "@/src/constants/Colors";
import * as ImagePicker from "expo-image-picker";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Keyboard,
  Alert,
} from "react-native";

type ProductType = {
  name: string;
  price: string;
};

type ProductErrorType = {
  name: boolean;
  price: boolean;
};

type InputErrorMessageType = {
  name: string;
  price: string;
};

const CreateProductScreen = (): JSX.Element => {
  const [product, setProduct] = useState<ProductType>({
    name: "",
    price: "",
  });

  const [productError, setProductError] = useState<ProductErrorType>({
    name: false,
    price: false,
  });

  const [inputErrorMessage, setInputErrorMessage] =
    useState<InputErrorMessageType>({
      name: "",
      price: "",
    });

  const [image, setImage] = useState<string | null>(null);

  const { product_id } = useLocalSearchParams();
  const isUpdating = !!product_id;

  /**
   * The intention is to call the `inputChangedListener` funtion
   * during the time of assigning it to the `TextInput` component's
   * `onChangeText` listener so that it returns the inner function.
   * This is to enable having access to the  the target (i.e The `TextInput`
   * triggered the event) identifier passed by us and the changed value passed by the event.
   * @param target
   * @returns
   */
  const inputTextChangedListener = (target: string) => {
    return (newValue: string) => {
      if (!newValue) {
        setProductError((error) => ({ ...error, [target]: true }));
        setInputErrorMessage((errorMessage) => ({
          ...errorMessage,
          [target]:
            target === "name" ? "Name is required" : "Price is required",
        }));
      } else {
        setProductError((error) => ({ ...error, [target]: false }));
        setInputErrorMessage((errorMessage) => ({
          ...errorMessage,
          [target]: target === "name" ? "" : "",
        }));

        if (target === "price" && isNaN(parseFloat(product.price))) {
          setInputErrorMessage((errorMessage) => ({
            ...errorMessage,
            price: "Price is not a number",
          }));
        }
      }

      setProduct((currentState) => ({
        ...currentState,
        [target]: newValue,
      }));
    };
  };

  const onSubmit = () => {
    if (isUpdating) {
      updateProduct();
    } else {
      createProduct();
    }
    resetField();
  };

  const createProduct = () => {
    if (!validateInputs()) {
      return;
    }
    console.warn("Creating...");
  };

  const updateProduct = () => {
    if (!validateInputs()) {
      return;
    }
    console.warn("Updating...");
  };

  const validateInputs = () => {
    // setProductError({ name: false, price: false });
    const errorInputKeys = Object.keys(productError);

    errorInputKeys.forEach((key) => {
      const productKey = key as keyof ProductType;
      console.warn("validating...", productKey, "Value: ", product[productKey]);
      if (!product[productKey]) {
        setProductError((error) => ({ ...error, [productKey]: true }));
        setInputErrorMessage((errorMessage) => ({
          ...errorMessage,
          [productKey]:
            productKey === "name" ? "Name is required" : "Price is required",
        }));
      } else {
        setProductError((error) => ({ ...error, [productKey]: false }));
        setInputErrorMessage((errorMessage) => ({
          ...errorMessage,
          [productKey]: productKey === "name" ? "" : "",
        }));
        if (productKey === "price" && isNaN(parseFloat(product.price))) {
          setInputErrorMessage((errorMessage) => ({
            ...errorMessage,
            price: "Price is not a number",
          }));
        }
      }
    });
    return product.name && product.price && !isNaN(parseFloat(product.price));
  };

  const resetField = () => {
    setProduct({ name: "", price: "" });
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const deleteProduct = () => {
    console.warn("Deleting product...");
  }

  const confirmDelete = () => {
    Alert.alert("Confirm Delete", "Are you sure you want to delete this product?", [
      {
        text: "Cancel",
      },
      {
        text: "Delete",
        style: 'destructive',
        onPress: deleteProduct
      }
    ]);
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        <Stack.Screen
          options={{
            title: isUpdating ? "Update Product" : "Create Product",
          }}
        />
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: image || defaultPizzaImage }}
            style={styles.image}
          />
          <Text onPress={pickImage} style={styles.textButton}>
            Select Image
          </Text>
        </View>

        <Input
          errorMessage={inputErrorMessage.name}
          error={productError.name}
          onChangeText={inputTextChangedListener("name")}
          value={product.name}
          placeholder="Name"
        />
        <Input
          errorMessage={inputErrorMessage.price}
          error={productError.price}
          onChangeText={inputTextChangedListener("price")}
          value={product.price}
          placeholder="$99.9"
          keyboardType="numeric"
        />

        <Button text={isUpdating ? `Update` : `Create`} onPress={onSubmit} />
        {isUpdating && (
          <Text
            style={[styles.textButton, { marginVertical: 10}]}
            onPress={confirmDelete}
          >Delete</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  imageContainer: {
    alignItems: "center",
    padding: 20,
    gap: 10,
  },
  image: {
    width: "80%",
    aspectRatio: 1,
  },
  textButton: {
    color: Colors.light.tint,
    fontWeight: "bold",
    alignSelf: "center",
  },
});

export default CreateProductScreen;
