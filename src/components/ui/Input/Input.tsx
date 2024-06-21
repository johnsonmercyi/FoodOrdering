import { Text, TextInput, View } from "react-native";

type InputType = {
  error?: boolean,
} & React.ComponentPropsWithoutRef<typeof TextInput>;

const Input = ({ error, value, ...otherTextInputProps }: InputType):  JSX.Element => {
  return (
    <View>
      <Text>label</Text>
      <TextInput {...otherTextInputProps} value={value} />
      {error && <Text>error</Text>}
    </View>
  );
}

export default Input;