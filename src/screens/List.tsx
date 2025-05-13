import React, { useState } from "react";
import { View, FlatList, StyleSheet, Text , TouchableOpacity} from "react-native";
import { usePetContext } from "../context/PetContext";

const List = () => {
    const { addPet, updatePet, deletePet, pets } = usePetContext();
      const [name, setName] = useState("");
      const [age, setAge] = useState("");
      const [description, setDescription] = useState("");
      const [editingPet, setEditingPet] = useState<unknown>(undefined);


  const renderPetItem = ({ item }: { item: any }) => (
    <View style={styles.petItem}>
      <Text>Name: {item.name}</Text>
      <Text>Age: {item.age}</Text>
      {item.description && <Text>Description: {item.description}</Text>}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            setEditingPet(item);
            setName(item.name);
            setAge(item.age);
            setDescription(item.description || "");
          }}
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
    <View style={styles.listContainer}>
      <FlatList
        data={pets}
        keyExtractor={(item) => item.id}
        renderItem={renderPetItem}
        ListEmptyComponent={<View><Text>No Data shown</Text></View>}
      />
    </View>
  );
};

export default List;

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
});
