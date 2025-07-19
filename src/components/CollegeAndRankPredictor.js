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

const collegeData = {
  "General": [
    { "college": "NIT Trichy", "low": 1, "high": 50 },
    { "college": "MNNIT Allahabad", "low": 51, "high": 150 },
    { "college": "NIT Warangal", "low": 151, "high": 200 },
    { "college": "NIT Kurukshetra", "low": 201, "high": 280 },
    { "college": "NIT Delhi", "low": 281, "high": 300 },
    { "college": "NIT Bhopal", "low": 301, "high": 390 },
    { "college": "NIT Jamshedpur", "low": 391, "high": 450 },
    { "college": "NIT Patna", "low": 451, "high": 550 },
    { "college": "NIT Raipur", "low": 551, "high": 650 },
    { "college": "NIT Agartala", "low": 651, "high": 720 },
    { "college": "NIT Meghalaya", "low": 721, "high": 800 },
    { "college": "IIIT Bhopal", "low": 801, "high": 900 },
    { "college": "IIIT Vadodara", "low": 901, "high": 980 },
    { "college": "HCU", "low": 981, "high": 1050 },
    { "college": "HBTU", "low": 1051, "high": 1200 },
    { "college": "IPU", "low": 1201, "high": 1800 }
  ],
  "EWS": [
    { "college": "NIT Trichy", "low": 1, "high": 110 },
    { "college": "MNNIT Allahabad", "low": 111, "high": 200 },
    { "college": "NIT Warangal", "low": 201, "high": 260 },
    { "college": "NIT Kurukshetra", "low": 261, "high": 320 },
    { "college": "NIT Delhi", "low": 321, "high": 350 },
    { "college": "NIT Bhopal", "low": 351, "high": 410 },
    { "college": "NIT Jamshedpur", "low": 411, "high": 480 },
    { "college": "NIT Patna", "low": 481, "high": 580 },
    { "college": "NIT Raipur", "low": 581, "high": 690 },
    { "college": "NIT Agartala", "low": 691, "high": 780 },
    { "college": "NIT Meghalaya", "low": 780, "high": 900 },
    { "college": "IIIT Bhopal", "low": 901, "high": 1020 },
    { "college": "IIIT Vadodara", "low": 1021, "high": 1150 },
    { "college": "HCU", "low": 1151, "high": 1300 },
    { "college": "HBTU", "low": 1301, "high": 1450 },
    { "college": "IPU", "low": 1450, "high": 2000 }
  ],
  "OBC": [
    { "college": "NIT Trichy", "low": 1, "high": 120 },
    { "college": "MNNIT Allahabad", "low": 121, "high": 220 },
    { "college": "NIT Warangal", "low": 221, "high": 270 },
    { "college": "NIT Kurukshetra", "low": 271, "high": 330 },
    { "college": "NIT Delhi", "low": 331, "high": 350 },
    { "college": "NIT Bhopal", "low": 351, "high": 410 },
    { "college": "NIT Jamshedpur", "low": 411, "high": 480 },
    { "college": "NIT Patna", "low": 481, "high": 580 },
    { "college": "NIT Raipur", "low": 581, "high": 690 },
    { "college": "NIT Agartala", "low": 691, "high": 780 },
    { "college": "NIT Meghalaya", "low": 780, "high": 900 },
    { "college": "IIIT Bhopal", "low": 901, "high": 1020 },
    { "college": "IIIT Vadodara", "low": 1021, "high": 1150 },
    { "college": "HCU", "low": 1151, "high": 1300 },
    { "college": "HBTU", "low": 1301, "high": 1450 },
    { "college": "IPU", "low": 1450, "high": 2000 }
  ],
  "SC": [
    { "college": "NIT Trichy", "low": 1, "high": 300 },
    { "college": "MNNIT Allahabad", "low": 301, "high": 500 },
    { "college": "NIT Warangal", "low": 501, "high": 800 },
    { "college": "NIT Kurukshetra", "low": 801, "high": 1200 },
    { "college": "NIT Delhi", "low": 1201, "high": 1300 },
    { "college": "NIT Bhopal", "low": 1301, "high": 1450 },
    { "college": "NIT Jamshedpur", "low": 1451, "high": 1600 },
    { "college": "NIT Patna", "low": 1601, "high": 1800 },
    { "college": "NIT Raipur", "low": 1801, "high": 2000 },
    { "college": "NIT Agartala", "low": 2001, "high": 2200 },
    { "college": "NIT Meghalaya", "low": 2201, "high": 2500 },
    { "college": "IIIT Bhopal", "low": 2501, "high": 3000 },
    { "college": "IIIT Vadodara", "low": 3001, "high": 4000 },
    { "college": "HCU", "low": 4001, "high": 5000 },
    { "college": "HBTU", "low": 5001, "high": 6000 },
    { "college": "IPU", "low": 6001, "high": 8000 }
  ],
  "ST": [
    { "college": "NIT Trichy", "low": 1, "high": 500 },
    { "college": "MNNIT Allahabad", "low": 501, "high": 800 },
    { "college": "NIT Warangal", "low": 801, "high": 1000 },
    { "college": "NIT Kurukshetra", "low": 1001, "high": 1500 },
    { "college": "NIT Delhi", "low": 1501, "high": 1700 },
    { "college": "NIT Bhopal", "low": 1701, "high": 1900 },
    { "college": "NIT Jamshedpur", "low": 1901, "high": 2100 },
    { "college": "NIT Patna", "low": 2101, "high": 2300 },
    { "college": "NIT Raipur", "low": 2301, "high": 2500 },
    { "college": "NIT Agartala", "low": 2501, "high": 2800 },
    { "college": "NIT Meghalaya", "low": 2801, "high": 3500 },
    { "college": "IIIT Bhopal", "low": 3501, "high": 4000 },
    { "college": "IIIT Vadodara", "low": 4001, "high": 5000 },
    { "college": "HCU", "low": 5001, "high": 6000 },
    { "college": "HBTU", "low": 6001, "high": 6500 },
    { "college": "IPU", "low": 6501, "high": 8500 }
  ],
  "PWD": [
    { "college": "NIT Trichy", "low": 1, "high": 600 },
    { "college": "MNNIT Allahabad", "low": 601, "high": 850 },
    { "college": "NIT Warangal", "low": 851, "high": 1000 },
    { "college": "NIT Kurukshetra", "low": 1001, "high": 1500 },
    { "college": "NIT Delhi", "low": 1501, "high": 1700 },
    { "college": "NIT Bhopal", "low": 1701, "high": 1900 },
    { "college": "NIT Jamshedpur", "low": 1901, "high": 2100 },
    { "college": "NIT Patna", "low": 2101, "high": 2300 },
    { "college": "NIT Raipur", "low": 2301, "high": 2500 },
    { "college": "NIT Agartala", "low": 2501, "high": 2800 },
    { "college": "NIT Meghalaya", "low": 2801, "high": 3500 },
    { "college": "IIIT Bhopal", "low": 3501, "high": 4000 },
    { "college": "IIIT Vadodara", "low": 4001, "high": 5000 },
    { "college": "HCU", "low": 5001, "high": 6000 },
    { "college": "HBTU", "low": 6001, "high": 6500 },
    { "college": "IPU", "low": 6501, "high": 9000 }
  ]
};

