const { PaymentProcessor,StripeProcessor,PayPalProcessor,} = require("./paymentProcessor");

describe("Payment processors", () => {
  test("Stripe should process payment correctly", () => {
    const processor = new StripeProcessor();
    const result = processor.pay(50);
    expect(result).toBe("Paid $50 using Stripe.");
  });

  test("PayPal should process payment correctly", () => {
    const processor = new PayPalProcessor();
    const result = processor.pay(100);
    expect(result).toBe("Paid $100 using PayPal.");
  });

  test("PaymentProcessor base class should throw error when calling pay()", () => {
    const processor = new PaymentProcessor();
    expect(() => processor.pay(10)).toThrow(
      "Subclasses must implement this method"
    );
  });
});
