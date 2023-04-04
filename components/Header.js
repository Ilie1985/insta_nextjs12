import React, { useEffect } from "react";
import Image from "next/image";
import { SearchIcon, PlusCircleIcon } from "@heroicons/react/outline";
import { HomeIcon } from "@heroicons/react/solid";

import { useRecoilState } from "recoil";
import { modalState } from "../atom/modalAtom";
import { useRouter } from "next/router";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { userState } from "../atom/userAtom";
import { db } from "../firebase";

const Header = () => {
  const [currentUser, setCurrentUser] = useRecoilState(userState);
  const [open, setOpen] = useRecoilState(modalState);
  const router = useRouter();
  const auth = getAuth();

  useEffect(() => {
   
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const fetchUser = async () => {
          const docRef = doc(
            db,
            "users",
            user.auth.currentUser.providerData[0].uid
          );
          const docsnap = await getDoc(docRef);

          if (docsnap.exists()) {
            setCurrentUser(docsnap.data());
            console.log(currentUser);
          }
        };
        fetchUser();
      }
    });
  }, []);

  const onSignOut = () => {
    signOut(auth);
    setCurrentUser(null);
  };

  return (
    <div className="shadow-sm border-b sticky top-0 bg-white z-30">
      <div className="flex items-center justify-between max-w-6xl mx-4 xl:mx-auto">
        {/* Left */}
        <div className=" cursor-pointer h-24 w-24 relative hidden lg:inline-grid">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2560px-Instagram_logo.svg.png"
            className="object-contain"
            layout="fill"
            onClick={() => {
              router.push("/");
            }}
          />
        </div>

        <div className=" cursor-pointer h-24 w-10 relative lg:hidden">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/9/95/Instagram_logo_2022.svg"
            className="object-contain"
            layout="fill"
            onClick={() => {
              router.push("/");
            }}
          />
        </div>

        {/* Middle */}
        <div className="relative mt-1">
          <div className="absolute top-2 left-2">
            <SearchIcon className="h-5 text-gray-500 " />
          </div>
          <input
            type="text"
            className="bg-gray-50 pl-10 border-gray-500 text-sm focus:ring-black focus:border-black rounded-md"
            placeholder="Search"
          />
        </div>

        {/* Right */}
        <div className="flex space-x-4 items-center">
          <HomeIcon
            className="hidden md:inline-flex h-6 cursor-pointer hover:scale-125 transition-transform duration-200 ease-out"
            onClick={() => {
              router.push("/");
            }}
          />

          {currentUser ? (
            <>
              <PlusCircleIcon
                className="h-6 cursor-pointer hover:scale-125 transition-transform duration-200 ease-out"
                onClick={() => {
                  setOpen(true);
                }}
              />
              <img
                src={currentUser?.userImg}
                alt="user-image"
                className="h-10 rounded-full cursor-pointer"
                onClick={onSignOut}
              />
            </>
          ) : (
            <button
              onClick={() => {
                router.push("/auth/signin");
              }}
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
