import { useEffect, useRef, useState } from 'react';
import './CodeModal.css';

function CodeModal({ isOpen, onClose, title, code, theme }) {
  const modalRef = useRef(null);
  const codeWrapperRef = useRef(null);
  const [isMaximized, setIsMaximized] = useState(false);

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Reset maximized state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setIsMaximized(false);
    }
  }, [isOpen]);

  // Close modal when clicking outside
  const handleBackdropClick = (e) => {
    if (modalRef.current === e.target) {
      onClose();
    }
  };

  // Toggle maximize state
  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  // Reset scroll position when modal opens
  useEffect(() => {
    if (isOpen && codeWrapperRef.current) {
      codeWrapperRef.current.scrollTop = 0;
      codeWrapperRef.current.scrollLeft = 0;
    }
  }, [isOpen]);

  const renderCode = (codeString) => {
    const lines = codeString.split('\n');
    let insideMultiLineComment = false;

    return (
      <div className='modal-code-wrapper' ref={codeWrapperRef}>
        <div className='modal-line-numbers'>
          {lines.map((_, idx) => (
            <span key={idx} className='modal-line-number'>
              {idx + 1}
            </span>
          ))}
        </div>
        <div className='modal-code-content'>
          {lines.map((line, idx) => {
            const trimmed = line.trim();

            if (trimmed.includes('/*') && !insideMultiLineComment) {
              insideMultiLineComment = true;
            }

            const isComment =
              trimmed.startsWith('//') || insideMultiLineComment;

            if (trimmed.includes('*/') && insideMultiLineComment) {
              insideMultiLineComment = false;
            }

            return (
              <div
                key={idx}
                className={`modal-code-line ${isComment ? 'comment' : ''}`}
              >
                {line}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      className={`modal-backdrop ${theme} ${isMaximized ? 'maximized' : ''}`}
      onClick={handleBackdropClick}
    >
      <div className={`modal-container ${isMaximized ? 'maximized' : ''}`}>
        <div className='modal-header'>
          <h2 className='modal-title'>{title}</h2>
          <div className='modal-controls'>
            <button
              className='modal-maximize'
              onClick={toggleMaximize}
              title={isMaximized ? 'Restore' : 'Maximize'}
            >
              {isMaximized ? '⊡' : '□'}
            </button>
            <button className='modal-close' onClick={onClose} title='Close'>
              ✕
            </button>
          </div>
        </div>
        <div className='modal-body'>{renderCode(code)}</div>
      </div>
    </div>
  );
}

export default CodeModal;
