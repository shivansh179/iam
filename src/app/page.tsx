"use client"

import React, { useState } from 'react';

// Define the interface for the candidate
interface Candidate {
  name: string;
  photo: string;
  description: string;
}

// Define the interface for the party
interface Party {
  name: string;
  logo: string;
  candidate: Candidate;
}

const Landing = () => {
  const [selectedParty, setSelectedParty] = useState<Party | null>(null); // State to track the selected party
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  const parties: Party[] = [
    { 
      name: 'BJP', 
      logo: '/Parties/bjp.png',
      candidate: { name: 'Narendra Modi', photo: '/Candidates/modi.jpeg', description: 'Prime Minister of India since 2014. Yehi to real banda hai' }
    },
    { 
      name: 'Congress', 
      logo: '/Parties/congress.png',
      candidate: { name: 'Rahul Gandhi', photo: '/Candidates/rahul.jpeg', description: 'Leader of the Indian National Congress. I dont like him' }
    },
    { 
      name: 'TMC', 
      logo: '/Parties/tmc.png',
      candidate: { name: 'Mamata Banerjee', photo: '/Candidates/mamata.jpeg', description: 'Chief Minister of West Bengal. I dont like her' }
    },
    { 
      name: 'Samajvadi', 
      logo: '/Parties/sp.png',
      candidate: { name: 'Akhilesh Yadav', photo: '/Candidates/akhilesh.jpeg', description: 'Former Chief Minister of Uttar Pradesh. I dont like him' }
    },
    { 
      name: 'Bahujan Samaj Vadi', 
      logo: '/Parties/bsp.png',
      candidate: { name: 'Mayawati', photo: '/Candidates/mayawati.jpg', description: 'Leader of the Bahujan Samaj Party. I dont like her' }
    },
  ];

  const openModal = (party: Party) => {
    setSelectedParty(party);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedParty(null);
  };

  return (
    <div className="bg-gray-100 h-fit w-screen flex flex-col items-center">
      <div className="w-full py-6 bg-white shadow-md flex items-center justify-between">
        <img src="/election.png" alt="Government of India Logo" className="h-12" />
        <div className='flex items-center md:gap-5 lg:gap-5'>
            <h1 className="text-xl text-gray-800 font-sans font-semibold">Election Commission of India</h1>
            <img src="/gov.svg" alt="Government of India Logo" className="h-12" />
        </div>
      </div>
      <p className='text-gray-900 font-mono font-semibold'>
        Please click on a party image to check who is standing on behalf of that party
      </p>
      <div className="mt-10">
        <p className="text-lg text-gray-700 font-semibold">Participated Parties</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
          {parties.map((party, index) => (
            <div 
              key={index} 
              className="bg-white p-4 shadow-lg rounded-lg text-center cursor-pointer" 
              onClick={() => openModal(party)}
            >
              <img src={party.logo} alt={`${party.name} Logo`} className="h-20 mx-auto mb-4" />
              <h2 className="text-lg font-medium text-gray-800">{party.name}</h2>
              <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
                Vote {party.name}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedParty && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-xl font-semibold mb-4 text-center">{selectedParty.candidate.name}</h2>
            <img src={selectedParty.candidate.photo} alt={selectedParty.candidate.name} className="h-40 w-40 mx-auto rounded-full mb-4" />
            <p className="text-gray-700 text-center">{selectedParty.candidate.description}</p>
            <button 
              className="mt-6 px-4 py-2 bg-red-500 text-white rounded-full w-full hover:bg-red-600"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Landing;
