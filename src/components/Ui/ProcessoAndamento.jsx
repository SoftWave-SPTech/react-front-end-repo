import React from 'react';

const andamento = [
  { data: '09-04-2025', status: 'Ver análise' },
  { data: '02-04-2025', status: 'Ver análise' },
  { data: '01-04-2025', status: 'Ver análise' },
  { data: '10-03-2025', status: 'Ver análise' }
];

const ProcessoAndamento = () => {
  return (
    <div className="timeline-horizontal-container">
      <ul className="timeline-horizontal">
        {andamento.map((item, idx) => (
          <li key={idx} className="timeline-horizontal-item">
            <div className="timeline-horizontal-date">{item.data}</div>
            <div className="timeline-horizontal-icon">
              <span
                style={{
                  display: 'inline-block',
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  background: 'white',
                  boxSizing: 'border-box'
                }}
              />
            </div>
            <div className="timeline-horizontal-status">
              <button className="timeline-horizontal-btn">{item.status}</button>
            </div>
            {idx < andamento.length - 1 && (
              <div className="timeline-horizontal-line" />
            )}
          </li>
        ))}
      </ul>
      <style>{`
        .timeline-horizontal-container {
          overflow-x: auto;
          padding: 24px 0;
        }
        .timeline-horizontal {
          display: flex;
          align-items: center;
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .timeline-horizontal-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: 120px;
          position: relative;
        }
        .timeline-horizontal-date {
          font-size: 0.95rem;
          margin-bottom: 8px;
          color: white;
        }
        .timeline-horizontal-icon {
          margin-bottom: 8px;
        }
        .timeline-horizontal-status {
          margin-top: 8px;
        }
        .timeline-horizontal-btn {
          background: #0f1b3e;
          color: white;
          border: none;
          border-radius: 4px;
          padding: 4px 12px;
          cursor: pointer;
          font-size: 0.9rem;
          transition: background 0.2s;
        }
        .timeline-horizontal-btn:hover {
          background: white;
        }
        .timeline-horizontal-line {
          position: absolute;
          top: 50%;
          right: -60px;
          width: 120px;
          height: 4px;
          background: white;
          z-index: 0;
        }
      `}</style>
    </div>
  );
};

export default ProcessoAndamento;