import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Pet } from "../types";
import { styles } from "../../styles"; 

type Props = {
  pet: Pet;
  onEdit: (pet: Pet) => void;
  onDelete: (id: string) => void;
};

const PetItem: React.FC<Props> = ({ pet, onEdit, onDelete }) => (
  <View style={styles.petItem}>
    {pet.image && <Image testID="pet-image" source={{ uri: pet.image }} style={styles.petImage} />}
    <Text>Name: {pet.name}</Text>
    <Text>Age: {pet.age}</Text>
    {pet.description && <Text>Description: {pet.description}</Text>}

    <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={() => onEdit(pet)} style={styles.editButton}>
        <Text>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onDelete(pet.id)} style={styles.deleteButton}>
        <Text>Delete</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default PetItem;
