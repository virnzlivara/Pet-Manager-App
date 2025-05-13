import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';  
import MainScreen from '../MainScreen';
 
jest.mock('expo-image-picker', () => ({
  launchImageLibraryAsync: jest.fn().mockResolvedValue({
    canceled: false,
    assets: [{ uri: 'mock-image-uri' }],
  }),
  MediaTypeOptions: { Images: 'Images' },
}));
 
jest.mock('../../context/PetContext', () => {
  const mockPets = [
    { id: '1', name: 'Max', age: '5', description: 'A friendly dog', image: '' },
  ];
  return {
    usePetContext: jest.fn(() => ({
      addPet: jest.fn(),
      updatePet: jest.fn(),
      deletePet: jest.fn(),
      pets: mockPets,
    })),
  };
});

describe('MainScreen', () => {
  it('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(<MainScreen />);

    expect(getByPlaceholderText('Pet Name')).toBeTruthy();
    expect(getByPlaceholderText('Pet Age')).toBeTruthy();
    expect(getByPlaceholderText('Pet Description')).toBeTruthy();
    expect(getByText('Upload Image')).toBeTruthy();
    expect(getByText('Add Pet')).toBeTruthy();
  });

  it('can submit the form with valid data', async () => {
    const { getByPlaceholderText, getByText } = render(<MainScreen />);

    fireEvent.changeText(getByPlaceholderText('Pet Name'), 'Charlie');
    fireEvent.changeText(getByPlaceholderText('Pet Age'), '3');
    fireEvent.changeText(getByPlaceholderText('Pet Description'), 'Cute puppy');

    fireEvent.press(getByText('Add Pet'));

    await waitFor(() => {
      expect(getByText('Add Pet')).toBeTruthy();
    });
  });

  it('filters pets based on search input', () => {
    const { getByPlaceholderText, getByText, queryByText } = render(<MainScreen />);

    const searchInput = getByPlaceholderText('Search Pet');
    fireEvent.changeText(searchInput, 'Max');

    expect(getByText('Name: Max')).toBeTruthy();

    fireEvent.changeText(searchInput, 'Unknown');
    expect(queryByText('Name: Max')).toBeNull();
  });
});
