import React, { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { modalState } from "../atom/modalAtom";
import Modal from "react-modal";
import { CameraIcon } from "@heroicons/react/outline";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";

import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { userState } from "../atom/userAtom";

const UploadModal = () => {
  const [open, setOpen] = useRecoilState(modalState);
  const filePickerRef = useRef(null);
  const captionRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useRecoilState(userState);

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  const uploadPost = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const docRef = await addDoc(collection(db, "posts"), {
      caption: captionRef.current.value,
      username: currentUser?.username,
      profileImg: currentUser?.userImg,
      timestamp: serverTimestamp(),
    });

    const imageRef = ref(storage, `posts/${docRef.id}/image`);
    await uploadString(imageRef, selectedFile, "data_url").then(
      async (snapshot) => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
      }
    );

    setOpen(false);
    setLoading(false);
    setSelectedFile(null);
  };

  return (
    <div>
      {open && (
        <Modal
          className="max-w-lg w-[90%] p-6  absolute top-56 left-[50%] translate-x-[-50%] bg-white border-2 rounded-md shadow:md"
          isOpen={open}
          onRequestClose={() => {
            setOpen(false);
            setSelectedFile(null);
          }}
        >
          <div className="flex flex-col justify-center items-center h-[100%]">
            {selectedFile ? (
              <img
                className="w-full max-h-[250px] object-cover cursor-pointer"
                src={selectedFile}
                alt=""
                onClick={() => {
                  setSelectedFile(null);
                }}
              />
            ) : (
              <CameraIcon
                className="cursor-pointer h-14 bg-red-200 p-2 rounded-full border-2 text-red-500"
                onClick={() => {
                  filePickerRef.current.click();
                }}
              />
            )}

            <input
              type="file"
              hidden
              ref={filePickerRef}
              onChange={addImageToPost}
            />
            <input
              type="text"
              maxLength="150"
              placeholder="Please enter your caption"
              className="m-4 border-none text-center w-full focus:ring-0 "
              ref={captionRef}
            />
            <button
              className="w-full bg-red-600 text-white p-2 shadow-md hover:brightness-125 disabled:bg-gray-200 disabled:cursor-not-allowed disabled:hover:brightness-100"
              disabled={!selectedFile || loading}
              onClick={uploadPost}
            >
              Upload Post
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default UploadModal;
