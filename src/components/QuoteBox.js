import { useState, useEffect } from "react";

import { motion, AnimatePresence } from "framer-motion";

export default function QuoteBox() {
	const [quotes, setQuotes] = useState({});
	const [loading, setLoading] = useState(true);

	const newQuote = () => {
		setLoading(true);
		return fetch("https://api.quotable.io/random")
			.then((response) => {
				if (!response.ok) {
					throw new Error(response.statusText);
				}
				return response.json();
			})
			.then((data) => {
				//console.log(data);
				setQuotes({ quote: data.content, author: data.author });
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		newQuote();
	}, []);

	// --- Animation ---

	const container = {
		hidden: { opacity: 1, scale: 0 },
		visible: {
			opacity: 1,
			scale: 1,
			transition: {
				duration: 0.35,
				delayChildren: 0.6,
				staggerChildren: 0.5
			}
		},
		out: {
			opacity: 1,
			scale: 0
		}
	};

	const item = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1
		},
		exit: {
			y: -20,
			opacity: 0
		}
	};

	return (
		<AnimatePresence exitBeforeEnter>
			{!loading && (
				<motion.div
					id="quote-box"
					style={{ margin: "auto" }}
					className="column is-half
      is-offset-one-quarter card has-background-primary-light "
					variants={container}
					initial="hidden"
					animate="visible"
					exit="out">
					<div className="card-content">
						<motion.p id="text" className="title" variants={item}>
							{quotes.quote}
						</motion.p>
						<motion.p id="author" className="subtitle" variants={item}>
							{quotes.author}
						</motion.p>
						<div className="card-footer">
							<div className="card-footer-item">
								<button id="new-quote" className="button" onClick={newQuote}>
									New quote
								</button>
							</div>
							<p className="card-footer-item">
								Share on&nbsp;
								<a href="twitter.com/intent/tweet" id="tweet-quote">
									twiter
								</a>
							</p>
						</div>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
