import { siteConfig } from "@/lib/site";

/**
 * The ways to reach us that are not the form: phone and email set large, then
 * WhatsApp and the office as plain lines.
 */
export function ContactSidebar() {
  const { contact } = siteConfig;
  const big =
    "block break-words font-sans text-[clamp(1.5rem,2.2vw,2rem)] font-semibold leading-[1.1] tracking-[-0.025em] text-ink transition-colors hover:text-verdigris";
  const small =
    "font-sans text-[1.0625rem] font-semibold leading-[1.2] tracking-[-0.01em] text-ink";

  return (
    <aside aria-labelledby="direct-contact-heading">
      <h2 id="direct-contact-heading" className="sr-only">
        Contact us directly
      </h2>

      <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className={big}>
        {contact.phoneDisplay}
      </a>
      <a href={`mailto:${contact.email}`} className={`mt-1 ${big}`}>
        {contact.email}
      </a>
      <p className={`mt-3 text-zinc ${small}`}>{contact.hours}</p>

      <ul className={`mt-12 ${small}`}>
        <li>
          <a
            href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-verdigris"
          >
            WhatsApp
          </a>
          <span className="text-zinc">, usually the fastest</span>
        </li>
      </ul>

      <p className={`mt-12 ${small}`}>
        {contact.address.street}
        <br />
        {contact.address.city}, {contact.address.country}
      </p>
    </aside>
  );
}
