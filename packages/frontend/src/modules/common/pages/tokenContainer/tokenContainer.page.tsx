import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { fetchTokens } from './api';
import { Token } from '../../types';

export const TokenContainerPage: React.FC = () => {
  // Fetch tokens using React Query
  const { data: tokens, isLoading, isError } = useQuery<Token[], Error>('tokens', fetchTokens);

  useEffect(() => {
    // You can do any additional processing or side effects here, if needed
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: Failed to fetch tokens</div>;
  }

  return (
    <div>
      <h1>Token Container Page</h1>
      <div>
        {tokens && tokens.length > 0 ? (
          <ul>
            {tokens.map((token) => (
              <li key={token.id}>
                <strong>{token.name}</strong> ({token.symbol}) - Balance: {token.balance}
              </li>
            ))}
          </ul>
        ) : (
          <p>No tokens found.</p>
        )}
      </div>
    </div>
  );
};

export default TokenContainerPage;
