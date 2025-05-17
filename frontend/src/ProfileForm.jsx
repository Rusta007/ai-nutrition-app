import React, { useState } from "react";

const ProfileForm = ({ onSubmit, onCancel, initialProfile }) => {
  const [profile, setProfile] = useState(
    initialProfile || {
      name: "",
      age: "",
      weight: "",
      goals: "",
      allergies: "",
      preference: "",
    }
  );

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(profile);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-white rounded shadow-md mb-4"
    >
      <h2 className="text-lg font-semibold mb-2">Personal Nutrition Profile</h2>
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={profile.name}
          onChange={handleChange}
          className="input"
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={profile.age}
          onChange={handleChange}
          className="input"
          required
        />
        <input
          type="number"
          name="weight"
          placeholder="Weight (kg)"
          value={profile.weight}
          onChange={handleChange}
          className="input"
          required
        />
        <input
          type="text"
          name="goals"
          placeholder="Goal (e.g., weight loss)"
          value={profile.goals}
          onChange={handleChange}
          className="input"
        />
        <input
          type="text"
          name="allergies"
          placeholder="Allergies"
          value={profile.allergies}
          onChange={handleChange}
          className="input"
        />
        <input
          type="text"
          name="preference"
          placeholder="Preference (e.g., veg)"
          value={profile.preference}
          onChange={handleChange}
          className="input"
        />
      </div>
      <div className="mt-4">
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded mr-4"
        >
          Save Profile
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-400 text-white rounded"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default ProfileForm;
