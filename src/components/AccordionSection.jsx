import { useState, useRef, useEffect } from 'react';
import './AccordionSection.css';

function AccordionSection({ title, code, index }) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [code]);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const renderCode = (codeString) => {
    const lines = codeString.split('\n');
    return (
      <div className='code-wrapper'>
        <div className='line-numbers'>
          {lines.map((_, idx) => (
            <span key={idx} className='line-number'>
              {idx + 1}
            </span>
          ))}
        </div>
        <div className='code-content'>
          {lines.map((line, idx) => {
            const isComment = line.trim().startsWith('//');

            return (
              <div
                key={idx}
                className={`code-line ${isComment ? 'comment' : ''}`}
              >
                {line}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className='accordion-item'>
      <div
        className={`accordion-header ${isOpen ? 'active' : ''}`}
        onClick={toggleAccordion}
      >
        <span>{title}</span>
        <span className='accordion-icon'>▶</span>
      </div>
      <div
        ref={contentRef}
        className={`accordion-content ${isOpen ? 'open' : ''}`}
        style={{ maxHeight: isOpen ? `${height}px` : '0' }}
      >
        {renderCode(code)}
      </div>
    </div>
  );
}

export default AccordionSection;
