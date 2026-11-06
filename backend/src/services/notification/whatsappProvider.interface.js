/**
 * WhatsApp Provider Abstract Base Class
 */
class WhatsAppProvider {
  /**
   * Send WhatsApp message
   * @param {Object} params
   * @param {string} params.to Phone number with country code
   * @param {string} params.message Message text body
   * @param {string} [params.templateName] Optional template name for Meta Cloud API
   * @param {Array} [params.parameters] Optional template parameters
   * @returns {Promise<{ success: boolean, messageId: string, status: string, error?: string }>}
   */
  async sendMessage(params) {
    throw new Error('sendMessage() method must be implemented by provider');
  }
}

module.exports = WhatsAppProvider;
