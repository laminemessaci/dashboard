import React from "react";
import { useTheme } from "../../theme/ThemeProvider";

import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { dontLovePost, lovePost } from "../../redux/reducers/reducers.js";

const PostScreen = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  console.log("Posts: ", posts);
  const handleLoveIt = (postId) => {
    console.log(postId);
    dispatch(lovePost(postId));
  };

  const handleDontLoveIt = (postId) => {
    dispatch(dontLovePost(postId));
  };

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.postContainer,
        { backgroundColor: item.loveIts > 0 ? "green" : "red" },
      ]}
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text>{item.content}</Text>
      <Button title="Love It" onPress={() => handleLoveIt(item.id)} />
      <Button title="Don't Love It" onPress={() => handleDontLoveIt(item.id)} />
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
  },
  postContainer: {
   paddingHorizontal:4,
   paddingVertical:4,
   marginHorizontal:4,
   marginVertical:4


   
  },
});

export default PostScreen;
