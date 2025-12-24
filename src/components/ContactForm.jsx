import React from "react";

export default function ContactForm() {
  const handleSubmit = async (e) => {
        console.log("e",e)
    e.preventDefault(); // ✅ This is crucial
    const formData = new FormData(e.target);
    console.log("formData",formData)

    const res = await fetch("/__mint_outcome", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        outcome: "contact_form_submitted",
        meta: Object.fromEntries(formData)
      })
    });

    if (res.ok) alert("Thanks! We will contact you shortly.");
  };

  return (
    <form onSubmit={handleSubmit} className="form-free-contact">
      <h3>Contact Us</h3>
      <input name="name" placeholder="Your Name" required />
      <input name="email" type="email" placeholder="Email" required />
      <button type="submit">Submit</button>
    </form>
  );
}
