import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePetContext } from "../context/PetContext";
import { petSchema } from "../schema/pet.schema";
import { Pet } from "../types";
import { z } from "zod";
import * as ImagePicker from "expo-image-picker"; 
import { Image } from "react-native";

type PetForm = z.infer<typeof petSchema>;

const MainScreen: React.FC = () => {
  const { addPet, updatePet, deletePet, pets } = usePetContext();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<PetForm>({
    resolver: zodResolver(petSchema),
    defaultValues: {
      id: "",
      name: "",
      age: "",
      description: "",
    },
  });

  const [editingPet, setEditingPet] = useState<Pet | undefined>(undefined);

  const onSubmit = (data: PetForm) => {
    const petData: Pet = {
      ...data,
      id: editingPet?.id || Date.now().toString(),
    };

    if (editingPet) {
      updatePet(petData);
    } else {
      addPet(petData);
    }

    reset();
    setEditingPet(undefined);
  };

  const onEdit = (pet: Pet) => {
    setEditingPet(pet);
    setValue("id", pet.id);
    setValue("name", pet.name);
    setValue("age", pet.age);
    setValue("description", pet.description || "");
    setValue("image", pet.image || "");
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Only images allowed
      allowsEditing: true, // Allow editing
      aspect: [4, 3], // Aspect ratio for the image
      quality: 1, // Set quality to the highest
    });

    if (!result.canceled) {
      // Set the image URI to the form value
      setValue("image", result.assets[0].uri);
    } else {
      console.log("Image selection canceled.");
    }
  };

  const filteredPets = pets.filter((pet) =>
    pet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (pet.description && pet.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const renderPetItem = ({ item }: { item: Pet }) => (
    <View style={styles.petItem}>
      <Text>Name: {item.name}</Text>
      <Text>Age: {item.age}</Text>
      {item.description && <Text>Description: {item.description}</Text>}
      {/* Display Image if available */}
    {item.image && (
      <Image
        source={{ uri: item.image }}  // The URI of the image
        style={styles.petImage}       // Custom style for the image
      />
    )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => onEdit(item)}
          style={styles.editButton}
        >
          <Text>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => deletePet(item.id)}
          style={styles.deleteButton}
        >
          <Text>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
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
              {errors.name && (
                <Text style={styles.errorText}>{errors.name.message}</Text>
              )}
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
              {errors.age && (
                <Text style={styles.errorText}>{errors.age.message}</Text>
              )}
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
                <Text style={styles.errorText}>
                  {errors.description.message}
                </Text>
              )}
            </>
          )}
        />
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text style={styles.buttonText}>Pick Pet Image</Text>
        </TouchableOpacity>
         {/* Display selected image */}
         {errors.image && <Text style={styles.errorText}>{errors.image.message}</Text>}
        <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>
            {editingPet ? "Update Pet" : "Add Pet"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.listContainer}>
         {/* Search Field */}
         <TextInput
          style={styles.input}
          placeholder="Search Pets"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <FlatList
          data={filteredPets}
          keyExtractor={(item) => item.id}
          renderItem={renderPetItem}
          
        />
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 50,
  },
  formContainer: {
    padding: 16,
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 16,
    borderRadius: 5,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 16,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  listContainer: {
    flex: 1,
    marginTop: 16,
  },
  petItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 8,
  },
  editButton: {
    backgroundColor: "#2196F3",
    padding: 8,
    borderRadius: 5,
    marginRight: 8,
  },
  deleteButton: {
    backgroundColor: "#f44336",
    padding: 8,
    borderRadius: 5,
  },
  errorText: {
    color: "red",
    marginBottom: 8,
  },
});

export default MainScreen;
