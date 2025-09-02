import api from '@/api'
import CryptoJS from 'crypto-js'
import Fingerprint2 from 'fingerprintjs2'

class AuthService {
  /**
   * Generate device fingerprint for authentication
   * @returns {Promise<string>} Device fingerprint hash
   */
  async getFingerprint() {
    const options = {
      excludes: {
        userAgent: true,
        language: true,
        availableScreenResolution: true,
        screenResolution: true,
        plugins: true,
        timezone: true,
        timezoneOffset: true,
        pixelRatio: true,
        colorDepth: true,
        audio: true,
        fontsFlash: true,
        enumerateDevices: true,
        adBlock: true,
        webgl: true,
        canvas: true,
      },
    }

    const components = await Fingerprint2.getPromise(options)
    return Fingerprint2.x64hash128(
      components.map(({ value }) => value).join(''),
      228
    )
  }

  /**
   * Hash password using SHA1
   * @param {string} password - Plain text password
   * @returns {string} Hashed password
   */
  hashPassword(password) {
    return CryptoJS.SHA1(password).toString(CryptoJS.enc.Hex)
  }

  /**
   * Authenticate user with email and password
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<Object>} Authentication response data
   */
  async signIn(email, password) {
    const hashedPassword = this.hashPassword(password)
    const fingerprint = await this.getFingerprint()

    try {
      const response = await api.post('/authenticate', {
        username: email,
        password: hashedPassword,
        fingerprint,
      })

      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  /**
   * Get current user profile
   * @returns {Promise<Object>} User profile data
   */
  async getCurrentUser() {
    const response = await api.get('/user/my')
    return response.data
  }
}

// Export singleton instance
export default new AuthService()
