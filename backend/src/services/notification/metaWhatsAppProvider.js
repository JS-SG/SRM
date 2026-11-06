const axios = require('axios');
const WhatsAppProvider = require('./whatsappProvider.interface');
const config = require('../../config/env');
const logger = require('../../utils/logger');

class MetaWhatsAppProvider extends WhatsAppProvider {
  constructor() {
    super();
    this.name = 'META_WHATSAPP';
    this.apiUrl = config.WHATSAPP_API_URL;
    this.accessToken = config.WHATSAPP_ACCESS_TOKEN;
    this.phoneNumberId = config.WHATSAPP_PHONE_NUMBER_ID;
  }

  async sendMessage({ to, message, templateName, parameters }) {
    if (!this.accessToken || !this.phoneNumberId) {
      logger.warn('[META WHATSAPP] Missing Meta credentials in .env. Falling back to simulated response.');
      return {
        success: false,
        messageId: `failed_${Date.now()}`,
        status: 'FAILED',
        error: 'Meta WhatsApp credentials (WHATSAPP_ACCESS_TOKEN / WHATSAPP_PHONE_NUMBER_ID) not configured',
      };
    }

    try {
      // Clean phone number (strip +, spaces, dashes)
      const cleanPhone = to.replace(/\D/g, '');

      let payload;
      if (templateName) {
        payload = {
          messaging_product: 'whatsapp',
          to: cleanPhone,
          type: 'template',
          template: {
            name: templateName,
            language: { code: 'en_US' },
            components: parameters || [],
          },
        };
      } else {
        payload = {
          messaging_product: 'whatsapp',
          recipient_type: 'individual',
          to: cleanPhone,
          type: 'text',
          text: { preview_url: false, body: message },
        };
      }

      const response = await axios.post(
        `${this.apiUrl}/${this.phoneNumberId}/messages`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const messageId = response.data?.messages?.[0]?.id || `meta_${Date.now()}`;
      return {
        success: true,
        messageId,
        status: 'SENT',
      };
    } catch (err) {
      logger.error(`[META WHATSAPP] API Error: ${err.response?.data?.error?.message || err.message}`);
      return {
        success: false,
        messageId: `err_${Date.now()}`,
        status: 'FAILED',
        error: err.response?.data?.error?.message || err.message,
      };
    }
  }
}

module.exports = MetaWhatsAppProvider;
