const PrivacyPage = () => {
  return (
    <div className="text-white px-6 py-16 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
      <p className="text-white/50 text-sm mb-8">Last updated: October 22, 2026</p>

      <section className="space-y-6 text-white/80 text-sm leading-relaxed">
        <div>
          <h2 className="text-white font-semibold text-base mb-2">1. Information We Collect</h2>
          <p>We collect information you provide when creating an account (name, email address) and information generated through your use of the platform (prompts, generated content, usage data).</p>
        </div>

        <div>
          <h2 className="text-white font-semibold text-base mb-2">2. How We Use Your Information</h2>
          <p>We use your information to provide and improve the platform, process payments, send service-related communications, and ensure platform security. We do not sell your personal data to third parties.</p>

        </div>

        <div>
          <h2 className="text-white font-semibold text-base mb-2">3. Payment Information</h2>
          <p>Payments are processed by Paddle. We do not store your credit card or payment information. Please refer to Paddle&apos;s privacy policy for details on how payment data is handled.</p>
        </div>

        <div>
          <h2 className="text-white font-semibold text-base mb-2">4. Authentication</h2>
          <p>Authentication is handled by Clerk. Your login credentials are managed securely by Clerk. Please refer to Clerk&apos;s privacy policy for details.</p>
        </div>

        <div>
          <h2 className="text-white font-semibold text-base mb-2">5. Data Retention</h2>
          <p>We retain your account data for as long as your account is active. You may request deletion of your data at any time by contacting us.</p>
        </div>

        <div>
          <h2 className="text-white font-semibold text-base mb-2">6. Cookies</h2>
          <p>We use cookies to maintain your session and improve your experience. You can disable cookies in your browser settings, though some features may not function properly.</p>
        </div>

        <div>
          <h2 className="text-white font-semibold text-base mb-2">7. Third-Party Services</h2>
          <p>We use third-party AI services (Groq, Replicate) to power content generation. Prompts you submit may be processed by these services. We do not share personal information with these providers beyond what is necessary to process your requests.</p>
        </div>

        <div>
          <h2 className="text-white font-semibold text-base mb-2">8. Your Rights</h2>
          <p>You have the right to access, correct, or delete your personal data. To exercise these rights, contact us at support@innovation-ia.com.</p>
        </div>

        <div>
          <h2 className="text-white font-semibold text-base mb-2">9. Contact</h2>
          <p>For privacy-related questions, contact us at support@innovation-ia.com.</p>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPage;
