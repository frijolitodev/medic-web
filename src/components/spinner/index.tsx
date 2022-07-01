import { FC } from 'react';

const Spinner: FC = () => (
    <div className="fixed z-50 w-screen h-screen bg-black bg-opacity-40 centered-xy">
        <div className="w-10 h-10 bg-accent rounded-full animate-pulse" role="status">
            <span className="hidden">Loading...</span>
        </div>
    </div>
);

export default Spinner;
