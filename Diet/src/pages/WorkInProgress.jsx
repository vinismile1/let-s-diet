import React from "react";
import { Construction, Clock3, Sparkles } from "lucide-react";

const WorkInProgress = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 bg-gray-100 dark:bg-slate-900">

      <div className="max-w-2xl w-full bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-10 text-center">

        {/* Icon */}
        <div className="w-24 h-24 mx-auto rounded-full bg-yellow-100 flex items-center justify-center mb-6">
          <Construction className="w-12 h-12 text-yellow-500" />
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
          Work In Progress
        </h1>

        {/* Subtitle */}
        <p className="text-gray-500 dark:text-gray-300 text-lg leading-relaxed mb-8">
          We're currently building this feature to provide you with
          a better experience. Stay tuned — exciting updates are coming soon!
        </p>

        {/* Status Cards */}
        <div className="grid md:grid-cols-2 gap-5">

          <div className="bg-blue-50 dark:bg-slate-700 rounded-2xl p-5">
            <Clock3 className="mx-auto text-blue-600 mb-3" size={35} />

            <h3 className="font-bold text-gray-800 dark:text-white">
              Development in Progress
            </h3>

            <p className="text-gray-500 dark:text-gray-300 mt-2">
              Features are actively being designed and implemented.
            </p>
          </div>

          <div className="bg-green-50 dark:bg-slate-700 rounded-2xl p-5">
            <Sparkles className="mx-auto text-green-600 mb-3" size={35} />

            <h3 className="font-bold text-gray-800 dark:text-white">
              Better Experience Coming
            </h3>

            <p className="text-gray-500 dark:text-gray-300 mt-2">
              We're working to make this section modern, fast, and user-friendly.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="mt-10 text-sm text-gray-400">
          Thank you for your patience ❤️
        </div>

      </div>

    </div>
  );
};

export default WorkInProgress;