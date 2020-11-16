import React from "react";
import {
  Dimensions,
  PixelRatio,
  Text,
  StyleSheet,
  Platform,
} from "react-native";

export const widthPercentageToDP = (widthPercent) => {
  const screenWidth = Dimensions.get("window").width;
  return PixelRatio.roundToNearestPixel(
    (screenWidth * parseFloat(widthPercent)) / 100
  );
};

export const heightPercentageToDP = (heightPercent) => {
  const screenHeight = Dimensions.get("window").height;
  return PixelRatio.roundToNearestPixel(
    (screenHeight * parseFloat(heightPercent)) / 100
  );
};

export const color = {
  primary: "#02408d",
  secundary: "#a2c9f0",
  labels: "#9d9d9d",
  backgroudBack: "#f7f8f9",
  azure: "#04b5eb",
  niceBlue: "#1388b8",
  warmGray: "#9d9d9d",
  paleGrey: "#f7f8f9",
};

export const paddingHorizontal = widthPercentageToDP("10%");
export const paddingVertical = heightPercentageToDP("4%");

export function isIphoneX() {
  const dim = Dimensions.get("window");

  return (
    // This has to be iOS
    Platform.OS === "ios" &&
    // Check either, iPhone X or XR
    (isIPhoneXSize(dim) || isIPhoneXrSize(dim))
  );
}

export function isIPhoneXSize(dim) {
  return dim.height === 812 || dim.width === 812;
}

export function isIPhoneXrSize(dim) {
  return dim.height === 896 || dim.width === 896;
}
