export function buildWhatsAppUrl(
  phone: string | undefined,
  message: string
): string | null {
  if (!phone) return null;
  const cleaned = phone.replace(/[^\d]/g, "");
  if (!cleaned) return null;
  return `https://wa.me/${cleaned}?text=${encodeURIComponent(message)}`;
}

export function productEnquiryMessage(productTitle: string): string {
  return `Hi Craftimacy, I'm interested in the "${productTitle}" piece. Could you share more details?`;
}

export function generalEnquiryMessage(): string {
  return `Hi Craftimacy, I'd like to know more about your handcrafted jewelry.`;
}