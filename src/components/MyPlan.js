import React, { useState } from 'react';
import Home from './Home';
import MyForm from './MyForm';

const MyPlan = ({plans}) => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const fields = [
    { name: 'nom', label: 'Nom', type: 'text', placeholder: 'Entrer votre Nom' },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'Entrer votre email' },
  ];

  const handleSelectPlan = (planName) => {
    setSelectedPlan(planName);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted with plan:', selectedPlan);
  };
{/* gestion du login  */}
  // const [isLoggedIn, setIsLoggedIn] = useState(false); 
  // const handleLogin = (status) => { setIsLoggedIn(status); };

  return (
    <div className="container mx-auto">
      <Home plans={plans} onSelectPlan={handleSelectPlan} />
      {selectedPlan && (
        <>
        <div className="bg-gray-900 py-16">
        <div className="container mx-auto p-4">
          <h2 className="text-2xl font-bold mb-4">Inscription à la formule {selectedPlan}</h2>
          <MyForm fields={fields} onSubmit={handleSubmit} />
        </div>
        </div>
        {/* <form onSubmit={handleSubmit} className="mt-4">
          <h2 className="text-xl font-bold mb-2">Inscription à la formule {selectedPlan}</h2>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2 font-bold">Nom</label>
            <input
              type="text"
              id="name"
              name="name"
              className="p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 font-bold">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
            S'inscrire
          </button>
        </form> */}
        </>
      )}
    </div>
  );
};

export default MyPlan;
