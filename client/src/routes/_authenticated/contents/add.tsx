import { api } from '@/lib/axios/config';
import type { IContent } from '@/types/content.interface';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export const Route = createFileRoute('/_authenticated/contents/add')({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IContent>();

  const onSubmit = async (data: IContent) => {
    const contentAdded = await api.post('/content/add', data);

    if (contentAdded.status === 201) {
      toast.success('Content added successfully');
      reset();
      navigate({ to: '/contents' });
    } else {
      toast.error('Content add failed successfully');
    }
  };

  return (
    <div id="content-add">
      <h3 className="mb-8 text-3xl font-light">Add Content</h3>
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
          <label className="block">Description:</label>
          <textarea
            className="w-1/2"
            rows={5}
            {...register('description', {
              required: 'Password is required',
              minLength: { value: 6, message: 'Minimum 6 characters' },
            })}
          />
          {errors.description && (
            <span id="errors">{errors.description.message}</span>
          )}
        </div>

        <div className="w-full">
          <label className="block">Metadata: </label>
          <input
            className="w-1/2"
            type="text"
            {...register('metadata', { required: 'Metadata is required' })}
          />
          {errors.metadata && (
            <span id="errors">{errors.metadata.message}</span>
          )}
        </div>

        <div className="w-full">
          <label className="block">Localisation: </label>
          <input
            className="w-1/2"
            type="text"
            {...register('localisation', {
              required: 'localisation is required',
            })}
          />
          {errors.localisation && (
            <span id="errors">{errors.localisation.message}</span>
          )}
        </div>

        <div className="w-full">
          <label className="block">Version: </label>
          <input
            className="w-1/5"
            type="text"
            {...register('version', { required: 'Version is required' })}
          />
          {errors.version && <span id="errors">{errors.version.message}</span>}
        </div>

        <div className="w-full flex gap-2 items-center">
          <input type="checkbox" {...register('isRegional')} />
          <label>Is Regional </label>
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
