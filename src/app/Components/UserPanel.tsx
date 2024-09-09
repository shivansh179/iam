"use client";

import { useEffect, useState } from "react";
import { getContract, getSigner } from "../../../utils/ethers";
import { Overrides } from "ethers";

const UserPanel = () => {
  const [candidates, setCandidates] = useState([]);
  const [hasVoted, setHasVoted] = useState(false);

  const fetchCandidates = async () => {
    try {
      const contract = await getContract();
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

  const checkIfVoted = async () => {
    try {
      const contract = await getContract();
      const signer = await getSigner();
      const voterAddress = await signer.getAddress();
      console.log("Voter Address:", voterAddress);
      const voted = await contract.voters(voterAddress);
      console.log("Voted Status:", voted);
      setHasVoted(voted);
    } catch (error) {
      console.error("Error checking vote status:", error);
    }
  };

  const voteForCandidate = async (id: any | Overrides) => {
    try {
      const contract = await getContract();
      const tx = await contract.vote(id);
      await tx.wait();
      alert("Vote cast successfully!");
      setHasVoted(true);
      fetchCandidates();
    } catch (error) {
      console.error("Error voting:", error);
      alert(error.message);
    }
  };

  useEffect(() => {
    const initialize = async () => {
      await fetchCandidates();
      await checkIfVoted();
    };
    initialize();
  }, []);

  return (
    <div className="mt-8">
      <h2 className="mb-4 text-xl">Vote for a Candidate</h2>
      {hasVoted ? (
        <p className="text-green-500">You have already voted.</p>
      ) : (
        <table className="w-full text-left border">
          <thead>
            <tr>
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Age</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate) => (
              <tr key={candidate.id.toString()}>
                <td className="px-4 py-2 border">{candidate.id.toString()}</td>
                <td className="px-4 py-2 border">{candidate.name}</td>
                <td className="px-4 py-2 border">{candidate.age.toString()}</td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => voteForCandidate(candidate.id)}
                    className="px-2 py-1 text-white bg-blue-500 rounded"
                  >
                    Vote
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserPanel;
