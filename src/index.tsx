import { createRoot } from 'react-dom/client';
import { App } from 'app';

const rootDiv = document.getElementById('root');

if (!rootDiv) throw new Error('There is no root div');

const root = createRoot(rootDiv);

root.render(<App />);