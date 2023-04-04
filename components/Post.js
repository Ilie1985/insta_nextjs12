import React, { useEffect, useState } from "react";
import {
  DotsHorizontalIcon,
  HeartIcon,
  ChatIcon,
  BookmarkIcon,
  EmojiHappyIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import Moment from "react-moment";

const Post = ({ id, username, userImg, img, caption }) => {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "posts", id, "comments"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => {
        setComments(snapshot.docs);
      }
    );
    return unsubscribe;
  }, [db, id]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts", id, "likes"),
      (snapshot) => setLikes(snapshot.docs)
    );
  }, [db]);

  useEffect(() => {
    setHasLiked(
      likes.findIndex((like) => {
        return like.id === session?.user.uid;
      }) !== -1
    );
  }, [likes]);

  const sendComment = async (e) => {
    e.preventDefault();
    const commentToSend = comment;
    setComment("");
    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session.user.username,
      userImage: session.user.image,
      timestamp: serverTimestamp(),
    });
  };

  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
        username: session.user.username,
      });
    }
  };

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
            {hasLiked ? (
              <HeartIconFilled
                onClick={likePost}
                className=" text-red-400 btn"
              />
            ) : (
              <HeartIcon onClick={likePost} className="btn" />
            )}

            <ChatIcon className="btn" />
          </div>
          <BookmarkIcon className="btn" />
        </div>
      )}

      {/* Post Comments */}
      <p className="p-5 truncate">
        {likes.length > 0 && <p className="font-bold mb-1 ">{likes.length} likes</p>}
        <span className="font-bold mr-2">{username}</span> {caption}
      </p>
      {comments.length > 0 && (
        <div className="mx-10 max-h-24 overflow-y-scroll scrollbar-none ">
          {comments.map((comment) => {
            return (
              <div
                className="flex items-center space-x-2 mb-2"
                key={comment.data().id}
              >
                <img
                  src={comment.data().userImage}
                  alt="user-image"
                  className="h-7 rounded-full object-cover"
                />
                <p className="font-semibold">{comment.data().username}</p>
                <p className="flex-1 truncate ">{comment.data().comment}</p>
                <Moment fromNow>{comment.data().timestamp?.toDate()}</Moment>
              </div>
            );
          })}
        </div>
      )}

      {/* Post Input Part */}

      {session && (
        <form className="flex items-center p-4">
          <EmojiHappyIcon className="h-7 " />
          <input
            value={comment}
            type="text"
            placeholder="Enter your comment..."
            className="border-none flex-1 focus:ring-0"
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
          <button
            type="submit"
            disabled={!comment.trim()}
            className="text-blue-400 font-bold disabled:text-blue-200"
            onClick={sendComment}
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
};

export default Post;
