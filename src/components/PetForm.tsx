import React from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { Controller, useWatch } from "react-hook-form";
import { styles } from "../../styles"; 
import ImagePreview from "./ImagePreview";

type Props = {
  control: any;
  errors: any;
  handleSubmit: any;
  onSubmit: any;
  pickImage: () => void;
  editingPet: any;
};

const PetForm: React.FC<Props> = ({ control, errors, handleSubmit, onSubmit, pickImage, editingPet }) => {
  const watchedImage = useWatch({ control, name: "image" });

  return (
    <View style={styles.formContainer}>
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Pet Name"
              value={value}
              onChangeText={onChange}
            />
            {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}
          </>
        )}
      />

      <Controller
        control={control}
        name="age"
        render={({ field: { onChange, value } }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Pet Age"
              value={value}
              onChangeText={onChange}
              keyboardType="numeric"
            />
            {errors.age && <Text style={styles.errorText}>{errors.age.message}</Text>}
          </>
        )}
      />

      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, value } }) => (
          <>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Pet Description"
              value={value}
              onChangeText={onChange}
              multiline
              numberOfLines={4}
            />
            {errors.description && (
              <Text style={styles.errorText}>{errors.description.message}</Text>
            )}
          </>
        )}
      />

      <ImagePreview uri={watchedImage} />

      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Upload Image</Text>
      </TouchableOpacity>
      {errors.image && <Text style={styles.errorText}>{errors.image.message}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>{editingPet ? "Update Pet" : "Add Pet"}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PetForm;
