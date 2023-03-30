import React from 'react'

const Story = ({user}) => {
  return (
    <div>
      <img src={user.img} alt={user.username} />
      <p>{user.username}</p>
    </div>
  )
}

export default Story