import React, { useEffect, useState } from "react";
import minifaker from "minifaker";
import "minifaker/locales/en";
import Story from "./Story";

const Stories = () => {
  const [storyUser, setStoryUser] = useState([]);
  console.log(storyUser);
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
      {storyUser.map((user) => {
        return <Story key={user.id} user={user}/>;
      })}
    </div>
  );
};

export default Stories;
