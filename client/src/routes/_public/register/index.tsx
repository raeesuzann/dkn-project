import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/_public/register/')({
  component: Register,
});

function Register() {
  const navigate = useNavigate();
  const [emailAddress, setEmailAddress] = useState('');

  const sendRequest = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    navigate({ to: '/login', search: { redirect: location.pathname } });
  };

  return (
    <div id="register">
      <h3 className="text-4xl my-2">Request Onboarding</h3>
      <p className="w-[600px] text-sm mb-8 text-green-400">
        Please submit your email address if you are valid user for DKN system.
        Credentials with be send to your requested email address
      </p>
      <form onSubmit={sendRequest}>
        <div className="w-[600px]">
          <label htmlFor="email_address">Email Address</label>
          <input
            id="email_address"
            type="text"
            value={emailAddress}
            className="bg-white outline-0 block w-2/3 rounded-md h-[40px] text-black px-3"
            onChange={(e) => setEmailAddress(e.target.value)}
          />

          <button className="mt-3">Send Onboarding Request</button>
        </div>
      </form>
    </div>
  );
}
