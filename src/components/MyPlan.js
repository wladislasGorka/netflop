import React, { useState, useContext } from 'react';
import Home from './Home';
import MyForm from './MyForm';
import { LogContext } from './LogContext';

const MyPlan = ({plans, selectedPlan, onSelectPlan}) => {
  const { isLoggedIn, setIsLoggedIn } = useContext(LogContext);
  const [selectedSubscription,setSelectedSubscription] = useState(null);
  const fields = [
    { name: 'nom', label: 'Nom', type: 'text', placeholder: 'Entrer votre Nom' },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'Entrer votre email' },
  ];
  const subscription = JSON.parse(localStorage.getItem('user'))["subscription"];

  const handleSubmit = (e) => {
    console.log('Form submitted with plan:', selectedPlan);
    let user = JSON.parse(localStorage.getItem('user'));
    user["subscription"] = selectedPlan;
    //console.log(user);
    localStorage.setItem('user', JSON.stringify(user));
    setSelectedSubscription(user.subscription);
  };

{/* gestion du login  */}
  // const [isLoggedIn, setIsLoggedIn] = useState(false); 
  // const handleLogin = (status) => { setIsLoggedIn(status); };

  return (
    <div className="container mx-auto">
      {(subscription && isLoggedIn) && (
        <div className="bg-gray-900 p-16">
        <h2 className="text-xl font-bold mb-2">Vous êtes inscrit à la formule {subscription}</h2>
        <Home plans={plans} onSelectPlan={onSelectPlan}/>
        {(selectedPlan && selectedPlan!==subscription) && (
          <>
          <div className="bg-gray-900 py-16">
            <div className="container mx-auto p-4">
              <h2 className="text-2xl font-bold mb-4">Inscription à la formule {selectedPlan}</h2>
              <MyForm fields={fields} onSubmit={handleSubmit} />
            </div>
          </div>
          </>
        )}
        </div>
      )}
      {(!subscription && isLoggedIn) &&(
        <>
        <Home plans={plans} onSelectPlan={onSelectPlan}/>
        {selectedPlan && (
          <>
          <div className="bg-gray-900 py-16">
            <div className="container mx-auto p-4">
              <h2 className="text-2xl font-bold mb-4">Inscription à la formule {selectedPlan}</h2>
              <MyForm fields={fields} onSubmit={handleSubmit} />
            </div>
          </div>
          </>
        )}
        </>
      )}
    </div>
  );
};

export default MyPlan;
