import React, { useEffect, useState } from "react";
import minifaker from "minifaker";

const Suggestions = () => {
  const [suggestion, setSuggestion] = useState([]);

  useEffect(() => {
    const suggestions = minifaker.array(5, (i) => ({
      username: minifaker.username({ locale: "en" }).toLowerCase(),
      jobTitle: minifaker.jobTitle(),
      img: `https://i.pravatar.cc/150?img=${Math.ceil(Math.random() * 70)}`,
      id: i,
    }));
    setSuggestion(suggestions);
  }, []);

  return (
    <div className="mt-4 ml-10">
      <div className="flex justify-between mb-5 text-sm">
        <h3 className="font-bold text-gray-400 ">Suggestions for you</h3>
        <button className="text-gray-600 font-semibold">See All</button>
      </div>
      {suggestion.map((user) => {
        return (
          <div className="flex items-center justify-between mt-3" key={user.id}>
            <img
              src={user.img}
              alt={user.username}
              className="h-10 rounded-full border p-[2px]"
            />

            <div className="flex-1 ml-4">
              <h2 className="font-semibold text-sm ">{user.username}</h2>
              <h3 className="text-sm text-gray-400 truncate w-[230px]">
                {user.jobTitle}
              </h3>
            </div>

            <button className="font-semibold text-blue-400 text-sm">
              Follow
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Suggestions;
