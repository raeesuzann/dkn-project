import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { StepBack } from 'lucide-react';
import { useForm } from 'react-hook-form';

export const Route = createFileRoute('/_public/register/')({
  component: Register,
});

function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ emailAddress: string }>();

  const sendRequest = (data: { emailAddress: string }) => {
    console.log({ data });

    navigate({ to: '/login' });
  };

  return (
    <div id="register" className="w-[550px] p-6 border rounded-lg">
      <Link
        to="/login"
        className="border-2 border-gray-300 flex items-center gap-2 mb-12 w-fit p-2 rounded-md hover:border-blue-600 transition-all"
      >
        <StepBack />
        Back to Login
      </Link>
      <h3 className="text-4xl my-2">Request Onboarding</h3>
      <p className="text-sm mb-12 text-green-700">
        Please submit your email address if you are valid user for DKN system.
        Credentials will be send to your requested email address
      </p>
      <form onSubmit={handleSubmit(sendRequest)}>
        <div className="w-[600px]">
          <label htmlFor="emailAddress">Email Address</label>
          <input
            id="emailAddress"
            type="text"
            className="bg-white outline-0 block w-2/3 rounded-md h-[40px] text-black px-3"
            {...register('emailAddress', {
              required: 'Email Address is required',
            })}
          />
          {errors.emailAddress && (
            <span id="errors">{errors.emailAddress.message}</span>
          )}
        </div>
        <button className="mt-3 bg-green-700 text-white">Send Onboarding Request</button>
      </form>
    </div>
  );
}
