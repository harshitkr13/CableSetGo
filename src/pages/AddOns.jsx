import React, { useEffect, useState } from "react";
import mockServer from "../mockApi/mockServer";
import { MdMovie, MdSportsSoccer, MdChildCare } from "react-icons/md";
import Skeleton from "../components/Skeleton";
import useRevealOnScroll from "../utils/useRevealOnScroll";

function AddOns() {
  const [addons, setAddons] = useState(null);

  // Scroll reveal for animated entrance
  useRevealOnScroll();

  // Map add-on names to icons
  const icons = {
    "Sports Add-On": <MdSportsSoccer className="text-green-600 text-4xl" />,
    "Movies Add-On": <MdMovie className="text-blue-600 text-4xl" />,
    "Kids Pack": <MdChildCare className="text-orange-500 text-4xl" />,
  };

  useEffect(() => {
    // Simulate network delay to show skeletons
    const t = setTimeout(() => setAddons(mockServer.getAddons()), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="mt-20 fade-in">
      <h1 className="text-4xl text-center font-semibold text-blue-700 reveal">
        Add-Ons
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        {/* Show skeletons while loading */}
        {!addons
          ? Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-40 w-full" />
            ))
          : addons.map((a) => (
              <div key={a.id} className="reveal">
                <div className="float-card bg-white p-6 rounded-xl shadow-lg h-full">
                  <div className="flex justify-center">{icons[a.name] ?? null}</div>
                  <h2 className="text-xl text-center font-bold mt-3">{a.name}</h2>
                  <p className="text-center text-blue-700 text-2xl mt-2 font-semibold">
                    ₹{a.price}
                  </p>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}

export default AddOns;