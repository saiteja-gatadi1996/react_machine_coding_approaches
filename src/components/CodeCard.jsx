import './CodeCard.css';

function CodeCard({ title, onClick }) {
  return (
    <div className='code-card' onClick={onClick}>
      <span className='card-title'>{title}</span>
      <span className='card-icon'>→</span>
    </div>
  );
}

export default CodeCard;
