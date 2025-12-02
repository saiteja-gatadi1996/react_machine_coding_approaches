import { useState } from 'react';
import './AccordionSection.css';

export default function AccordionSection({ title, code, index }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const renderCode = (code) => {
    const lines = code.split('\n');
    
    return (
      <div className="code-wrapper">
        <div className="line-numbers">
          {lines.map((_, i) => (
            <span key={i} className="line-number">
              {i + 1}
            </span>
          ))}
        </div>
        <div className="code-content">
          {lines.map((line, i) => {
            const isComment = line.trim().startsWith('//');
            return (
              <div key={i} className="code-line">
                {isComment ? (
                  <span className="comment">{line}</span>
                ) : (
                  line
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="accordion-item">
      <div
        className={`accordion-header ${isOpen ? 'active' : ''}`}
        onClick={toggleAccordion}
      >
        <span>{title}</span>
        <span className="accordion-icon">▶</span>
      </div>
      <div className={`accordion-content ${isOpen ? 'open' : ''}`}>
        {renderCode(code)}
      </div>
    </div>
  );
}
