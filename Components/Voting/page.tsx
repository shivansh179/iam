import React from 'react';

const Landing = () => {
  const parties = [
    { name: 'Party A', logo: '/partyA-logo.png' },
    { name: 'Party B', logo: '/partyB-logo.png' },
    { name: 'Party C', logo: '/partyC-logo.png' },
  ];

  return (
    <div className="bg-gray-100 h-screen w-screen flex flex-col items-center">
      <div className="w-full p-6 bg-white shadow-md flex items-center justify-between">
        <img src="/gov-logo.png" alt="Government of India Logo" className="h-12" />
        <h1 className="text-xl font-semibold text-gray-800">Election Commission of India</h1>
      </div>
      <div className="mt-10">
        <p className="text-lg text-gray-700 font-semibold">Participated Parties</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
          {parties.map((party, index) => (
            <div key={index} className="bg-white p-4 shadow-lg rounded-lg text-center">
              <img src={party.logo} alt={`${party.name} Logo`} className="h-16 mx-auto mb-4" />
              <h2 className="text-lg font-medium text-gray-800">{party.name}</h2>
              <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
                Vote {party.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Landing;
