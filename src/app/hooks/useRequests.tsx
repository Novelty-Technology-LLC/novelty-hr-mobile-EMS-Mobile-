import { useEffect, useState } from "react";

const useRequests = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      date: "Oct 20-24 (4 days)",
      type: "PAID TIME OFF",
      state: "Approved",
      sender: "Biren Gurung",
    },
    {
      id: 2,
      date: "Oct 28 (1 day)",
      type: "FLOATING",
      state: "In Progress",
      sender: "Biren Gurung",
    },
    {
      id: 3,
      date: "Oct 30 (1 day)",
      type: "PAID TIME OFF",
      state: "Denied",
      sender: "Biren Gurung",
    },
  ]);

  const deleteRequest = (id: number) => {
    setRequests(requests.filter((request) => request.id != id));
  };

  return [requests, deleteRequest];
};

export default useRequests;