const categories = Object.keys(collegeData);

function getPredictedRank(marks) {
  const found = rankData.find(
    r => marks >= r.min_marks && marks <= r.max_marks
  );
  if (found && found.rank_low !== null && found.rank_high !== null) {
    return { low: found.rank_low, high: found.rank_high };
  }
  return null;
}

function getEligibleColleges(category, rank) {
  if (!category || !rank) return [];
  return (collegeData[category] || []).filter(
    c => rank >= c.low && rank <= c.high
  );
}

const CollegeAndRankPredictor = () => {
  const [choice, setChoice] = useState('rank');
  const [marks, setMarks] = useState('');
  const [rankResult, setRankResult] = useState('');
  const [collegeResult, setCollegeResult] = useState([]);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    category: categories[0],
    marks: ''
  });
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [sendingOtp, setSendingOtp] = useState(false);

  const handleRankPredict = () => {
    const marksNum = parseInt(marks, 10);
    if (isNaN(marksNum)) {
      setRankResult('Please enter a valid number');
      return;
    }
    const rank = getPredictedRank(marksNum);
    if (rank) {
      setRankResult(`Your predicted rank is between ${rank.low} and ${rank.high}`);
    } else {
      setRankResult('Rank not available for the entered marks');
    }
  };

  const handleCollegePredict = async () => {
    if (
      !form.name ||
      !form.phone ||
      !form.email ||
      !form.category ||
      isNaN(parseInt(form.marks, 10))
    ) {
      setCollegeResult(['Please fill all fields with valid data']);
      return;
    }
    setSendingOtp(true);
    setOtpSent(false);
    setOtp('');
    setOtpError('');
    setCollegeResult([]);
    try {
      // Call backend API to send OTP using Twilio
      const response = await fetch('/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: form.phone })
      });
      const data = await response.json();
      if (data.success) {
        setOtpSent(true);
      } else {
        setOtpError('Failed to send OTP. Please check the phone number.');
      }
    } catch (err) {
      setOtpError('Failed to send OTP. Please check the phone number.');
    }
    setSendingOtp(false);
  };

  const handleOtpVerify = async () => {
    try {
      // Call backend API to verify OTP and store user data
      const response = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: form.phone,
          otp,
          name: form.name
        })
      });
      const data = await response.json();
      if (data.success) {
        const marksNum = parseInt(form.marks, 10);
        const rank = getPredictedRank(marksNum);
        if (!rank) {
          setCollegeResult(['Rank not available for the entered marks']);
          return;
        }
        const eligible = getEligibleColleges(form.category, rank.low);
        if (eligible.length > 0) {
          setCollegeResult(eligible.map(c => c.college));
        } else {
          setCollegeResult(['No eligible colleges found for your rank and category']);
        }
        setOtpError('');
      } else {
        setCollegeResult([]);
        setOtpError('Invalid OTP. Please try again.');
      }
    } catch (err) {
      setCollegeResult([]);
      setOtpError('Invalid OTP. Please try again.');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '0 auto', padding: 20, border: '1px solid #ccc' }}>
      <div style={{ marginBottom: 20 }}>
        <button onClick={() => setChoice('rank')}>Rank Predictor</button>
        <button onClick={() => setChoice('college')}>College Predictor</button>
      </div>
      {choice === 'rank' && (
        <div>
          <h3>Rank Predictor</h3>
          <input
            type="text"
            placeholder="Enter your marks"
            value={marks}
            onChange={e => setMarks(e.target.value)}
          />
          <button onClick={handleRankPredict}>Predict Rank</button>
          {rankResult && <div style={{ marginTop: 10 }}>{rankResult}</div>}
        </div>
      )}
      {choice === 'college' && (
        <div>
          <h3>College Predictor</h3>
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            style={{ display: 'block', marginBottom: 8, width: '100%' }}
          />
          <input
            type="text"
            placeholder="Phone"
            value={form.phone}
            onChange={e => setForm({ ...form, phone: e.target.value })}
            style={{ display: 'block', marginBottom: 8, width: '100%' }}
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            style={{ display: 'block', marginBottom: 8, width: '100%' }}
          />
          <select
            value={form.category}
            onChange={e => setForm({ ...form, category: e.target.value })}
            style={{ display: 'block', marginBottom: 8, width: '100%' }}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Marks"
            value={form.marks}
            onChange={e => setForm({ ...form, marks: e.target.value })}
            style={{ display: 'block', marginBottom: 8, width: '100%' }}
          />
          {!otpSent && (
            <button onClick={handleCollegePredict} disabled={sendingOtp}>
              {sendingOtp ? 'Sending OTP...' : 'Predict College'}
            </button>
          )}
          {otpSent && (
            <div style={{ marginTop: 10 }}>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={e => setOtp(e.target.value)}
                style={{ marginRight: 8, width: '60%' }}
              />
              <button onClick={handleOtpVerify}>Verify OTP</button>
              {otpError && <div style={{ color: 'red', marginTop: 5 }}>{otpError}</div>}
            </div>
          )}
          {collegeResult.length > 0 && (
            <div style={{ marginTop: 10 }}>
              <b>Eligible Colleges:</b>
              <ul>
                {collegeResult.map((c, idx) => (
                  <li key={idx}>{c}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};




export default CollegeAndRankPredictor;
