import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Pet } from "../types";

type PetContextType = {
  pets: Pet[];
  addPet: (pet: Pet) => void;
  updatePet: (pet: Pet) => void;
  deletePet: (id: string) => void;
  searchPets: (query: string) => void;
};

const PetContext = createContext<PetContextType | undefined>(undefined);

export const PetProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [pets, setPets] = useState<Pet[]>([]);
  useEffect(() => {
    const loadPets = async () => {
      try {
        const storedPets = await AsyncStorage.getItem("pets");
        if (storedPets) {
          setPets(JSON.parse(storedPets));
        }
      } catch (error) {
        console.error("Failed to load pets from storage:", error);
      }
    };

    loadPets();
  }, []);

  useEffect(() => {
    const savePets = async () => {
      try {
        await AsyncStorage.setItem("pets", JSON.stringify(pets));
        console.warn("Pet successfully saved!");
      } catch (error) {
        console.error("Failed to save pets to storage:", error);
      }
    };

    savePets();
  }, [pets]);

  const addPet = (pet: Pet) => {
    const nameExists = pets.some(
      (existingPet) => existingPet.name.toLowerCase() === pet.name.toLowerCase()
    );

    if (nameExists) {
      console.warn("Pet with this name already exists!");
      return;
    }

    setPets((prev) => [...prev, pet]);
  };

  const updatePet = (updatedPet: Pet) => {
    const newPets = pets.map((pet) => {
      if (pet.id === updatedPet.id) {
        return updatedPet;
      }
      return pet;
    });
    setPets(newPets); 
  };

  const deletePet = (id: string) => {
    setPets((prev) => prev.filter((pet) => pet.id !== id));
  };
 
  const searchPets = (val: string) => {
    const filteredPets = pets.filter((pet) =>
      pet.name.toLowerCase().includes(val.toLowerCase()) ||
      (pet.description && pet.description.toLowerCase().includes(val.toLowerCase()))
    );
    setPets(filteredPets); 
  };

  return (
    <PetContext.Provider
      value={{ pets, addPet, updatePet, deletePet, searchPets }}
    >
      {children}
    </PetContext.Provider>
  );
};

export const usePetContext = () => {
  const context = useContext(PetContext);
  if (!context) {
    throw new Error("usePetContext must be used within a PetProvider");
  }
  return context;
};
