import React from "react";

export default function PracticePage({ practice, lawyer }){
  return (
    <div>
      <h1>{practice.name}</h1>
      <p>Attorney: {lawyer.name}</p>
    </div>
  );
}
