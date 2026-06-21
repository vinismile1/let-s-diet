import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  User,
  Mail,
  Ruler,
  Weight,
  Target
} from "lucide-react";

const Profile = () => {

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchProfile = async () => {

      try {

        const token = localStorage.getItem("token");

        const res = await axios.get(
          "https://let-s-diet-production.up.railway.app/users/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setProfile(res.data);

      } catch (err) {
        console.log(err);
      }

      finally {
        setLoading(false);
      }

    };

    fetchProfile();

  }, []);

  if (loading) {
    return (
      <div className="text-center text-gray-500">
        Loading Profile...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">

      {/* Header */}

      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-xl">

        <div className="flex items-center gap-5">

          <div className="w-24 h-24 rounded-full bg-white text-blue-600 flex items-center justify-center text-4xl font-bold">
            {profile.name[0].toUpperCase()}
          </div>

          <div>

            <h1 className="text-3xl font-bold">
              {profile.name}
            </h1>

            <p className="opacity-90 mt-2">
              {profile.email}
            </p>

          </div>

        </div>

      </div>


      {/* Cards */}

      <div className="grid md:grid-cols-2 gap-6 mt-8">

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow p-6">

          <div className="flex items-center gap-3 mb-4">

            <User className="text-blue-600"/>

            <h2 className="font-bold text-xl">
              Personal Details
            </h2>

          </div>

          <div className="space-y-4">

            <div className="flex items-center gap-3">
              <Mail className="text-gray-500"/>
              {profile.email}
            </div>

            <div className="flex items-center gap-3">
              <Ruler className="text-gray-500"/>
              Height: {profile.height} cm
            </div>

            <div className="flex items-center gap-3">
              <Weight className="text-gray-500"/>
              Weight: {profile.current_weight} kg
            </div>

            <div className="flex items-center gap-3">
              <Target className="text-gray-500"/>
              Goal: {profile.goal}
            </div>

          </div>

        </div>


        {/* Fitness Summary */}

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow p-6">

          <h2 className="font-bold text-xl mb-6">
            Fitness Summary
          </h2>

          <div className="space-y-6">

            <div>
              <p className="text-gray-500">
                Current Weight
              </p>

              <h1 className="text-4xl font-bold text-blue-600">
                {profile.current_weight} kg
              </h1>
            </div>

            <div>
              <p className="text-gray-500">
                Height
              </p>

              <h1 className="text-4xl font-bold text-green-600">
                {profile.height} cm
              </h1>
            </div>

            <div>
              <p className="text-gray-500">
                Goal
              </p>

              <h1 className="text-2xl font-bold text-orange-500">
                {profile.goal}
              </h1>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Profile;