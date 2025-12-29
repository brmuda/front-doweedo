import { CreditCard, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    features: ["5 conversions/day", "Basic languages", "Community support"],
    current: false,
  },
  {
    name: "Pro",
    price: "$19",
    period: "month",
    features: ["Unlimited conversions", "All languages", "Priority support", "API access"],
    current: true,
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$99",
    period: "month",
    features: ["Everything in Pro", "Custom integrations", "Dedicated support", "SLA guarantee"],
    current: false,
  },
];

const invoices = [
  { date: "Dec 1, 2024", amount: "$19.00", status: "Paid" },
  { date: "Nov 1, 2024", amount: "$19.00", status: "Paid" },
  { date: "Oct 1, 2024", amount: "$19.00", status: "Paid" },
];

export function BillingSettings() {
  return (
    <div className="space-y-8">
      {/* Current Plan */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          Your Plan
        </h3>
        
        <div className="grid md:grid-cols-3 gap-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative p-6 rounded-xl border ${
                plan.current
                  ? "border-primary bg-primary/5"
                  : "border-border/50 bg-secondary/30"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-medium rounded-full bg-primary text-primary-foreground">
                  Popular
                </span>
              )}
              <div className="text-center mb-4">
                <h4 className="font-semibold text-lg">{plan.name}</h4>
                <div className="mt-2">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">/{plan.period}</span>
                </div>
              </div>
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                variant={plan.current ? "outline" : "glow"}
                className="w-full"
                disabled={plan.current}
              >
                {plan.current ? "Current Plan" : "Upgrade"}
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Method */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-primary" />
          Payment Method
        </h3>
        
        <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 border border-border/50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-8 rounded bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center text-white text-xs font-bold">
              VISA
            </div>
            <div>
              <p className="font-medium">•••• •••• •••• 4242</p>
              <p className="text-sm text-muted-foreground">Expires 12/26</p>
            </div>
          </div>
          <Button variant="ghost" size="sm">Update</Button>
        </div>
      </div>

      {/* Billing History */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Billing History</h3>
        
        <div className="rounded-xl border border-border/50 overflow-hidden">
          <table className="w-full">
            <thead className="bg-secondary/50">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium">Date</th>
                <th className="text-left px-4 py-3 text-sm font-medium">Amount</th>
                <th className="text-left px-4 py-3 text-sm font-medium">Status</th>
                <th className="text-right px-4 py-3 text-sm font-medium">Invoice</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice, index) => (
                <tr key={index} className="border-t border-border/50">
                  <td className="px-4 py-3 text-sm">{invoice.date}</td>
                  <td className="px-4 py-3 text-sm">{invoice.amount}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-400">
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button variant="ghost" size="sm">Download</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
