'use client';

import { FormEvent, useState } from 'react';
import { authClient } from '../../lib/auth-client';
import Link from 'next/link';

export default function LoginPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setError('');
		setIsLoading(true);

		try {
			const { error: signInError } = await authClient.signIn.email({
				email,
				password,
				callbackURL: '/',
			});

			if (signInError) {
				setError(signInError.message || 'Unable to sign in. Please try again.');
			}
		} catch {
			setError('Unable to sign in. Please try again.');
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
			<section className="w-full max-w-md  border border-slate-200 bg-white p-8 shadow-sm">
				<div className="mb-8 text-center">
					<h1 className="text-3xl font-semibold tracking-tight text-slate-900">Welcome back</h1>
					<p className="mt-2 text-sm text-slate-600">Sign in to your account to continue.</p>
					
				</div>

				<form onSubmit={handleSubmit} className="space-y-5">
					<div>
						<label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700">
							Email address
						</label>
						<input
							id="email"
							name="email"
							type="email"
							autoComplete="email"
							required
							value={email}
							onChange={(event) => setEmail(event.target.value)}
							className="w-full  border border-slate-300 px-3 py-2.5 text-slate-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
							placeholder="you@example.com"
						/>
					</div>

					<div>
						<label htmlFor="password" className="mb-1.5 block text-sm font-medium text-slate-700">
							Password
						</label>
						<input
							id="password"
							name="password"
							type="password"
							autoComplete="current-password"
							required
							value={password}
							onChange={(event) => setPassword(event.target.value)}
							className="w-full  border border-slate-300 px-3 py-2.5 text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-blue-100"
							placeholder="Enter your password"
						/>
					</div>

					{error && (
						<p role="alert" className=" bg-red-50 px-3 py-2 text-sm text-red-700">
							{error}
						</p>
					)}

					<button
						type="submit"
						disabled={isLoading}
						className="w-full bg-orange-300 px-4 py-2.5 font-medium text-white transition hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
					>
						{isLoading ? 'Signing in…' : 'Sign in'}
					</button>
				</form>
				<p className='mt-2 text-gray-400'>Or, Don't have an account? <Link href="/signup" className='text-orange-300 hover:text-orange-400 transition'>Signup</Link></p>
			</section>
		</main>
	);
}