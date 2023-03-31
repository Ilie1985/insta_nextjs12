import React from "react";

const MiniProfile = () => {
  return (
    <div className="flex items-center justify-between mt-14 ml-10">
      <img className="h-16 rounded-full border p-[2px] "
        src="https://media.licdn.com/dms/image/C4D03AQHlMq3vFRy6DQ/profile-displayphoto-shrink_800_800/0/1645124997754?e=2147483647&v=beta&t=lCWYwD_G_je1XkeucVLOEDFyBTUprs0V46AFOEJUDo0"
        alt="marian-pic"
      />
      <div className="flex-1 ml-4">
        <h2 className="font-bold">marianilie</h2>
        <h3 className="text-sm text-gray-400">Welcome to Instagram</h3>
      </div>
      <button className="font-semibold text-blue-400 text-sm">Sign Out</button>
    </div>
  );
};

export default MiniProfile;
