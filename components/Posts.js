import React from "react";
import Post from "./Post";

const Posts = () => {
  const posts = [
    {
      id: "1",
      username: "marianilie",
      userImg:
        "https://media.licdn.com/dms/image/C4D03AQHlMq3vFRy6DQ/profile-displayphoto-shrink_800_800/0/1645124997754?e=2147483647&v=beta&t=lCWYwD_G_je1XkeucVLOEDFyBTUprs0V46AFOEJUDo0",
      img: "https://images.unsplash.com/photo-1680034200933-09075ddb0843?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw2MXx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60",
      caption: "Into the wild",
    },
    {
      id: "2",
      username: "mario12",
      userImg:
        "https://media.licdn.com/dms/image/C4D03AQHlMq3vFRy6DQ/profile-displayphoto-shrink_800_800/0/1645124997754?e=2147483647&v=beta&t=lCWYwD_G_je1XkeucVLOEDFyBTUprs0V46AFOEJUDo0",
      img: "https://images.unsplash.com/photo-1679872995990-a9811773f3d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMzV8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
      caption: "Check them out ",
    },
  ];

  return (
    <div>
      {posts.map((post) => {
        return <Post key={post.id} post={post} />;
      })}
    </div>
  );
};

export default Posts;
