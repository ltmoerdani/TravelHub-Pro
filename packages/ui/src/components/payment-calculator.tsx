import { Component, JSX, splitProps, createSignal, createMemo } from "solid-js";
import { cn } from "../utils";
import { Card, CardContent, CardHeader, CardTitle } from "./card";

interface PaymentCalculatorProps extends JSX.HTMLAttributes<HTMLDivElement> {
  totalAmount: number;
  currency?: string;
  isShariahCompliant?: boolean;
}

export const PaymentCalculator: Component<PaymentCalculatorProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "totalAmount", "currency", "isShariahCompliant"]);
  
  const [installments, setInstallments] = createSignal(6);
  const [downPaymentPercent, setDownPaymentPercent] = createSignal(30);

  const calculations = createMemo(() => {
    const total = local.totalAmount;
    const downPayment = total * (downPaymentPercent() / 100);
    const remaining = total - downPayment;
    const monthlyPayment = remaining / (installments() - 1);
    
    return {
      downPayment,
      monthlyPayment,
      totalWithFees: total, // No additional fees for Shariah compliance
      schedule: Array.from({ length: installments() }, (_, i) => ({
        installmentNumber: i + 1,
        amount: i === 0 ? downPayment : monthlyPayment,
        dueDate: new Date(Date.now() + (i * 30 * 24 * 60 * 60 * 1000)),
        status: 'pending' as const
      }))
    };
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: local.currency || 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card class={cn("w-full", local.class)} {...others}>
      <CardHeader>
        <CardTitle class="flex items-center space-x-2">
          <span class="text-lg">💰</span>
          <span>Payment Calculator</span>
          {local.isShariahCompliant && (
            <span class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
              Shariah Compliant
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent class="space-y-6">
        {/* Configuration */}
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Number of Installments
            </label>
            <select
              value={installments()}
              onChange={(e) => setInstallments(parseInt(e.currentTarget.value))}
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={3}>3 months</option>
              <option value={6}>6 months</option>
              <option value={9}>9 months</option>
              <option value={12}>12 months</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Down Payment: {downPaymentPercent()}%
            </label>
            <input
              type="range"
              min="20"
              max="50"
              step="5"
              value={downPaymentPercent()}
              onInput={(e) => setDownPaymentPercent(parseInt(e.currentTarget.value))}
              class="w-full"
            />
            <div class="flex justify-between text-xs text-gray-500 mt-1">
              <span>20%</span>
              <span>50%</span>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div class="bg-gray-50 rounded-lg p-4 space-y-2">
          <div class="flex justify-between">
            <span class="text-sm text-gray-600">Total Amount:</span>
            <span class="font-medium">{formatCurrency(local.totalAmount)}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-sm text-gray-600">Down Payment:</span>
            <span class="font-medium text-blue-600">{formatCurrency(calculations().downPayment)}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-sm text-gray-600">Monthly Payment:</span>
            <span class="font-medium text-green-600">{formatCurrency(calculations().monthlyPayment)}</span>
          </div>
          {local.isShariahCompliant && (
            <div class="pt-2 border-t border-gray-200">
              <div class="text-xs text-green-700">
                ✓ No interest charges (Riba-free)
              </div>
              <div class="text-xs text-green-700">
                ✓ Mudharabah contract compliant
              </div>
            </div>
          )}
        </div>

        {/* Payment Schedule */}
        <div>
          <h4 class="font-medium text-gray-900 mb-3">Payment Schedule</h4>
          <div class="space-y-2 max-h-48 overflow-y-auto">
            {calculations().schedule.map((payment) => (
              <div class="flex items-center justify-between p-2 bg-white border border-gray-200 rounded">
                <div>
                  <div class="text-sm font-medium">
                    {payment.installmentNumber === 1 ? 'Down Payment' : `Payment ${payment.installmentNumber}`}
                  </div>
                  <div class="text-xs text-gray-500">
                    Due: {formatDate(payment.dueDate)}
                  </div>
                </div>
                <div class="text-right">
                  <div class="font-medium">{formatCurrency(payment.amount)}</div>
                  <div class="text-xs text-gray-500">{payment.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {local.isShariahCompliant && (
          <div class="bg-green-50 border border-green-200 rounded-lg p-3">
            <div class="text-sm text-green-800">
              <strong>Islamic Finance Principles:</strong>
              <ul class="mt-1 text-xs space-y-1">
                <li>• No Riba (Interest) charges</li>
                <li>• Transparent pricing structure</li>
                <li>• Mutual consent (Ridha) based</li>
                <li>• Compliant with Shariah law</li>
              </ul>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};