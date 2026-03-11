'use client';

import { useState, type FormEvent } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useMatchas, useCreateMatcha } from '@/lib/hooks/use-matchas';
import { usePlaces } from '@/lib/hooks/use-places';
import type { MilkType, TasteRating } from '@/lib/types';

function AuthSection() {
  const { user, loading, signIn, signUp, signOut } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');

  if (loading) return <p className="text-gray-500">Loading auth...</p>;

  if (user) {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950">
        <h3 className="font-semibold text-green-800 dark:text-green-200">Signed In</h3>
        <p className="mt-1 text-sm text-green-700 dark:text-green-300">{user.email}</p>
        <p className="mt-1 text-xs text-green-600 dark:text-green-400">ID: {user.id}</p>
        <button
          onClick={() => signOut()}
          className="mt-3 rounded bg-red-500 px-3 py-1.5 text-sm text-white hover:bg-red-600"
        >
          Sign Out
        </button>
      </div>
    );
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (isSignUp) {
        await signUp(email, password);
      } else {
        await signIn(email, password);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Auth failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded border px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800"
          required
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded border px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800"
          required
        />
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
      <div className="flex gap-2">
        <button
          type="submit"
          className="rounded bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700"
        >
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </button>
        <button
          type="button"
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-sm text-green-600 underline hover:text-green-700"
        >
          {isSignUp ? 'Have an account? Sign in' : 'Need an account? Sign up'}
        </button>
      </div>
    </form>
  );
}

function MatchasList() {
  const { data, isLoading, error } = useMatchas({ limit: 5 });

  if (isLoading) return <p className="text-gray-500">Loading matchas...</p>;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;
  if (!data?.data.length) return <p className="text-gray-500">No matchas found.</p>;

  return (
    <ul className="space-y-2">
      {data.data.map((m) => (
        <li
          key={m.id}
          className="rounded border p-3 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <span className="font-medium">{m.cafe_name}</span>
            <span className="text-sm text-yellow-600">{'★'.repeat(m.taste_rating)}</span>
          </div>
          <div className="mt-1 text-xs text-gray-500">
            {m.milk_type} milk &middot; ${m.price} &middot; by {m.user.username}
          </div>
        </li>
      ))}
      <p className="text-xs text-gray-400">
        Showing {data.data.length} of {data.count} total
      </p>
    </ul>
  );
}

function PlacesList() {
  const { data, isLoading, error } = usePlaces({ limit: 5 });

  if (isLoading) return <p className="text-gray-500">Loading places...</p>;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;
  if (!data?.data.length) return <p className="text-gray-500">No places found.</p>;

  return (
    <ul className="space-y-2">
      {data.data.map((p) => (
        <li
          key={p.id}
          className="rounded border p-3 dark:border-gray-700"
        >
          <div className="font-medium">{p.name}</div>
          <div className="mt-1 text-xs text-gray-500">
            {p.address}
            {p.rating != null && <> &middot; {p.rating} ★</>}
            {' '}&middot; {p.matcha_count} matchas
          </div>
        </li>
      ))}
      <p className="text-xs text-gray-400">
        Showing {data.data.length} of {data.count} total
      </p>
    </ul>
  );
}

function CreateMatchaForm() {
  const { user } = useAuth();
  const createMatcha = useCreateMatcha();
  const [cafeName, setCafeName] = useState('');
  const [milkType, setMilkType] = useState<MilkType>('oat');
  const [price, setPrice] = useState('');
  const [rating, setRating] = useState<TasteRating>('5');

  if (!user) {
    return <p className="text-sm text-gray-500">Sign in to create a matcha.</p>;
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    createMatcha.mutate({
      cafe_name: cafeName,
      milk_type: milkType,
      price: parseFloat(price),
      taste_rating: rating,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        placeholder="Cafe name"
        value={cafeName}
        onChange={(e) => setCafeName(e.target.value)}
        className="w-full rounded border px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800"
        required
      />
      <div className="flex gap-2">
        <select
          value={milkType}
          onChange={(e) => setMilkType(e.target.value as MilkType)}
          className="rounded border px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800"
        >
          {['oat', 'almond', 'coconut', 'whole', 'skim', 'soy', 'none'].map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
        <input
          type="number"
          step="0.01"
          min="0"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-24 rounded border px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800"
          required
        />
        <select
          value={rating}
          onChange={(e) => setRating(e.target.value as TasteRating)}
          className="rounded border px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800"
        >
          {['1', '2', '3', '4', '5'].map((r) => (
            <option key={r} value={r}>{r} ★</option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        disabled={createMatcha.isPending}
        className="rounded bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700 disabled:opacity-50"
      >
        {createMatcha.isPending ? 'Creating...' : 'Create Matcha'}
      </button>
      {createMatcha.isSuccess && (
        <p className="text-sm text-green-600">Matcha created!</p>
      )}
      {createMatcha.isError && (
        <p className="text-sm text-red-500">Error: {createMatcha.error.message}</p>
      )}
    </form>
  );
}

export default function DemoPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold">API Integration Demo</h1>

      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold">Auth</h2>
        <AuthSection />
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold">Matchas</h2>
        <MatchasList />
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold">Places</h2>
        <PlacesList />
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold">Create Matcha</h2>
        <CreateMatchaForm />
      </section>
    </div>
  );
}
