import React, { useState } from "react";
import { View } from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as ImagePicker from "expo-image-picker";

import { usePetContext } from "../context/PetContext";
import { petSchema } from "../schema/pet.schema";
import { Pet } from "../types";
import { z } from "zod";
import PetForm from "../components/PetForm"; 
import { styles } from "../../styles";
import { PetList } from "../components/PetList";

type PetFormType = z.infer<typeof petSchema>;

const MainScreen: React.FC = () => {
  const { addPet, updatePet, deletePet, pets } = usePetContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [editingPet, setEditingPet] = useState<Pet | undefined>(undefined);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<PetFormType>({
    resolver: zodResolver(petSchema),
    defaultValues: { id: "", name: "", age: "", description: "", image: "" },
  });

  const onSubmit = (data: PetFormType) => {
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
    setValue("description", pet.description);
    setValue("image", pet.image);
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setValue("image", result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <PetForm
        control={control}
        errors={errors}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        pickImage={pickImage}
        editingPet={editingPet}
      />
      <PetList
        pets={pets}
        query={searchQuery}
        setQuery={setSearchQuery}
        onEdit={onEdit}
        onDelete={deletePet}
      />
    </View>
  );
};

export default MainScreen;
