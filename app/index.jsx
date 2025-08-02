import React, { useState, useCallback } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Modal,
  Pressable,
} from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

const categories = [
  "Write Freely",
  "Track Your Mood",
  "Reflect Daily",
  "Note What Matters",
  "Remember Gratitude",
  "Tag Your Thoughts",
];

const colors = ["#7C83FD", "#FFB3C1", "#95DAC1"];

export default function Index() {
  const [showGuestModal, setShowGuestModal] = useState(false);
  const [currentColorIndex] = useState(0);
  const [checking, setChecking] = useState(true);
  const router = useRouter();

  // Check auth status when component mounts or comes into focus
  useFocusEffect(
    useCallback(() => {
      checkAuthAndRedirect();
    }, [])
  );

  const checkAuthAndRedirect = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        router.replace('/(tabs)');
        return;
      }
    } catch (error) {
      console.log('Auth check error:', error);
    } finally {
      setChecking(false);
    }
  };

  if (checking) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Static background elements - more subtle */}
      <View style={styles.backgroundCircle1} />
      <View style={styles.backgroundCircle2} />
      <View style={styles.backgroundCircle3} />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Static categories */}
        {categories.map((text, i) => (
          <View key={i} style={styles.categoryContainer}>
            <View
              style={[
                styles.categoryBubble,
                { borderColor: colors[i % colors.length] + "40" },
              ]}
            >
              <Text style={styles.category}>{text}</Text>
            </View>
          </View>
        ))}

        {/* Static tagline */}
        <View style={styles.taglineContainer}>
          <Text style={styles.taglineFirst}>Your thoughts.</Text>
          <Text style={[styles.taglineSecond, { color: colors[0] }]}>
            Your space.
          </Text>
        </View>

        {/* Feature hints - Fixed for all screen sizes */}
        <View style={styles.featureHints}>
          <View style={styles.featureHint}>
            <View style={[styles.featureDot, { backgroundColor: "#7C83FD" }]} />
            <Text style={styles.featureText}>Mood Tracking</Text>
          </View>
          <View style={styles.featureHint}>
            <View style={[styles.featureDot, { backgroundColor: "#FFB3C1" }]} />
            <Text style={styles.featureText}>Daily Reflections</Text>
          </View>
          <View style={styles.featureHint}>
            <View style={[styles.featureDot, { backgroundColor: "#95DAC1" }]} />
            <Text style={styles.featureText}>Gratitude Journal</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.loginButton,
            { borderColor: colors[currentColorIndex] + "40" },
          ]}
          onPress={() => router.push("/(auth)/login")}
          activeOpacity={0.8}
        >
          <Text style={styles.loginText}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.skipSignupButton,
            { backgroundColor: colors[currentColorIndex] },
          ]}
          onPress={() => {
            setShowGuestModal(true);
          }}
          activeOpacity={0.8}
        >
          <Text style={styles.skipSignupText}>Start</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showGuestModal}
        onRequestClose={() => setShowGuestModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.guestWarningText}>
              📝 Guest entries are temporary and will be lost when you close the
              app.
            </Text>

            <View style={styles.modalButtons}>
              <Pressable
                style={styles.modalButton}
                onPress={() => {
                  setShowGuestModal(false);
                  router.push("/(tabs)");
                }}
              >
                <Text style={styles.modalButtonText}>OK</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FB",
    position: "relative",
  },
  scroll: {
    alignItems: "center",
    justifyContent: "flex-start", 
    paddingVertical: 60, 
    paddingHorizontal: 20,
    paddingBottom: 140, 
    minHeight: height, 
  },
  backgroundCircle1: {
    position: "absolute",
    top: 80,
    left: 40,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#7C83FD",
    opacity: 0.15, // More subtle
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
  categoryContainer: {
    marginBottom: 16,
    alignItems: "center",
  },
  categoryBubble: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  category: {
    fontSize: 24,
    fontWeight: "600",
    color: "#1F1F1F",
    textAlign: "center",
    fontFamily: 'serif',
  },
  taglineContainer: {
    marginVertical: 30, 
    alignItems: "center",
  },
  taglineFirst: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1F1F1F",
    textAlign: "center",
    marginBottom: 5,
    fontFamily: 'serif',
  },
  taglineSecond: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 16,
    fontStyle: 'italic',
  },
  featureHints: {
    width: "100%", 
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 20, 
  },

  featureHint: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    margin: 6, 
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  featureDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6, 
  },

  featureText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#6B7280",
    fontFamily: 'serif',
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 16,
    position: "absolute",
    bottom: 50,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  loginButton: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 16,
    borderRadius: 12,
    minWidth: 120,
    alignItems: "center",
    borderWidth: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  loginText: {
    color: "#1F1F1F",
    fontWeight: "600",
    fontSize: 16,
    fontFamily: 'serif',
  },
  skipSignupButton: {
    padding: 16,
    borderRadius: 12,
    minWidth: 120,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  skipSignupText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
    fontFamily: 'serif',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 24,
    borderRadius: 12,
    alignItems: "center",
    marginHorizontal: 20,
  },
  modalButtons: {
    flexDirection: "row",
    marginTop: 16,
    justifyContent: "space-between",
  },
  modalButton: {
    padding: 12,
    backgroundColor: "#7C83FD",
    borderRadius: 8,
    marginHorizontal: 8,
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  guestWarningText: {
    fontSize: 14,
    color: "#92400E",
    textAlign: "center",
    fontWeight: "500",
    fontFamily: 'serif',
  },
});
