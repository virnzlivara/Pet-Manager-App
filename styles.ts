
import { 
    StyleSheet, 
  } from "react-native";
export const styles = StyleSheet.create({
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
      margin: 5
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
      display: "flex", 
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
    imagePreviewContainer: {
      marginTop: 16,
      alignItems: 'center',           
      justifyContent: 'center', 
      marginVertical: 16,
    },
    imagePreview: {
      width: 100,
      height: 100,
      borderRadius: 5,
      marginTop: 8,
      resizeMode: "cover",  // Optional: ensure image maintains its aspect ratio
    },
    petImage: {
      width: 100,
      height: 100,
      marginTop: 8,
      borderRadius: 5,
      resizeMode: "cover",
    },
    noDataContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
    },
    noDataText: {
      fontSize: 18,
      color: '#555',
      fontStyle: 'italic',
    }
  });
   
  