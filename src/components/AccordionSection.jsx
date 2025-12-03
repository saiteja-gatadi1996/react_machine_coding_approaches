import { useRef, useEffect, useState } from 'react';
import './AccordionSection.css';

function AccordionSection({ title, code, isOpen, onToggle }) {
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [code]);

  const renderCode = (codeString) => {
    const lines = codeString.split('\n');
    let insideMultiLineComment = false;

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
            const trimmed = line.trim();

            // Check if this line starts a multi-line comment
            if (trimmed.includes('/*') && !insideMultiLineComment) {
              insideMultiLineComment = true;
            }

            // Determine if current line is a comment
            const isComment =
              trimmed.startsWith('//') || insideMultiLineComment;

            // Check if this line ends a multi-line comment
            if (trimmed.includes('*/') && insideMultiLineComment) {
              insideMultiLineComment = false;
            }

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
        onClick={onToggle}
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
