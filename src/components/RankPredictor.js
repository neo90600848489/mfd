import React, { useState } from 'react';

const rankData = [
  { min_marks: 591, max_marks: 1000, rank_low: 1, rank_high: 10 },
  { min_marks: 571, max_marks: 590, rank_low: 11, rank_high: 20 },
  { min_marks: 521, max_marks: 570, rank_low: 21, rank_high: 45 },
  { min_marks: 501, max_marks: 520, rank_low: 46, rank_high: 75 },
  { min_marks: 491, max_marks: 500, rank_low: 76, rank_high: 100 },
  { min_marks: 481, max_marks: 490, rank_low: 101, rank_high: 120 },
  { min_marks: 471, max_marks: 480, rank_low: 121, rank_high: 150 },
  { min_marks: 461, max_marks: 470, rank_low: 151, rank_high: 180 },
  { min_marks: 451, max_marks: 460, rank_low: 181, rank_high: 210 },
  { min_marks: 441, max_marks: 450, rank_low: 211, rank_high: 250 },
  { min_marks: 431, max_marks: 440, rank_low: 251, rank_high: 285 },
  { min_marks: 421, max_marks: 430, rank_low: 286, rank_high: 325 },
  { min_marks: 411, max_marks: 420, rank_low: 326, rank_high: 365 },
  { min_marks: 401, max_marks: 410, rank_low: 366, rank_high: 410 },
  { min_marks: 391, max_marks: 400, rank_low: 411, rank_high: 450 },
  { min_marks: 381, max_marks: 390, rank_low: 451, rank_high: 480 },
  { min_marks: 0, max_marks: 380, rank_low: null, rank_high: null }
];

const RankPredictor = () => {
  const [input, setInput] = useState('');
  const [rank, setRank] = useState(null);

  const handlePredict = () => {
    const marks = parseInt(input, 10);
    if (isNaN(marks)) {
      setRank('Please enter a valid number');
      return;
    }
    const found = rankData.find(
      r => marks >= r.min_marks && marks <= r.max_marks
    );
    if (found && found.rank_low !== null && found.rank_high !== null) {
      setRank(`Your predicted rank is between ${found.rank_low} and ${found.rank_high}`);
    } else {
      setRank('Rank not available for the entered marks');
    }
  };

  return (
    <div>
      <h2>Rank Predictor</h2>
      <input
        type="text"
        placeholder="Enter your marks"
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <button onClick={handlePredict}>Predict Rank</button>
      {rank && (
        <div>
          <p>{rank}</p>
        </div>
      )}
    </div>
  );
};

export default RankPredictor;
