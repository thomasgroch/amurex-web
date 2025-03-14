import crypto from 'crypto';

// Get encryption key from environment variable or generate a warning
const getEncryptionKey = () => {
  const key = process.env.ENCRYPTION_KEY;
  if (!key) {
    console.warn('ENCRYPTION_KEY not set in environment variables. Using fallback key (not secure for production).');
    return 'fallback-encryption-key-for-development-only';
  }
  return key;
};

// Encrypt data using AES-256-GCM
export const encryptData = (data) => {
  try {
    // Convert data to string if it's not already
    const dataString = typeof data === 'string' ? data : JSON.stringify(data);
    
    // Generate a random initialization vector
    const iv = crypto.randomBytes(16);
    
    // Create cipher using the encryption key and iv
    const cipher = crypto.createCipheriv(
      'aes-256-gcm', 
      crypto.scryptSync(getEncryptionKey(), 'salt', 32), 
      iv
    );
    
    // Encrypt the data
    let encrypted = cipher.update(dataString, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    // Get the authentication tag
    const authTag = cipher.getAuthTag();
    
    // Return the encrypted data, iv, and authTag as a single string
    return {
      encrypted: encrypted,
      iv: iv.toString('hex'),
      authTag: authTag.toString('hex')
    };
  } catch (error) {
    console.error('Encryption error:', error);
    throw new Error('Failed to encrypt data');
  }
};

// Decrypt data using AES-256-GCM
export const decryptData = (encryptedData) => {
  try {
    const { encrypted, iv, authTag } = encryptedData;
    
    // Create decipher
    const decipher = crypto.createDecipheriv(
      'aes-256-gcm',
      crypto.scryptSync(getEncryptionKey(), 'salt', 32),
      Buffer.from(iv, 'hex')
    );
    
    // Set auth tag
    decipher.setAuthTag(Buffer.from(authTag, 'hex'));
    
    // Decrypt the data
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    // Try to parse as JSON if possible
    try {
      return JSON.parse(decrypted);
    } catch {
      // If not valid JSON, return as is
      return decrypted;
    }
  } catch (error) {
    console.error('Decryption error:', error);
    throw new Error('Failed to decrypt data');
  }
};

// Helper function to encrypt an object with specific fields encrypted
export const encryptFields = (obj, fieldsToEncrypt) => {
  const result = { ...obj };
  
  for (const field of fieldsToEncrypt) {
    if (obj[field]) {
      result[field] = encryptData(obj[field]);
    }
  }
  
  return result;
};

// Helper function to decrypt an object with specific fields encrypted
export const decryptFields = (obj, fieldsToDecrypt) => {
  const result = { ...obj };
  
  for (const field of fieldsToDecrypt) {
    if (obj[field] && obj[field].encrypted && obj[field].iv && obj[field].authTag) {
      try {
        result[field] = decryptData(obj[field]);
      } catch (error) {
        console.error(`Error decrypting field ${field}:`, error);
        // Keep the encrypted version if decryption fails
      }
    }
  }
  
  return result;
}; 