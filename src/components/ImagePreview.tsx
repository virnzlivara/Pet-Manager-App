import React from "react";
import { View, Image } from "react-native";
import { styles } from "../../styles";

const ImagePreview: React.FC<{ uri?: string }> = ({ uri }) => {
  if (!uri) return null;

  return (
    <View style={styles.imagePreviewContainer}>
      <Image source={{ uri }} style={styles.imagePreview} />
    </View>
  );
};

export default ImagePreview;
