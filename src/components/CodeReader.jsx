import { useState } from 'react';
import AccordionSection from './AccordionSection';
import { codingApproaches } from '../data/codingApproaches';
import './CodeReader.css';

export default function CodeReader() {
  const [theme, setTheme] = useState('dark');
  const [openIndex, setOpenIndex] = useState(null); // Track which accordion is open

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleToggle = (index) => {
    // If clicking the same accordion, close it. Otherwise, open the new one.
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={theme}>
      <div className='header'>
        <h1>📖 React MC Challenges (Coding Approaches)</h1>
        <button className='theme-toggle' onClick={toggleTheme}>
          <span>{theme === 'dark' ? '☀️' : '🌙'}</span> Toggle Theme
        </button>
      </div>

      <div className='container'>
        {codingApproaches.map((approach, index) => (
          <AccordionSection
            key={index}
            title={approach.title}
            code={approach.code}
            index={index}
            isOpen={openIndex === index}
            onToggle={() => handleToggle(index)}
          />
        ))}
      </div>
    </div>
  );
}
