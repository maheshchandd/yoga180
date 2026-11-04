import { FaWhatsapp } from "react-icons/fa";

export function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return <FaWhatsapp size={size} aria-hidden />;
}

export function Stars({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex gap-[3px] ${className}`} aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 2.5l2.9 6.2 6.8.8-5 4.7 1.3 6.7L12 17.6 6 20.9l1.3-6.7-5-4.7 6.8-.8z" />
        </svg>
      ))}
    </span>
  );
}
