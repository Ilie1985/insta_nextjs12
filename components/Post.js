import React from "react";
import {
  DotsHorizontalIcon,
  HeartIcon,
  ChatIcon,
  BookmarkIcon,
  EmojiHappyIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import { useSession } from "next-auth/react";

const Post = ({ id, username, userImg, img, caption }) => {
  const { data: session } = useSession();

  return (
    <div className="bg-white my-7 border rounded-md">
      {/* Post Header */}
      <div className="flex items-center p-5">
        <img
          src={userImg}
          alt={username}
          className="h-12 rounded-full object-cover border p-1 mr-3"
        />
        <p className="font-bold flex-1">{username}</p>
        <DotsHorizontalIcon className="h-5" />
      </div>
      {/* Post Image */}
      <img src={img} alt={img} className="object-cover w-full" />

      {/* Post Button */}
      {session && (
        <div className="flex justify-between px-4 pt-4">
          <div className="flex space-x-4">
            <HeartIcon className="btn" />
            <ChatIcon className="btn" />
          </div>
          <BookmarkIcon className="btn" />
        </div>
      )}

      {/* Post Comments */}
      <p className="p-5 truncate">
        <span className="font-bold mr-2">{username}</span> {caption}
      </p>

      {/* Post Input Part */}

      {session && (
        <form className="flex items-center p-4">
          <EmojiHappyIcon className="h-7 " />
          <input
            type="text"
            placeholder="Enter your comment..."
            className="border-none flex-1 focus:ring-0"
          />
          <button className="text-blue-400 font-bold">Post</button>
        </form>
      )}
    </div>
  );
};

export default Post;
