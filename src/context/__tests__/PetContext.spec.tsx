// src/context/__tests__/PetContext.test.tsx
import React from "react";
import { render, act, fireEvent } from "@testing-library/react-native";
import { PetProvider, usePetContext } from "../PetContext"; 
import { TextInput, TouchableOpacity, Text } from "react-native";

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

describe("PetContext", () => {
  const TestComponent: React.FC = () => {
    const { pets, addPet, updatePet, deletePet, searchPets } = usePetContext();

    return (
      <React.Fragment>
        <TextInput
          placeholder="Search Pet"
          onChangeText={(text) => searchPets(text)}
        />
        <Text testID="pets-list">{JSON.stringify(pets)}</Text>
        <TouchableOpacity onPress={() => addPet({ id: "1", name: "Max", age: "5", description: "Friendly dog", image: "" })}>
          <Text>Add Pet</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => updatePet({ id: "1", name: "Max Updated", age: "5", description: "Friendly dog", image: "" })}>
          <Text>Update Pet</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deletePet("1")}>
          <Text>Delete Pet</Text>
        </TouchableOpacity>
      </React.Fragment>
    );
  };

  const renderWithProvider = () =>
    render(
      <PetProvider>
        <TestComponent />
      </PetProvider>
    );

  beforeEach(() => { 
    jest.clearAllMocks();
  });

  it("should initialize with empty pets list", async () => {
    const { getByTestId } = renderWithProvider();
    
    expect(getByTestId("pets-list").props.children).toBe("[]");
  });

  it("should add a pet", async () => {
    const { getByText, getByTestId } = renderWithProvider();
 
    act(() => {
      fireEvent.press(getByText("Add Pet"));
    });
 
    expect(getByTestId("pets-list").props.children).toContain("Max");
  });

  it("should update a pet", async () => {
    const { getByText, getByTestId } = renderWithProvider();
 
    act(() => {
      fireEvent.press(getByText("Add Pet"));
    });
 
    act(() => {
      fireEvent.press(getByText("Update Pet"));
    });
 
    expect(getByTestId("pets-list").props.children).toContain("Max Updated");
  });

  it("should delete a pet", async () => {
    const { getByText, getByTestId } = renderWithProvider();
 
    act(() => {
      fireEvent.press(getByText("Add Pet"));
    });
 
    act(() => {
      fireEvent.press(getByText("Delete Pet"));
    });
 
    expect(getByTestId("pets-list").props.children).toBe("[]");
  });

  it("should search pets by name", async () => {
    const { getByText, getByTestId, getByPlaceholderText } = renderWithProvider();
 
    act(() => {
      fireEvent.press(getByText("Add Pet"));
    });
    act(() => {
      fireEvent.press(getByText("Add Pet"));
    });
 
    act(() => {
      fireEvent.changeText(getByPlaceholderText("Search Pet"), "Max");
    });
 
    expect(getByTestId("pets-list").props.children).toContain("Max");
  });

  it("should handle async storage correctly", async () => {
    const { getByText } = renderWithProvider();
 
    act(() => {
      fireEvent.press(getByText("Add Pet"));
    });
 
    expect(require("@react-native-async-storage/async-storage").setItem).toHaveBeenCalledWith(
      "pets",
      expect.any(String)  
    );
  });
});
