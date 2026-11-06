const WhatsAppProvider = require('./whatsappProvider.interface');
const logger = require('../../utils/logger');

class MockWhatsAppProvider extends WhatsAppProvider {
  constructor() {
    super();
    this.name = 'MOCK_WHATSAPP';
  }

  async sendMessage({ to, message, templateName, parameters }) {
    const messageId = `mock_msg_${Date.now()}_${Math.floor(Math.random() * 10000)}`;

    logger.info(`[MOCK WHATSAPP] Simulating message dispatch to: ${to}`);
    logger.info(`[MOCK WHATSAPP] Content:\n${message}`);

    // Simulate 98% success rate (fails if phone is explicitly invalid)
    if (!to || to.length < 8) {
      return {
        success: false,
        messageId,
        status: 'FAILED',
        error: 'Invalid phone number format',
      };
    }

    return {
      success: true,
      messageId,
      status: 'DELIVERED',
    };
  }
}

module.exports = MockWhatsAppProvider;
