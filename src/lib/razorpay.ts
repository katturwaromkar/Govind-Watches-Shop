import crypto from "crypto";

/**
 * Cryptographically verifies Razorpay payment signature
 */
export function verifyRazorpaySignature(
  orderId: string,
  paymentId: string,
  signature: string,
  secret: string = process.env.RAZORPAY_KEY_SECRET || "govindraj_razorpay_secret_2026"
): boolean {
  try {
    const generatedSignature = crypto
      .createHmac("sha256", secret)
      .update(`${orderId}|${paymentId}`)
      .digest("hex");

    return generatedSignature === signature;
  } catch (error) {
    console.error("Razorpay Signature Verification Error:", error);
    return false;
  }
}
