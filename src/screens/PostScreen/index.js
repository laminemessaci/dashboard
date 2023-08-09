import React from "react";
import { useTheme } from "../../theme/ThemeProvider";
import { AntDesign, Entypo } from "@expo/vector-icons";

import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  dontLovePost,
  lovePost,
  deletePost,
} from "../../redux/reducers/reducers.js";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ScrollView } from "react-native";

const PostScreen = ({ navigation, ...props }) => {
  // console.log(navigation)
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  //console.log("Posts: ", posts);
  const handleLoveIt = (postId) => {
    console.log(postId);
    dispatch(lovePost(postId));
  };

  const handleDontLoveIt = (postId) => {
    dispatch(dontLovePost(postId));
  };

  const handleDeletePost = (postId) => {
    dispatch(deletePost(postId));
  };

  const handleAddPost = () => {
    // dispatch(addPost(item));
    navigation.navigate("NewPost");
  };

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.postContainer,
        { backgroundColor: item.loveIts > 0 ? "green" : "red" },
      ]}
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.text}>{item.content}</Text>
      {/* <Button title="Love It" /> */}
      <View style={{ flexDirection: "row", margin: 12 }}>
        <TouchableOpacity style={{ alignItems: "center" }}>
          <AntDesign
            style={{ marginRight: 12 }}
            name="like2"
            size={24}
            color="blue"
            onPress={() => handleLoveIt(item.id)}
          />
        </TouchableOpacity>
        {/* <Button title="Don't Love It" onPress={() => handleDontLoveIt(item.id)} /> */}
        <TouchableOpacity>
          <AntDesign
            style={{ marginRight: 12 }}
            name="dislike2"
            size={24}
            color="orange"
            onPress={() => handleDontLoveIt(item.id)}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <AntDesign
            style={{ marginRight: 12 }}
            name="delete"
            size={24}
            color="yellow"
            onPress={() => handleDeletePost(item.id)}
          />
        </TouchableOpacity>
        <View style={styles.badgeContainer}>
          <Text style={{ fontSize: 16, color: "cyan", fontWeight: "bold" }}>
            {item.loveIts}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.postContainer}>
      <View
        style={{
          flexDirection: "row",
          margin: 12,
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.screenTitle}>Liste des Posts</Text>
        <TouchableOpacity style={styles.addButton}>
          <Entypo
            name="add-to-list"
            size={32}
            color="blue"
            onPress={() => handleAddPost()}
          />
        </TouchableOpacity>
      </View>
      <ScrollView style={{ marginBottom: 58 }}>
        <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={(item, id) => id}
          contentContainerStyle={{
            top: 8,
            marginBottom: 24,
          }}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screenTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  title: {
    fontWeight: "bold",
    color: "white",
  },
  text: {
    color: "#ffd",
  },
  postContainer: {
    marginHorizontal: 0,
    borderRadius: 8,
    marginVertical: 4,
    padding: 8,
  },
  addButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  badgeContainer: {
    backgroundColor: "black", // Couleur de fond du badge
    borderRadius: 10, // Forme arrondie
    width: 24, // Largeur du badge
    height: 24, // Hauteur du badge
    justifyContent: "center",
    alignItems: "center",
    position: "absolute", // Position absolue
    top: -5, // Position par rapport au parent
    right: -5, // Position par rapport au parent
  },
});

export default PostScreen;
