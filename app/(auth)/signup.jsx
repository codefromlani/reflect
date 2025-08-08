import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import ApiService from "../../services/api";

const { width, height } = Dimensions.get("window");

const RegisterScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const router = useRouter();

  const handleRegister = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      await ApiService.register(username, password);
      Alert.alert("Registration Success", "You can now log in.");
      router.push("/(auth)/login");
    } catch (err) {
      Alert.alert(
        "Registration Failed",
        err.message || "Network error. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Static background circles */}
      <View style={styles.backgroundCircle1} />
      <View style={styles.backgroundCircle2} />
      <View style={styles.backgroundCircle3} />

      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerContainer}>
            <Text style={styles.welcomeText}>Join Us</Text>
            <Text style={styles.title}>Sign Up</Text>
            <Text style={styles.subtitle}>
              Create an account to start your journey
            </Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <View
                style={[
                  styles.inputWrapper,
                  focusedInput === "username" && styles.inputWrapperFocused,
                ]}
              >
                <Ionicons
                  name="person-outline"
                  size={20}
                  color={focusedInput === "username" ? "#7C83FD" : "#9CA3AF"}
                  style={styles.inputIcon}
                />
                <TextInput
                  placeholder="Username"
                  placeholderTextColor="#9CA3AF"
                  value={username}
                  onChangeText={setUsername}
                  style={styles.input}
                  autoCapitalize="none"
                  editable={!loading}
                  onFocus={() => setFocusedInput("username")}
                  onBlur={() => setFocusedInput(null)}
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <View
                style={[
                  styles.inputWrapper,
                  focusedInput === "password" && styles.inputWrapperFocused,
                ]}
              >
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color={focusedInput === "password" ? "#7C83FD" : "#9CA3AF"}
                  style={styles.inputIcon}
                />
                <TextInput
                  placeholder="Password"
                  placeholderTextColor="#9CA3AF"
                  value={password}
                  onChangeText={setPassword}
                  style={styles.input}
                  secureTextEntry={!showPassword}
                  editable={!loading}
                  onFocus={() => setFocusedInput("password")}
                  onBlur={() => setFocusedInput(null)}
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons
                    name={showPassword ? "eye-outline" : "eye-off-outline"}
                    size={20}
                    color="#9CA3AF"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.authButton, loading && styles.authButtonLoading]}
              onPress={handleRegister}
              disabled={loading}
              activeOpacity={0.8}
            >
              {loading ? (
                <View style={styles.loadingContainer}>
                  <Ionicons name="sync-outline" size={20} color="white" />
                  <Text style={styles.buttonText}>Registering...</Text>
                </View>
              ) : (
                <Text style={styles.buttonText}>Register</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.linkContainer}
              onPress={() => router.push("/(auth)/login")}
              disabled={loading}
              activeOpacity={0.7}
            >
              <Text style={styles.linkText}>
                Already have an account? <Text style={styles.link}>Login</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FB",
    position: "relative",
  },
  backgroundCircle1: {
    position: "absolute",
    top: 80,
    left: 40,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#7C83FD",
    opacity: 0.15,
  },
  backgroundCircle2: {
    position: "absolute",
    bottom: 200,
    right: 40,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#FFB3C1",
    opacity: 0.15,
  },
  backgroundCircle3: {
    position: "absolute",
    top: height / 2,
    left: width / 4,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#95DAC1",
    opacity: 0.15,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 40,
    justifyContent: "center",
    minHeight: height - 100,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  welcomeText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#7C83FD",
    marginBottom: 8,
    textAlign: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    textAlign: "center",
    color: "#1F1F1F",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  inputWrapperFocused: {
    borderColor: "#7C83FD",
    borderWidth: 2,
  },
  inputIcon: {
    marginLeft: 20,
    marginRight: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 18,
    paddingRight: 20,
    fontSize: 16,
    color: "#1F1F1F",
    fontWeight: "500",
  },
  eyeButton: {
    padding: 12,
    marginRight: 8,
  },
  authButton: {
    backgroundColor: "#7C83FD",
    paddingVertical: 18,
    borderRadius: 16,
    marginTop: 20,
    marginBottom: 30,
    shadowColor: "#7C83FD",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  authButtonLoading: {
    backgroundColor: "#9CA3AF",
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
    textAlign: "center",
    marginLeft: 8,
  },
  linkContainer: {
    alignItems: "center",
    paddingVertical: 16,
  },
  linkText: {
    fontSize: 16,
    color: "#6B7280",
    fontWeight: "500",
  },
  link: {
    color: "#7C83FD",
    fontWeight: "600",
  },
});

export default RegisterScreen;
