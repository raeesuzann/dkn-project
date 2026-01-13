import { api } from '@/lib/axios/config';
import type { IUser } from '@/types/user.interface';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export const Route = createFileRoute('/_authenticated/user-management/add')({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUser>();

  const onSubmit = async (data: IUser) => {
    const userAdded = await api.post('/user/add', data);

    console.log(userAdded, 'added');
    if (userAdded.status === 201) {
      toast.success('User added successfully');
      reset();
      navigate({ to: '/user-management' });
    } else {
      toast.error('User creation failed.');
    }
  };
  return (
    <div id="content-add">
      <h3 className="mb-8 text-3xl font-light">Add User</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <div className="w-full">
          <label className="block">Email: </label>
          <input
            className="w-2/6"
            type="text"
            {...register('email', { required: 'Email is required' })}
          />
          {errors.email && <span id="errors">{errors.email.message}</span>}
        </div>

        <div className="w-full">
          <label className="block">Username:</label>
          <input
            type="username"
            className="w-2/6"
            {...register('username', {
              required: 'Username is required',
              minLength: { value: 6, message: 'Minimum 6 characters' },
            })}
          />
          {errors.username && (
            <span id="errors">{errors.username.message}</span>
          )}
        </div>

        <div className="w-full">
          <label className="block">Contact Number: </label>
          <input
            className="w-2/6"
            type="number"
            {...register('contactNumber', {
              required: 'Contact Number is required',
            })}
          />
          {errors.contactNumber && (
            <span id="errors">{errors.contactNumber.message}</span>
          )}
        </div>

        <div className="w-full flex justify-start">
          <button className="block bg-green-800" type="submit">
            Create User
          </button>
        </div>
      </form>
    </div>
  );
}
