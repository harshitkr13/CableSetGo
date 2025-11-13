import React, { useEffect, useState } from "react";
import mockServer from "../mockApi/mockServer";
import PlanCard from "../components/PlanCard";
import Skeleton from "../components/Skeleton";
import useRevealOnScroll from "../utils/useRevealOnScroll";

function Plans() {
  const [plans, setPlans] = useState(null);
  useRevealOnScroll();

  useEffect(() => {
    // simulate network delay for skeleton demo
    setTimeout(() => setPlans(mockServer.getPlans()), 600);
  }, []);

  return (
    <div className="mt-16">
      <h1 className="text-3xl font-semibold text-center mb-6 reveal">Available Plans</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        {!plans
          ? Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-40" />
            ))
          : plans.map((p) => <div className="reveal" key={p.id}><PlanCard plan={p} /></div>)
        }
      </div>
    </div>
  );
}

export default Plans;
