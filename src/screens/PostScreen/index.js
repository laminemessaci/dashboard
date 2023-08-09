import React from "react";
import { useTheme } from "../../theme/ThemeProvider";
import { AntDesign } from "@expo/vector-icons";

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

const PostScreen = () => {
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
        <Text style={{ fontSize: 16, color: "cyan" }}>{item.loveIts}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.postContainer}>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item, id) => id?.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    color: "white",
  },
  text: {
    color: "#ffd",
  },
  postContainer: {
    marginHorizontal: 0,
    marginVertical: 4,
    borderRadius: 8,
    padding: 8,
  },
});

export default PostScreen;
