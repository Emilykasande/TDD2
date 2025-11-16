class PaymentProcessor {
  pay(amount) {
    throw new Error("Subclasses must implement this method");
  }
}

class StripeProcessor extends PaymentProcessor {
  pay(amount) {
    return this.#processPayment(amount, "Stripe");
  }

  #processPayment(amount, type) {
    return `Paid $${amount} using ${type}.`;
  }
}

class PayPalProcessor extends PaymentProcessor {
  pay(amount) {
    return this.#processPayment(amount, "PayPal");
  }

  #processPayment(amount, type) {
    return `Paid $${amount} using ${type}.`;
  }
}

module.exports = { PaymentProcessor, StripeProcessor, PayPalProcessor };
