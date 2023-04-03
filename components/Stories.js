import React, { useEffect, useState } from "react";
import minifaker from "minifaker";
import "minifaker/locales/en";
import Story from "./Story";
import { useSession } from "next-auth/react";

const Stories = () => {
  const [storyUser, setStoryUser] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    const storyUsers = minifaker.array(20, (i) => ({
      username: minifaker.username({ locale: "en" }).toLowerCase(),
      img: `https://i.pravatar.cc/150?img=${Math.ceil(Math.random() * 70)}`,
      id: i,
    }));
    setStoryUser(storyUsers);
  }, []);

  return (
    <div className="flex space-x-2 p-6bg-white mt-8 border-gray-200 border overflow-x-scroll rounded-sm scrollbar-none">
      {session && <Story img={session.user.image} username={session.user.username} isUser="true"/>}
      {storyUser.map((user) => {
        return <Story key={user.id} username={user.username} img={user.img} />;
      })}
    </div>
  );
};

export default Stories;
