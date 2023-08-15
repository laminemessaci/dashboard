import { createSlice } from "@reduxjs/toolkit";
import { getRandomPost } from "../../utils/generatePosts.js";

const posts = [];
for (let i = 0; i < 5; i++) {
  posts.push(getRandomPost());
}

// console.log("postsnnn ", posts);

const initialState = {
  posts: posts || AsyncStorage.getItem("posts"),
  // posts:

  // [
  //   {
  //     id: "w4xd2nrwm",
  //     title: "infos monde",
  //     content:
  //       "Alors que l'année 2023 voit les conséquences du réchauffement climatique se multiplier, plusieurs indicateurs vont dans le sens contraire de ce que la lutte contre cette crise mondiale imposerait",
  //     loveIts: 0,
  //     created_at: "2023-03-19T00:52:25.765Z",
  //   },
  //   {
  //     id: "1wxw17gul",
  //     title: "Infos régions",
  //     content:
  //       "Autre énergie fossile utilisée principalement pour les transports et l'industrie de la pétrochimie, le pétrole bat lui aussi tous les records. En 2023, l'AIE prévoit une demande jamais égalée de 102,1 millions de barils en moyenne par jour, a-t-elle fait savoir le 7 juillet.",
  //     loveIts: 4,
  //     created_at: "2023-03-12T08:44:45.148Z",
  //   },
  //   {
  //     id: "cr2bi8ka7",
  //     title: "infos monde",
  //     content:
  //       "Alors que l'année 2023 voit les conséquences du réchauffement climatique se multiplier, plusieurs indicateurs vont dans le sens contraire de ce que la lutte contre cette crise mondiale imposerait",
  //     loveIts: 7,
  //     created_at: "2023-05-23T07:34:57.198Z",
  //   },
  //   {
  //     id: "q2j8t7jqe",
  //     title: "Météo et temps",
  //     content:
  //       "Un incendie s'est déclaré mercredi matin dans ce lieu qui accueillait des personnes handicapées venues passer leurs vacances dans le Haut-Rhin",
  //     loveIts: 0,
  //     created_at: "2023-05-10T13:32:42.159Z",
  //   },
  //   {
  //     id: "8zkmpcplz",
  //     title: "Economie et politiques",
  //     content:
  //       "Alors que l'année 2023 voit les conséquences du réchauffement climatique se multiplier, plusieurs indicateurs vont dans le sens contraire de ce que la lutte contre cette crise mondiale imposerait",
  //     loveIts: 1,
  //     created_at: "2023-03-26T20:40:48.892Z",
  //   },
  // ],
};

const postsSlice = createSlice({
  name: "posts",
  initialState: initialState,
  reducers: {
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
    deletePost: (state, action) => {
      const post = state.posts.find((p) => {
        return p.id === action.payload;
      });
      // console.log(post.id);

      if (post) {
        state.posts.splice(state.posts.indexOf(post), 1);
      }
    },

    addPost: (state, action) => {
      state.posts.push(action.payload);
    },
  },

  // defaultState: (state) => {
  //   state = initialState;
  // },
});

export const { addPost, lovePost, dontLovePost, deletePost } =
  postsSlice.actions;
export default postsSlice.reducer;


