import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [
    {
      id: 1,
      title: "title",
      content: "content ",
      loveIts: -5,
      created_at: new Date(),
    },
    {
      id: 2,
      title: "title",
      content: "content ",
      loveIts: 5,
      created_at: new Date(),
    },
    {
      id: 3,
      title: "title",
      content: "content ",
      loveIts: 5,
      created_at: new Date(),
    },
    {
      id: 4,
      title: "title",
      content: "content ",
      loveIts: -5,
      created_at: new Date(),
    },
    {
      id: 5,
      title: "title",
      content: "content ",
      loveIts: 5,
      created_at: new Date(),
    },
    {
      id: 6,
      title: "title",
      content: "content ",
      loveIts: 5,
      created_at: new Date(),
    },
    {
      id: 7,
      title: "title",
      content: "content ",
      loveIts: -5,
      created_at: new Date(),
    },
    {
      id: 8,
      title: "title",
      content: "content ",
      loveIts: 5,
      created_at: new Date(),
    },
    {
      id: 9,
      title: "title",
      content: "content ",
      loveIts: 5,
      created_at: new Date(),
    },
  ],
};

const postsSlice = createSlice({
  name: "posts",
  initialState: initialState,
  reducers: {
    addPost: (state, action) => {
      state.push(action.payload);
    },
    lovePost: (state, action) => {
      //console.log("action :", action.payload, state);
      const post = state.posts.find((p) => p.id === action.payload);
      if (post) {
        post.loveIts += 1;
      }
    },
    dontLovePost: (state, action) => {
      const post = state.posts.find((p) => p.id === action.payload);
      if (post) {
        post.loveIts -= 1;
      }
    },
  },
  // defaultState: (state) => {
  //   state = initialState;
  // },
});

export const { addPost, lovePost, dontLovePost } = postsSlice.actions;
export default postsSlice.reducer;
