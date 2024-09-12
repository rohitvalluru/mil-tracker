import { View, Text, SafeAreaView, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";

const SplashScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.centeredContent}>
          <Image
            source={require("../assets/Hugosave.webp")}
            style={styles.image}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    backgroundColor: "#E34234",
    flex: 1,
  },
  centeredContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 160,
    width: 160,
    borderRadius: 80,
  },
});

export default SplashScreen;
