const RefundPage = () => {
  return (
    <div className="text-white px-6 py-16 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Refund Policy</h1>
      <p className="text-white/50 text-sm mb-8">Last updated: October 22, 2026</p>

      <section className="space-y-6 text-white/80 text-sm leading-relaxed">
        <div>
          <h2 className="text-white font-semibold text-base mb-2">1. Free Trial</h2>
          <p>innovation.ia offers 5 free AI generations to all new users with no credit card required. We encourage you to try the platform before subscribing.</p>
        </div>

        <div>
          <h2 className="text-white font-semibold text-base mb-2">2. Subscription Cancellation</h2>
          <p>You may cancel your Pro subscription at any time from the Settings page. Upon cancellation, you will retain access to Pro features until the end of your current billing period. No further charges will be made after cancellation.</p>
        </div>

        <div>
          <h2 className="text-white font-semibold text-base mb-2">3. Refund Eligibility</h2>
          <p>Refunds may be issued within 7 days of the initial subscription payment if you are not satisfied with the service and have made fewer than 20 AI generations during that period. Renewal charges are generally non-refundable.</p>
        </div>

        <div>
          <h2 className="text-white font-semibold text-base mb-2">4. How to Request a Refund</h2>
          <p>To request a refund, contact us at support@innovation-ia.com within 7 days of your payment with your account email and reason for the refund. We will process eligible refunds within 5-10 business days.</p>
        </div>

        <div>
          <h2 className="text-white font-semibold text-base mb-2">5. Exceptions</h2>
          <p>Refunds will not be issued for accounts that have violated our Terms of Service or for charges older than 7 days from the payment date.</p>
        </div>

        <div>
          <h2 className="text-white font-semibold text-base mb-2">6. Contact</h2>
          <p>For refund requests or questions, contact us at support@innovation-ia.com.</p>
        </div>
      </section>
    </div>
  );
};

export default RefundPage;
