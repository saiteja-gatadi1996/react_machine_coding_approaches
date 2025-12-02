import { useState } from 'react';
import AccordionSection from './AccordionSection';
import { codingApproaches } from '../data/codingApproaches';
import './CodeReader.css';

export default function CodeReader() {
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className={theme}>
      <div className="header">
        <h1>📖 Code Reader</h1>
        <button className="theme-toggle" onClick={toggleTheme}>
          <span>{theme === 'dark' ? '☀️' : '🌙'}</span> Toggle Theme
        </button>
      </div>

      <div className="container">
        {codingApproaches.map((approach, index) => (
          <AccordionSection
            key={index}
            title={approach.title}
            code={approach.code}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
