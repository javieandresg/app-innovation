import axios from "axios";

const PAYPAL_API = "https://api-m.paypal.com";

export async function getPayPalAccessToken(): Promise<string> {
  const credentials = Buffer.from(
    `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
  ).toString("base64");

  const { data } = await axios.post(
    `${PAYPAL_API}/v1/oauth2/token`,
    "grant_type=client_credentials",
    {
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return data.access_token;
}

export async function createPayPalSubscription(userId: string): Promise<string> {
  const accessToken = await getPayPalAccessToken();

  const { data } = await axios.post(
    `${PAYPAL_API}/v1/billing/subscriptions`,
    {
      plan_id: process.env.PAYPAL_PLAN_ID,
      custom_id: userId,
      application_context: {
        return_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/paypal/capture`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
        brand_name: "innovation.ia",
        user_action: "SUBSCRIBE_NOW",
      },
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );

  const approvalLink = data.links.find((l: any) => l.rel === "approve");
  return approvalLink.href;
}

export async function getPayPalSubscription(subscriptionId: string) {
  const accessToken = await getPayPalAccessToken();

  const { data } = await axios.get(
    `${PAYPAL_API}/v1/billing/subscriptions/${subscriptionId}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  return data;
}
