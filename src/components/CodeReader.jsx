import { useState } from 'react';
import CodeCard from './CodeCard';
import CodeModal from './CodeModal';
import { codingApproaches } from '../data/codingApproaches';
import './CodeReader.css';

export default function CodeReader() {
  const [theme, setTheme] = useState('dark');
  const [selectedApproach, setSelectedApproach] = useState(null);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const openModal = (approach) => {
    setSelectedApproach(approach);
  };

  const closeModal = () => {
    setSelectedApproach(null);
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
          <CodeCard
            key={index}
            title={approach.title}
            onClick={() => openModal(approach)}
          />
        ))}
      </div>

      <CodeModal
        isOpen={!!selectedApproach}
        onClose={closeModal}
        title={selectedApproach?.title || ''}
        code={selectedApproach?.code || ''}
        theme={theme}
      />
    </div>
  );
}
