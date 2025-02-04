import React from 'react';
import { useParams } from 'react-router-dom';

function UserDetails() {
  const { name }=useParams();
  return (
  <>
      <h3 style={{display:"flex", height:"83vh" ,alignItems:"center" , justifyContent:"center" }}>
        User  Name  is {name} !
      </h3>
  </>
  )
}

export default UserDetails;
