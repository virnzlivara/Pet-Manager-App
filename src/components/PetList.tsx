import React from "react";
import { View, TextInput, FlatList, Text } from "react-native";
import { Pet } from "../types"; 
import { styles } from "../../styles";
import PetItem from "./PetItem";

type Props = {
  pets: Pet[];
  query: string;
  setQuery: (q: string) => void;
  onEdit: (pet: Pet) => void;
  onDelete: (id: string) => void;
};

export const PetList: React.FC<Props> = ({ pets, query, setQuery, onEdit, onDelete }) => {
  const filteredPets = pets.filter(
    (pet) =>
      pet.name.toLowerCase().includes(query.toLowerCase()) ||
      (pet.description?.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <View style={styles.listContainer}>
      <TextInput
        style={styles.input}
        placeholder="Search Pet"
        value={query}
        onChangeText={setQuery}
      />
      <FlatList
        data={filteredPets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PetItem pet={item} onEdit={onEdit} onDelete={onDelete} />
        )}
        ListEmptyComponent={() => (
          <View style={styles.noDataContainer}>
            <Text style={styles.noDataText}>No Pets Found</Text>
          </View>
        )}
      />
    </View>
  );
};
 
