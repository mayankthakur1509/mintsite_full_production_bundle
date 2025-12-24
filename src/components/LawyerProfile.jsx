import React from "react";

export default function LawyerProfile({ lawyer }){
  return (
    <div className="mintsite-card">
      <h1>{lawyer.name}</h1>
      <p>{lawyer.title}</p>
      <p>{lawyer.bio}</p>
    </div>
  );
}
