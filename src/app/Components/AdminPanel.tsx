"use client";

import { useEffect, useState } from "react";
import { getContract } from "../../../utils/ethers";

const AdminPanel = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [candidates, setCandidates] = useState([]);

  const addCandidate = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const contract = await getContract();
      const tx = await contract.addCandidate(name, parseInt(age));
      await tx.wait();
      alert("Candidate added successfully!");
      setName("");
      setAge("");
      fetchCandidates();
    } catch (error) {
      console.error("Error adding candidate:", error);
      alert(error.message);
    }
  };

  const fetchCandidates = async () => {
    try {
      const contract = await getContract();
      // console.log("Contract methods:", Object.keys(contract.functions)); // Log available methods
      const count = await contract.candidatesCount();
      const tempCandidates = [];
      for (let i = 1; i <= count; i++) {
        const candidate = await contract.getCandidate(i);
        tempCandidates.push(candidate);
      }
      setCandidates(tempCandidates);
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  return (
    <div className="mt-8">
      <h2 className="mb-4 text-xl">Admin Panel</h2>
      <form onSubmit={addCandidate} className="flex flex-col max-w-md">
        <input
          type="text"
          placeholder="Candidate Name"
          className="p-2 text-black mb-2 border"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Age"
          className="p-2 text-black mb-4 border"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
        <button
          type="submit"
          className="px-4 py-2 text-white bg-green-500 rounded"
        >
          Add Candidate
        </button>
      </form>

      <h3 className="mt-8 mb-4 text-lg">Candidates</h3>
      <table className="w-full text-left border">
        <thead>
          <tr>
            <th className="px-4 py-2 border">ID</th>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Age</th>
            <th className="px-4 py-2 border">Votes</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate) => (
            <tr key={candidate.id.toString()}>
              <td className="px-4 py-2 border">{candidate.id.toString()}</td>
              <td className="px-4 py-2 border">{candidate.name}</td>
              <td className="px-4 py-2 border">{candidate.age.toString()}</td>
              <td className="px-4 py-2 border">{candidate.voteCount.toString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
