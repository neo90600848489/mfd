import { useParams } from 'react-router-dom';
import mutualFunds from '../mutualfundData/mutualfund.json';

const AMCDetailsPage = () => {
  const { amcName } = useParams();
  const decodedAmc = decodeURIComponent(amcName);

  const filteredFunds = mutualFunds.filter(fund => fund.AMC === decodedAmc);

  return (
    <div>
      <h2>{decodedAmc} - Mutual Funds</h2>
      <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th>Scheme Name</th>
            <th>Scheme Type</th>
            <th>Scheme Category</th>
            <th>Scheme NAV Name</th>
            <th>Scheme Minimum Amount</th>
            <th>Launch Date</th>
            <th>Closure Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredFunds.map((fund, index) => (
            <tr key={index}>
              <td>{fund["Scheme Name"]}</td>
              <td>{fund["Scheme Type"]}</td>
              <td>{fund["Scheme Category"]}</td>
              <td>{fund["Scheme NAV Name"]}</td>
              <td>{fund["Scheme Minimum Amount"]}</td>
              <td>{fund["Launch Date"]}</td>
              <td>{fund[" Closure Date"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AMCDetailsPage;
