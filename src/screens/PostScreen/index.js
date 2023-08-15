import React, { useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useTheme } from "../../theme/ThemeProvider";
import { AntDesign, Entypo } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  dontLovePost,
  lovePost,
  deletePost,
} from "../../redux/reducers/postSlice.js";

import { ScrollView } from "react-native";
import {
  deletePostFromFirebase,
  getPosts,
  updatePostFromFirebase,
} from "../../api";

const PostScreen = ({ navigation, ...props }) => {
  const [posts, setPosts] = useState([]);

  const { navigate } = navigation;

  const dispatch = useDispatch();
  // const posts = useSelector((state) => state.posts);

  const loadData = async () => {
    // const result = [];
    // const data = await getPosts();
    // await data.forEach((query) =>
    //   result.push({ key: query.id, posts: query.data() })
    // );
    // const resultData = result.map((doc) => {
    //   return doc.posts;
    // });
    // resultData.map((result) => {});
    // setPosts(resultData);
  };

  useEffect(() => {
    loadData();
  }, [dispatch, navigate]);
  useFocusEffect(() => {
    loadData();
  });

  const handleLoveIt = (postId, loveIts) => {
    // dispatch(lovePost(postId));
    updatePostFromFirebase(postId, loveIts);
    loadData();
  };

  const handleDontLoveIt = (postId, loveIts) => {
    //  dispatch(dontLovePost(postId));
    updatePostFromFirebase(postId, loveIts);
    loadData();
  };

  const handleDeletePost = (postId) => {
    // dispatch(deletePost(postId));
    deletePostFromFirebase(postId);
    loadData();
  };

  const handleAddPost = () => {
    // dispatch(addPost(item));
    navigation.navigate("NewPost");
  };

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.postContainer,
        { backgroundColor: item?.loveIts > 0 ? "green" : "red" },
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
            onPress={() =>
              handleLoveIt(item.id, (item.loveIts = item.loveIts + 1))
            }
          />
        </TouchableOpacity>
        {/* <Button title="Don't Love It" onPress={() => handleDontLoveIt(item.id)} /> */}
        <TouchableOpacity>
          <AntDesign
            style={{ marginRight: 12 }}
            name="dislike2"
            size={24}
            color="orange"
            onPress={() =>
              handleDontLoveIt(item.id, (item.loveIts = item.loveIts - 1))
            }
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
            {item?.loveIts}
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
      <View style={{ bottom: 24, top: 12 }}>
        <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={(item, id) => id}
          contentContainerStyle={{
            marginBottom: 68,
          }}
          extraData={navigation}
        />
      </View>
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
