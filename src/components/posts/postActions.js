import axios from "axios";

const getPosts = () => {
  //get posts from firebase
  //setPosts to context
};

const createPost = async (formData) => {
  console.log("---createPost Initiated--- env: ", process.env.NODE_ENV);

  //Send data to firebase
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  await axios
    .post(`${domain}/posts`, formData, config)
    .then((res) => console.log("axios res", res))
    .catch((err) => console.log("axios err", err));

  //get updated list of post from friebase for the postsList
};

const updatePost = ({}) => {
  //send updateData to firebase
  //get upDateResult
};

export { getPosts, createPost, updatePost };
