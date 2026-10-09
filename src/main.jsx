import { createRoot } from 'react-dom/client';
import App from './App.jsx';

import './styles/tokens.css';
import './styles/global.css';
import './styles/hero.css';
import './styles/navigation.css';
import './styles/responsive.css';
import './styles/sections.css';
import './styles/studio.css';
import './styles/closing.css';
import './styles/work.css';

// StrictMode is intentionally omitted: the entrance sequence is a timed,
// one-shot composition, and the double mount StrictMode performs in development
// would replay and visually stutter it.
createRoot(document.getElementById('root')).render(<App />);
