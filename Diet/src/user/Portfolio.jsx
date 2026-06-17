import React, { useState } from "react";
import { User, Mail, Edit3, Save } from "lucide-react";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "User",
    email: "user@gmail.com",
    height: "175 cm",
    weight: "72 kg",
    goal: "Lose Fat",
  });

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    setIsEditing(false);
    // later: API call to backend to update user
    console.log("Updated Profile:", profile);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">

      {/* Header */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow flex items-center justify-between">

        <div className="flex items-center gap-3">
          <User className="text-blue-500" />
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            My Profile
          </h2>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
        >
          <Edit3 size={18} />
          {isEditing ? "Cancel" : "Edit"}
        </button>

      </div>

      {/* Profile Card */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow space-y-4">

        {/* Name */}
        <div>
          <label className="text-gray-500 dark:text-gray-300 text-sm">
            Name
          </label>

          {isEditing ? (
            <input
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="w-full mt-1 p-2 rounded-lg border dark:bg-slate-700 dark:text-white"
            />
          ) : (
            <p className="text-lg font-semibold text-gray-800 dark:text-white">
              {profile.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
          <Mail size={18} />
          <span>{profile.email}</span>
        </div>

        {/* Height */}
        <div>
          <label className="text-gray-500 dark:text-gray-300 text-sm">
            Height
          </label>

          {isEditing ? (
            <input
              name="height"
              value={profile.height}
              onChange={handleChange}
              className="w-full mt-1 p-2 rounded-lg border dark:bg-slate-700 dark:text-white"
            />
          ) : (
            <p className="text-gray-800 dark:text-white font-medium">
              {profile.height}
            </p>
          )}
        </div>

        {/* Weight */}
        <div>
          <label className="text-gray-500 dark:text-gray-300 text-sm">
            Weight
          </label>

          {isEditing ? (
            <input
              name="weight"
              value={profile.weight}
              onChange={handleChange}
              className="w-full mt-1 p-2 rounded-lg border dark:bg-slate-700 dark:text-white"
            />
          ) : (
            <p className="text-gray-800 dark:text-white font-medium">
              {profile.weight}
            </p>
          )}
        </div>

        {/* Goal */}
        <div>
          <label className="text-gray-500 dark:text-gray-300 text-sm">
            Fitness Goal
          </label>

          {isEditing ? (
            <select
              name="goal"
              value={profile.goal}
              onChange={handleChange}
              className="w-full mt-1 p-2 rounded-lg border dark:bg-slate-700 dark:text-white"
            >
              <option>Lose Fat</option>
              <option>Build Muscle</option>
              <option>Maintain</option>
            </select>
          ) : (
            <p className="text-gray-800 dark:text-white font-medium">
              {profile.goal}
            </p>
          )}
        </div>

        {/* Save Button */}
        {isEditing && (
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700"
          >
            <Save size={18} />
            Save Changes
          </button>
        )}

      </div>
    </div>
  );
};

export default Profile;