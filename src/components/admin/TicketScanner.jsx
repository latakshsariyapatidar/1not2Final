import { useState, useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { getDb } from "@/lib/firebase";
import { collection, getDocs, query, where, limit } from "firebase/firestore";

export function TicketScanner() {
  const [scanResult, setScanResult] = useState(null);
  const [isChecking, setIsChecking] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const scannerRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    const startScanner = async () => {
      // If we already have a scanner on this element, don't start another one
      if (scannerRef.current && scannerRef.current.isScanning) {
        return;
      }

      const html5QrCode = new Html5Qrcode("reader");
      scannerRef.current = html5QrCode;

      try {
        const cameras = await Html5Qrcode.getCameras();
        if (cameras && cameras.length > 0 && isMounted) {
          const backCamera = cameras.find(c => c.label.toLowerCase().includes("back")) || cameras[0];
          
          await html5QrCode.start(
            backCamera.id,
            {
              fps: 10,
              qrbox: { width: 250, height: 250 },
            },
            (decodedText) => {
              if (isMounted) handleScan(decodedText);
            },
            (errorMessage) => {
              // ignore
            }
          );
          if (isMounted) setCameraActive(true);
        }
      } catch (err) {
        if (isMounted) console.error("Camera access failed", err);
      }
    };

    startScanner();

    return () => {
      isMounted = false;
      if (scannerRef.current) {
        const scanner = scannerRef.current;
        if (scanner.isScanning) {
          scanner.stop().catch(e => console.error("Scanner stop failed", e));
        }
        scannerRef.current = null;
      }
    };
  }, []);

  const handleScan = async (data) => {
    if (isChecking) return;
    setIsChecking(true);

    const db = getDb();
    try {
      // Try to find by verificationToken first
      const q = query(collection(db, "bookings"), where("verificationToken", "==", data), limit(1));
      let snap = await getDocs(q);

      if (snap.empty) {
        // Try searching for id directly if not a token
        const q2 = query(collection(db, "bookings"), where("__name__", "==", data), limit(1));
        snap = await getDocs(q2);
      }

      if (!snap.empty) {
        const booking = snap.docs[0].data();
        setScanResult({
          valid: booking.paymentStatus === "verified",
          ...booking
        });
      } else {
        setScanResult({ invalid: true });
      }
    } catch (err) {
      console.error("Scan processing error:", err);
      setScanResult({ error: true });
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-8">
      <div className="text-center">
        <h3 className="font-display text-3xl mb-2">Gate Scanner</h3>
        <p className="label-mono text-xs text-muted-foreground uppercase tracking-widest">Verify attendee tickets</p>
      </div>

      <div id="reader" className="bg-background border border-border"></div>

      {isChecking && (
        <div className="text-center py-4">
          <p className="label-mono text-xs animate-pulse text-gold">Verifying ticket...</p>
        </div>
      )}

      {scanResult && (
        <div className={`p-6 border ${scanResult.valid ? "border-green-500 bg-green-500/5" : "border-red-500 bg-red-500/5"
          } animate-in fade-in slide-in-from-bottom-4`}>
          <div className="flex justify-between items-start mb-4">
            <h4 className="font-display text-2xl uppercase tracking-tighter">
              {scanResult.invalid ? "Invalid QR Code" : scanResult.valid ? "Access Granted" : "Access Denied"}
            </h4>
            <button onClick={() => setScanResult(null)} className="label-mono text-[10px] text-muted-foreground hover:text-white">Clear</button>
          </div>

          {!scanResult.invalid && !scanResult.error && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="label-mono text-[9px] uppercase text-muted-foreground">Guest</p>
                  <p className="font-display text-lg">{scanResult.customerName}</p>
                </div>
                <div>
                  <p className="label-mono text-[9px] uppercase text-muted-foreground">Status</p>
                  <p className={`label-mono text-sm font-bold uppercase ${scanResult.valid ? "text-green-500" : "text-yellow-500"}`}>
                    {scanResult.paymentStatus || "Unverified"}
                  </p>
                </div>
              </div>
              <div className="pt-4 border-t border-border/50">
                <p className="label-mono text-[9px] uppercase text-muted-foreground">Movie & Tickets</p>
                <p className="text-sm font-bold">{scanResult.movieTitle} × {scanResult.numberOfTickets}</p>
              </div>

              {!scanResult.valid && (
                <div className="bg-red-500/10 border border-red-500/30 p-3">
                  <p className="label-mono text-[10px] text-red-500 leading-tight">
                    This ticket has not been verified by admin. Please check payment status in Bookings.
                  </p>
                </div>
              )}
            </div>
          )}

          {scanResult.error && (
            <p className="label-mono text-xs text-red-500">Error processing ticket. Try again.</p>
          )}
        </div>
      )}

      <div className="bg-surface-2 p-4 border border-border">
        <h5 className="label-mono text-[10px] text-gold uppercase mb-2">Instructions</h5>
        <ul className="label-mono text-[9px] text-muted-foreground space-y-1 list-disc pl-4">
          <li>Ensure the QR code is centered and well-lit.</li>
          <li>Verified tickets will show a green "Access Granted" message.</li>
          <li>Yellow or Red status indicates unverified payment or invalid code.</li>
        </ul>
      </div>
    </div>
  );
}
