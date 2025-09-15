interface ConfirmationPageProps {
  params: { orderId: string }
}

export default function ConfirmationPage({ params }: ConfirmationPageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-background">
      <div className="max-w-md w-full text-center space-y-4">
        <h1 className="text-3xl font-bold">Order Confirmed</h1>
        <p className="text-muted-foreground">
          Your order <span className="font-mono font-semibold">{params.orderId}</span> has been successfully paid.
        </p>
        <a
          href="/marketplace"
          className="inline-block px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium hover:opacity-90 transition"
        >
          Back to Marketplace
        </a>
      </div>
    </div>
  )
}
