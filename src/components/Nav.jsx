"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
	// sort out auth
	const { data: session } = useSession();
	const [providers, setProviders] = useState(null);
	useEffect(() => {
		const setUpProviders = async () => {
			const response = await getProviders();
			setProviders(response);
		};
		setUpProviders();
	}, []);

	return (
		<section>
			<div className="">
				<div className="navbar bg-neutral">
					<div className="container mx-auto">
						<div className="dropdown">
							<div
								tabIndex={0}
								role="button"
								className="btn btn-ghost lg:hidden"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M4 6h16M4 12h8m-8 6h16"
									/>
								</svg>
							</div>
							<ul
								tabIndex={0}
								className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52"
								onClick={() => {
									if (
										document.activeElement instanceof
										HTMLElement
									) {
										document.activeElement.blur();
									}
								}}
							>
								<li>
									<Link href="#">Text</Link>{" "}
								</li>
							</ul>
						</div>
						<div className="flex-1">
							<Link className="btn btn-ghost text-xl" href="/">
								DaisyUI
							</Link>
						</div>
						<div className="navbar-center hidden lg:flex">
							<ul className="menu menu-horizontal px-1">
								<li>
									<Link href="#" className="btn btn-accent">
										Text
									</Link>{" "}
								</li>
								{/* <li>
								<details>
									<summary>Parent</summary>
									<ul className="p-2">
										<li>
											<a>Submenu 1</a>
										</li>
										<li>
											<a>Submenu 2</a>
										</li>
									</ul>
								</details>
							</li> */}
							</ul>
						</div>
						<div className="flex-none">
							<div className="dropdown dropdown-end z-50">
								{session?.user ? (
									<>
										<div
											tabIndex={0}
											role="button"
											className="btn btn-ghost btn-circle avatar"
										>
											<div className="w-10 rounded-full">
												<Image
													alt="Tailwind CSS Navbar component"
													src={session?.user.image}
													width={60}
													height={60}
												/>
											</div>
										</div>
										<ul
											tabIndex={0}
											className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52"
											onClick={() => {
												if (
													document.activeElement instanceof
													HTMLElement
												) {
													document.activeElement.blur();
												}
											}}
										>
											<li>
												<Link href="/profile">
													Profile
												</Link>
											</li>
											<li>
												<Link
													onClick={() => {
														signOut({
															callbackUrl: "/",
														});
													}}
													href="/"
												>
													Logout
												</Link>
											</li>
										</ul>
									</>
								) : (
									<>
										{providers &&
											Object.values(providers).map(
												(provider) => (
													<button
														className="btn btn-ghost"
														key={provider.name}
														onClick={() =>
															signIn(provider.id)
														}
													>
														Sign In
													</button>
												)
											)}
									</>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Nav;
