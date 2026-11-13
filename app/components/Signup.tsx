"use client";

import { FormEvent, useState } from "react";
import { authClient } from "../lib/auth-client";

export default function Signup() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setError("");

		if (password !== confirmPassword) {
			setError("Passwords do not match.");
			return;
		}

		setIsLoading(true);
		try {
			const { error: signUpError } = await authClient.signUp.email({
				name,
				email,
				password,
			});

			if (signUpError) setError(signUpError.message ?? "Unable to create your account.");
		} catch {
			setError("Something went wrong. Please try again.");
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<form onSubmit={handleSubmit} className="mx-auto w-full max-w-md space-y-5">
			<div>
				<h1 className="text-2xl font-semibold">Create an account</h1>
				<p className="mt-1 text-sm text-gray-600">Sign up to get started.</p>
			</div>

			<label className="block space-y-1">
				<span className="text-sm font-medium">Name</span>
				<input
					autoComplete="name"
					required
					value={name}
					onChange={(event) => setName(event.target.value)}
					className="w-full rounded-md border px-3 py-2"
					placeholder="Your name"
				/>
			</label>

			<label className="block space-y-1">
				<span className="text-sm font-medium">Email</span>
				<input
					type="email"
					autoComplete="email"
					required
					value={email}
					onChange={(event) => setEmail(event.target.value)}
					className="w-full rounded-md border px-3 py-2"
					placeholder="you@example.com"
				/>
			</label>

			<label className="block space-y-1">
				<span className="text-sm font-medium">Password</span>
				<input
					type="password"
					autoComplete="new-password"
					required
					minLength={8}
					value={password}
					onChange={(event) => setPassword(event.target.value)}
					className="w-full rounded-md border px-3 py-2"
					placeholder="At least 8 characters"
				/>
			</label>

			<label className="block space-y-1">
				<span className="text-sm font-medium">Confirm password</span>
				<input
					type="password"
					autoComplete="new-password"
					required
					minLength={8}
					value={confirmPassword}
					onChange={(event) => setConfirmPassword(event.target.value)}
					className="w-full rounded-md border px-3 py-2"
					placeholder="Re-enter your password"
				/>
			</label>

			{error && (
				<p role="alert" className="text-sm text-red-600">
					{error}
				</p>
			)}

			<button
				type="submit"
				disabled={isLoading}
				className="w-full rounded-md bg-black px-4 py-2 font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
			>
				{isLoading ? "Creating account…" : "Sign up"}
			</button>
		</form>
	);
}
