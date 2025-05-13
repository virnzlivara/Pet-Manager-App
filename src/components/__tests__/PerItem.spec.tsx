 
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native'; 
import { Pet } from '../../types';
import PetItem from '../PetItem';

describe('PetItem Component', () => { 
  const pet: Pet = {
    id: '1',
    name: 'Max',
    age: '5',
    description: 'A friendly dog',
    image: 'http://example.com/max.jpg',
  };
 
  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();

  it('renders pet details correctly', () => { 
    const { getByText, getByTestId } = render(
      <PetItem pet={pet} onEdit={mockOnEdit} onDelete={mockOnDelete} />
    );
 
    expect(getByText('Name: Max')).toBeTruthy();
    expect(getByText('Age: 5')).toBeTruthy();
    expect(getByText('Description: A friendly dog')).toBeTruthy();
 
    expect(getByTestId('pet-image').props.source.uri).toBe('http://example.com/max.jpg');
  });

  it('calls onEdit when the edit button is pressed', () => { 
    const { getByText } = render(
      <PetItem pet={pet} onEdit={mockOnEdit} onDelete={mockOnDelete} />
    );
 
    fireEvent.press(getByText('Edit'));
 
    expect(mockOnEdit).toHaveBeenCalledWith(pet);
  });

  it('calls onDelete when the delete button is pressed', () => { 
    const { getByText } = render(
      <PetItem pet={pet} onEdit={mockOnEdit} onDelete={mockOnDelete} />
    );
 
    fireEvent.press(getByText('Delete'));
 
    expect(mockOnDelete).toHaveBeenCalledWith(pet.id);
  });
});
