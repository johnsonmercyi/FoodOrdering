import Colors from "@/src/constants/Colors";
import { forwardRef } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type ButtonProps = {
  text: string;
} & React.ComponentPropsWithoutRef<typeof Pressable>;

const Button = forwardRef<View | null, ButtonProps>(
  ({ text, ...pressableProps }, ref) => {

    return (
      <Pressable
        ref={ref}
        {...pressableProps}
        style={({ pressed }) => [styles.container, pressed && styles.pressed]}
        android_ripple={{ color: "rgba(255, 255, 255, 0.3)" }}
      >
        <Text style={styles.text}>{text}</Text>
      </Pressable>
    );
  }
);

export default Button;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.tint,
    padding: 15,
    alignItems: "center",
    borderRadius: 100,
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
  pressed: {
    opacity: 0.75,
  },
});
