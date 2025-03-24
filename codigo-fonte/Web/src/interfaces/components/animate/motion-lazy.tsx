'use client';

import { LazyMotion, m } from 'framer-motion';
import dynamic from 'next/dynamic';

const loadFeatures = () => import('./features.js').then((res) => res.default);

type Props = {
	children: React.ReactNode;
};

function MotionLazy({ children }: Props) {
	return (
		<LazyMotion strict features={loadFeatures}>
			<m.div> {children} </m.div>
		</LazyMotion>
	);
}

export default dynamic(() => Promise.resolve(MotionLazy), { ssr: false });
