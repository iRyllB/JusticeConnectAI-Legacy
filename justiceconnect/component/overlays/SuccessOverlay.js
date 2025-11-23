// components/overlay/SuccessOverlay.js

import React from "react";
import { Modal, View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

export default function SuccessOverlay({ visible, onClose, title, buttonText }) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      {/* DIM BACKGROUND */}
      <View style={styles.dimBackground}>
        
        {/* WHITE POPUP BOX */}
        <View style={styles.popupBox}>

          {/* Close button (X) */}
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>

          {/* Center Icon */}
          <Image
            source={require("../../assets/mainlogo.png")} // Use your logo here
            style={styles.icon}
            resizeMode="contain"
          />

          {/* Title */}
          <Text style={styles.title}>{title}</Text>

          {/* Main Button */}
          <TouchableOpacity style={styles.mainButton} onPress={onClose}>
            <Text style={styles.mainButtonText}>{buttonText}</Text>
          </TouchableOpacity>
        </View>

      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  dimBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
    justifyContent: "center",
    alignItems: "center",
  },
  popupBox: {
    width: 300,
    backgroundColor: "white",
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 22,
    alignItems: "center",
    position: "relative",
  },
  closeBtn: {
    position: "absolute",
    right: 15,
    top: 15,
  },
  closeText: {
    fontSize: 20,
    color: "#333",
  },
  icon: {
    width: 85,
    height: 85,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 25,
    textAlign: "center",
  },
  mainButton: {
    backgroundColor: "#0B3C6C",
    width: "80%",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  mainButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 15,
  },
});
