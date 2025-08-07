import * as bcrypt from 'bcrypt';
import { Tokens } from 'src/auth/types'; // Adjust the import path

export const hashTokens = async (data: Tokens): Promise<Tokens> => {
  try {
    // Hash both access token and refresh token concurrently
    const [hashedAccessToken, hashedRefreshToken] = await Promise.all([
      bcrypt.hash(data.access_token, 10),
      bcrypt.hash(data.refresh_token, 10),
    ]);

    return {
      access_token: hashedAccessToken,
      refresh_token: hashedRefreshToken,
    };
  } catch (error) {
    // Handle any errors (e.g., bcrypt failure)
    throw new Error('Token hashing failed: ' + error.message);
  }
};
