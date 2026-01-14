import { api } from '@/lib/axios/config';
import type { IPolicy } from '@/types/policy.interface';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export const Route = createFileRoute('/_authenticated/policy/add')({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IPolicy>();

  const onSubmit = async (data: IPolicy) => {
    const contentAdded = await api.post('/policy/add', data);

    if (contentAdded.status === 201) {
      toast.success('Policy added successfully');
      reset();
      navigate({ to: '/policy' });
    } else {
      toast.error('Policy add failed successfully');
    }
  };
  return (
    <div id="policy-add">
      <h3 className="mb-8 text-3xl font-light">Add Policy</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <div className="w-full">
          <label className="block">Title: </label>
          <input
            className="w-2/5"
            type="text"
            {...register('title', { required: 'Title is required' })}
          />
          {errors.title && <span id="errors">{errors.title.message}</span>}
        </div>

        <div className="w-full">
          <label className="block">Summary:</label>
          <textarea
            className="w-1/2"
            rows={5}
            {...register('summary', {
              required: 'Password is required',
              minLength: { value: 6, message: 'Minimum 6 characters' },
            })}
          />
          {errors.summary && <span id="errors">{errors.summary.message}</span>}
        </div>

        <div className="w-full flex justify-start">
          <button className="block bg-green-800" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
