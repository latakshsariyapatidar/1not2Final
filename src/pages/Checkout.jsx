import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useMovies } from "@/hooks/use-movies";
import { getDb } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export function Checkout() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { byId, loading } = useMovies();
  
  const [quantity, setQuantity] = useState(1);
  const [step, setStep] = useState(1); // 1: Details, 2: Payment
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", utr: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (loading) {
    return (
      <section className="scroll-mt-24 px-6 py-24 md:px-12 md:py-32 flex items-center justify-center min-h-[50vh]">
        <p className="label-mono animate-pulse text-gold">Loading checkout...</p>
      </section>
    );
  }

  const movie = byId.get(id);

  if (!movie) {
    return (
      <section className="scroll-mt-24 px-6 py-24 md:px-12 md:py-32 text-center">
        <h2 className="font-display text-4xl mb-6">Movie not found</h2>
        <Link to="/tickets" className="ghost-btn">Back to Tickets</Link>
      </section>
    );
  }

  const totalPrice = (movie.ticketPrice || 0) * quantity;

  const handleNext = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleConfirm = async (e) => {
    if (e) e.preventDefault();
    
    if (!formData.utr) {
      alert("Please enter the Payment UTR / Transaction ID");
      return;
    }

    const db = getDb();
    if (!db) {
      alert("Database connection is not configured.");
      return;
    }

    setIsSubmitting(true);
    try {
      const qrData = `upi://pay?pa=lataksh.sariya@axl&pn=OneNotTwo&am=${totalPrice}&cu=INR`;
      
      await addDoc(collection(db, "bookings"), {
        movieId: movie.id,
        movieTitle: movie.title,
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        numberOfTickets: quantity,
        ticketPrice: movie.ticketPrice,
        totalAmount: totalPrice,
        paymentUTR: formData.utr,
        paymentQRUsed: qrData,
        paymentStatus: "pending", // pending, verified, rejected
        ticketStatus: "pending", // pending, confirmed, cancelled
        bookingDate: new Date().toISOString(),
        createdAt: serverTimestamp(),
        verificationToken: Math.random().toString(36).substr(2, 9)
      });
      
      alert(`🎉 Booking Submitted Successfully!\n\nOnce we verify your payment (UTR: ${formData.utr}), we'll send your ticket to ${formData.email}.`);
      navigate("/tickets");
    } catch (error) {
      console.error("Failed to save booking: ", error);
      alert("Failed to record booking. Please try again or contact support.");
      setIsSubmitting(false);
    }
  };

  return (
    <section className="scroll-mt-24 px-6 py-24 md:px-12 md:py-32 min-h-[80vh]">
      <div className="max-w-4xl mx-auto">
        <p className="label-mono mb-4 text-gold">/ Checkout</p>
        <h2 className="font-display text-5xl leading-tight mb-12">
          Secure your seat.
        </h2>

        <div className="grid md:grid-cols-[1fr_1.2fr] gap-12 items-start">
          {/* Order Summary */}
          <div className="bg-surface p-8 border border-border">
            <h3 className="label-mono text-gold border-b border-border pb-4 mb-6">Order Summary</h3>
            
            <div className="flex gap-6 mb-8">
              {movie.posterUrl && (
                <img 
                  src={movie.posterUrl} 
                  alt={movie.title} 
                  className="w-24 h-36 object-cover"
                />
              )}
              <div>
                <h4 className="font-display text-2xl mb-2">{movie.title}</h4>
                <p className="label-mono text-sm text-muted-foreground mb-4">
                  {typeof movie.duration === 'number' ? `${movie.duration} min` : movie.duration} · {movie.genre}
                </p>
                <p className="label-mono text-gold">₹{movie.ticketPrice} per ticket</p>
              </div>
            </div>

            <div className="space-y-4 border-t border-border pt-6">
              <div className="flex justify-between items-center">
                <span className="label-mono">Tickets</span>
                {step === 1 ? (
                  <div className="flex items-center gap-4 border border-border px-3 py-1">
                    <button 
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="text-gold hover:text-white transition-colors"
                    >-</button>
                    <span className="w-4 text-center">{quantity}</span>
                    <button 
                      type="button"
                      onClick={() => setQuantity(Math.min(10, quantity + 1))}
                      className="text-gold hover:text-white transition-colors"
                    >+</button>
                  </div>
                ) : (
                  <span className="label-mono">{quantity}</span>
                )}
              </div>
              <div className="flex justify-between items-center text-xl font-display pt-4 border-t border-border">
                <span>Total</span>
                <span className="text-gold">₹{totalPrice}</span>
              </div>
            </div>
          </div>

          {/* Checkout Steps */}
          <div>
            {step === 1 && (
              <form onSubmit={handleNext} className="space-y-6">
                <div>
                  <label className="block label-mono text-sm mb-2">Full Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-surface border border-border p-3 focus:outline-none focus:border-gold transition-colors text-white"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block label-mono text-sm mb-2">Email Address</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-surface border border-border p-3 focus:outline-none focus:border-gold transition-colors text-white"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block label-mono text-sm mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-surface border border-border p-3 focus:outline-none focus:border-gold transition-colors text-white"
                    placeholder="+91 98765 43210"
                  />
                </div>
                
                <button type="submit" className="w-full ghost-btn ghost-btn-gold text-center py-4 mt-4">
                  Proceed to Payment
                </button>
              </form>
            )}

            {step === 2 && (
              <div className="bg-surface p-8 border border-border text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h3 className="font-display text-3xl">Scan to Pay</h3>
                <p className="text-muted-foreground">Scan the QR code below using any UPI app to complete your payment of <span className="text-gold font-display">₹{totalPrice}</span>.</p>
                
                <div className="bg-white p-4 w-64 h-64 mx-auto flex items-center justify-center">
                  {/* Placeholder for UPI QR Code. You can replace this src with a real UPI QR generator URL based on your UPI ID and the totalPrice */}
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(`upi://pay?pa=lataksh.sariya@axl&pn=OneNotTwo&am=${totalPrice}&cu=INR`)}`} 
                    alt="UPI QR Code" 
                    className="w-full h-full object-contain"
                  />
                </div>
                
                <p className="label-mono text-xs text-gold mt-2">UPI ID: lataksh.sariya@axl</p>

                <div className="text-left space-y-4 pt-4 border-t border-border">
                  <label className="block label-mono text-sm mb-1 text-gold">Payment UTR / Transaction ID *</label>
                  <input 
                    type="text" 
                    required
                    value={formData.utr}
                    onChange={(e) => setFormData({...formData, utr: e.target.value})}
                    className="w-full bg-background border border-border p-3 focus:outline-none focus:border-gold transition-colors text-white label-mono text-sm"
                    placeholder="Enter 12-digit UTR number"
                  />
                  <p className="text-[10px] label-mono text-muted-foreground italic">
                    Find UTR number in your payment app's transaction history
                  </p>
                </div>

                <div className="pt-6 space-y-4">
                  <button 
                    onClick={handleConfirm} 
                    disabled={isSubmitting}
                    className="w-full ghost-btn ghost-btn-gold text-center py-4 disabled:opacity-50 disabled:cursor-wait"
                  >
                    {isSubmitting ? "Processing Booking..." : "I have completed the payment"}
                  </button>
                  <button 
                    onClick={() => setStep(1)} 
                    disabled={isSubmitting}
                    className="w-full text-xs label-mono text-muted-foreground hover:text-white transition-colors disabled:opacity-50"
                  >
                    ← Back to details
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
