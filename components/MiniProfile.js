import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { useRecoilState } from "recoil";
import { userState } from "../atom/userAtom";

const MiniProfile = () => {
  const [currentUser, setCurrentUser] = useRecoilState(userState);
  const auth = getAuth();

  const onSignOut = () => {
    signOut(auth);
    setCurrentUser(null)
  };

  return (
    <div className="flex items-center justify-between mt-14 ml-10">
      <img
        className="h-16 rounded-full border p-[2px] "
        src={currentUser?.userImg}
        alt="marian-pic"
      />
      <div className="flex-1 ml-4">
        <h2 className="font-bold">{currentUser?.username}</h2>
        <h3 className="text-sm text-gray-400">Welcome to Instagram</h3>
      </div>
      <button
        onClick={onSignOut}
        className="font-semibold text-blue-400 text-sm"
      >
        Sign Out
      </button>
    </div>
  );
};

export default MiniProfile;
