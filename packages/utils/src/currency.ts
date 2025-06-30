export function formatCurrency(amount: number, currency: string = 'IDR'): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('id-ID').format(num);
}

export function calculateInstallment(
  totalAmount: number,
  installments: number,
  downPaymentPercent: number = 30
): {
  downPayment: number;
  monthlyPayment: number;
  totalWithFees: number;
} {
  const downPayment = totalAmount * (downPaymentPercent / 100);
  const remaining = totalAmount - downPayment;
  const monthlyPayment = remaining / (installments - 1); // -1 because down payment is first installment
  
  return {
    downPayment,
    monthlyPayment,
    totalWithFees: totalAmount, // No additional fees for Shariah compliance
  };
}