import { View, Text, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";
import CustomButton from "../../components/CustomButton/index.js";
import { useTheme } from "../../theme/ThemeProvider";

import { useDispatch } from "react-redux";
import { addPost } from "../../redux/reducers/reducers.js";
import { createPost } from "../../firebase/index.js";
import { generateUniqueId } from "../../utils/generatePosts.js";

const NewPostScreen = ({ navigation, ...props }) => {
  const theme = useTheme();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const dispatch = useDispatch();

  const handleAddPost = () => {
    if (title && content) {
      const newPost = {
        id: generateUniqueId(),
        title: title,
        content: content,
        loveIts: 0,
        created_at: new Date(),
      };
      dispatch(addPost(newPost));

      createPost(newPost);
      setTitle("");
      setContent("");
      navigation.navigate("Posts");
    } else {
      alert("Veuillez remplir tous les champs");
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajouter un Post</Text>
      <TextInput
        style={styles.input}
        placeholder="Titre"
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Contenu"
        value={content}
        multiline={true}
        numberOfLines={4}
        onChangeText={(text) => setContent(text)}
      />
      {/* <Button title="Ajouter" onPress={handleAddPost} /> */}
      <CustomButton
        label={"Valider"}
        theme={theme}
        type={"submit"}
        onPress={handleAddPost}
      />
    </View>
  );
};

export default NewPostScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
  },
});
