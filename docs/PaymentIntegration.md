
# SkillFlash: Payment Gateway Architecture

## 1. Stripe (International)
*   **Logic:** Frontend collects payment method -> Backend creates PaymentIntent -> Frontend confirms payment.
*   **Flutter Package:** `flutter_stripe`
*   **Usage:** Buying Pro Courses & XP Bundles.

## 2. SSLCommerz (Regional Focus)
*   **Logic:** Redirect to hosted payment page for local mobile banking (bKash, Nagad).
*   **Usage:** Mentor Tipping and Subscription renewals.

## 3. Reward System Integration
*   **XP to Cash:** Creators can convert "XP Generated" into real-world currency at a rate of $1 per 100,000 XP.
*   **Escrow:** Funds are held in escrow until the user completes at least 50% of a purchased course.
