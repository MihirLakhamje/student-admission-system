import { myApplication } from "@/api/applications";
import { useAuth } from "@/context/AuthProvider";
import React, { useEffect, useState } from "react";

export default function MyApplication() {
  const { user, isAuthenticated, token } = useAuth();
  const [application, setApplication] = useState({});
  useEffect(() => {
    async function fetchApplication() {
      const { data } = await myApplication(user?._id, token);
      setApplication(() => data);
      console.log(data);
    }

    fetchApplication();
  }, []);
  return (
    <>
      {application ? (
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-medium">
            {application?.student?.firstName}
          </h1>
          <p>Last name: {application?.student?.lastName}</p>
          <p>Email: {application?.student?.email}</p>
          <p>Phone: {application?.personalDetails?.phoneNumber}</p>
          <p>Programme: {application?.programme?.progTitle}</p>
          <p>Programme code: {application?.programme?.progCode}</p>
          <p className="text-lg font-semibold">Status: {application?.applicationStatus}</p>

        </div>
      ) : (
        <h1>Application not found</h1>
      )}
    </>
  );
}
