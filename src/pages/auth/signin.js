import React from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Header from "../../../components/Header";
import { db } from "../../../firebase";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";

const Signin = () => {
  const router = useRouter();

  const onGoogleClick = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      const user = auth.currentUser.providerData[0];
      const docRef = doc(db, "users", user.uid);
      const docsnap = await getDoc(docRef);

      if (!docsnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          userImg: user.photoURL,
          uid: user.uid,
          timestamp: serverTimestamp(),
          username: user.displayName.split(" ").join("").toLowerCase(),
        });
      }
      router.push("/");
    } catch (error) {
      console.log("LOGGED ERROR", error);
    }
  };

  return (
    <div>
      <Header />
      <div className="flex justify-center space-x-7 mt-20">
        <img
          className="hidden object-cover rotate-6 md:inline-flex md:w-48"
          src="https://superviral.com.au/wp-content/uploads/2021/08/instagix-banner-graphic.png"
          alt="instagram image"
        />
        <div className="">
          <div className="flex flex-col items-center">
            <img
              className="w-32 object-cover "
              src="https://socodigital.com/wp-content/uploads/2021/03/Instagram.png"
              alt="insta logo"
            />
            <p className="text-sm italic my-10 text-center">
              This app is created for learning purposes
            </p>
            <button
              className="bg-red-400 rounded-lg p-3 text-white hover:bg-red-500"
              onClick={onGoogleClick}
            >
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
