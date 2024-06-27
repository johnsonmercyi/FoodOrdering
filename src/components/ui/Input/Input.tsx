import Colors from "@/src/constants/Colors";
import { StyleSheet, Text, TextInput, View } from "react-native";

type InputType = {
  error?: boolean;
  errorMessage?:string;
  label?: string;
  isPassword?: boolean;
} & React.ComponentPropsWithoutRef<typeof TextInput>;

const Input = ({
  error,
  errorMessage,
  value,
  label,
  isPassword,
  ...otherTextInputProps
}: InputType): JSX.Element => {
  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <TextInput
        {...otherTextInputProps}
        secureTextEntry={isPassword}
        value={value}
        style={[
          styles.input,
          {
            marginBottom: !error ? 15 : 0,
            borderColor: error ? "#dc0933" : "#bbb",
            borderWidth: error ? 1 : 0.5,
          },
        ]}
      />
      {error && (
        <Text
          style={[
            styles.error,
            {
              marginBottom: error ? 15 : 0,
            },
          ]}
        >
          {errorMessage || `This field is required`}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  label: {
    color: "gray",
    fontSize: 15,
  },
  input: {
    backgroundColor: Colors.light.background,
    padding: 10,
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: '#bbb',
    marginTop: 5,
    marginBottom: 10,
  },
  error: {
    color: "#dc0933",
    padding: 2,
  },
});

export default Input;
