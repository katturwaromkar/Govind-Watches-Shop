export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '918484080732';

export function getProductWhatsAppUrl(productName: string, price: number, sku?: string): string {
  const text = `Hello Govindraj Watch & Accessories,%0A%0AI am interested in purchasing/enquiring about:%0A*${encodeURIComponent(productName)}*%0APrice: ₹${price.toLocaleString('en-IN')}${sku ? `%0ASKU: ${sku}` : ''}%0A%0APlease provide availability and order details.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

export function getRepairWhatsAppUrl(repairId: string, serviceType: string, customerName: string): string {
  const text = `Hello Govindraj Watch Repair Hub,%0A%0AI have submitted a repair booking request:%0A*Repair Booking ID:* ${repairId}%0A*Service:* ${encodeURIComponent(serviceType)}%0A*Name:* ${encodeURIComponent(customerName)}%0A%0APlease confirm appointment slot and details.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

export function getOrderWhatsAppUrl(orderId: string, totalAmount: number): string {
  const text = `Hello Govindraj Watch Shop,%0A%0AI have placed an order on the website:%0A*Order ID:* ${orderId}%0A*Total Amount:* ₹${totalAmount.toLocaleString('en-IN')}%0A%0APlease confirm dispatch and tracking update.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

export function getGeneralWhatsAppUrl(): string {
  const text = `Hello Govindraj Watch & Accessories,%0A%0AI would like to enquire about watches, accessories or repair services.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}
