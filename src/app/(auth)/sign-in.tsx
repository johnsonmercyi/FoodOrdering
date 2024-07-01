import { View } from "@/src/components/Themed";
import Button from "@/src/components/ui/Button/Button";
import Input from "@/src/components/ui/Input/Input";
import Colors from "@/src/constants/Colors";
import { supabase } from "@/src/lib/supabase";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text } from "react-native";

type ErrorInputs = {
  email: string;
  password: string;
};

const SignInScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorInputs, setErrorInputs] = useState<ErrorInputs>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(false);

  const signInWithEmail = async () => {
    if (validateInputs()) {
      setLoading(true);
      if (cooldown) {
        Alert.alert("Please wait before trying again.");
        return;
      }

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (error.message.includes("rate limit")) {
          setCooldown(true);
          setTimeout(() => setCooldown(false), 60000); // 60 seconds cooldown
        }
        Alert.alert("Error", error.message);
      } else {
        // Alert.alert("Success", "Sign in successfully!", []);
        resetInputs();
        setLoading(false);
      }
    } else {
      Alert.alert("Invalid Input", "Please fill in both email and password.");
    }
  };

  const validateInputs = () => {
    if (!email) {
      setErrorInputs((errors) => ({ ...errors, email: "Email is required" }));
    }

    if (!password) {
      setErrorInputs((errors) => ({
        ...errors,
        password: "Password is required",
      }));
    } else if (password.trim().length < 8) {
      setErrorInputs((errors) => ({
        ...errors,
        password: "Password must be minimum of 6 characters",
      }));
    }

    if (email && password && password.trim().length >= 8) {
      setErrorInputs({ email: "", password: "" });
      return true;
    }

    return false;
  };

  const resetInputs = () => {
    setEmail("");
    setPassword("");
    setErrorInputs({ email: "", password: "" });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <Input
          error={!!errorInputs.email}
          errorMessage={errorInputs.email}
          label={"Email"}
          placeholder="youremail@email.com"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <Input
          error={!!errorInputs.password}
          errorMessage={errorInputs.password}
          label={"Password"}
          placeholder="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />

        <Button
          text={loading ? `Signing in...` : `Sign in`}
          disabled={loading}
          onPress={signInWithEmail}
        />

        <Text
          onPress={() => {
            setEmail("");
            setPassword("");
            router.push(`/sign-up`);
          }}
          style={styles.textButton}
        >
          Create an account
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // This is important to ensure the contentContainer takes up the full space
  },

  content: {
    padding: 20,
    flex: 1,
    justifyContent: "center",
  },

  textButton: {
    color: Colors.light.tint,
    fontWeight: "bold",
    alignSelf: "center",
    marginVertical: 10,
  },
});

export default SignInScreen;
