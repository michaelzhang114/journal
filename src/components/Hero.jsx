import React from "react";

const Hero = () => {
	return (
		<section>
			<div className="hero min-h-screen bg-base-200">
				<div
					className="hero-content text-center "
					data-aos="zoom-y-out"
				>
					<div className="max-w-md" data-aos="zoom-y-out">
						<h1 className="text-5xl font-bold">Hello there</h1>
						<p className="py-6">
							Provident cupiditate voluptatem et in. Quaerat
							fugiat ut assumenda excepturi exercitationem quasi.
							In deleniti eaque aut repudiandae et a id nisi.
						</p>
						<button className="btn btn-primary">Get Started</button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Hero;
