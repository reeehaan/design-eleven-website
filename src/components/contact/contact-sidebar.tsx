import { siteConfig } from "@/lib/site";

export function ContactSidebar() {
  const phoneTel = siteConfig.contact.phone.replace(/\s/g, "");
  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, "")}`;

  return (
    <aside className="flex flex-col gap-10">
      <div>
        <span className="font-mono text-xs uppercase tracking-[0.08em] text-fg-subtle">
          Or contact directly
        </span>
        <h2 className="sr-only">Direct contact information</h2>
      </div>

      <div>
        <span className="font-mono text-xs uppercase tracking-[0.08em] text-fg-muted">
          Phone
        </span>
        <a
          href={`tel:${phoneTel}`}
          className="mt-2 block font-display text-3xl text-fg-primary transition-colors hover:text-accent md:text-4xl"
        >
          {siteConfig.contact.phoneDisplay}
        </a>
        <span className="mt-2 block text-sm text-fg-muted">
          {siteConfig.contact.hours}
        </span>
      </div>

      <div>
        <span className="font-mono text-xs uppercase tracking-[0.08em] text-fg-muted">
          WhatsApp
        </span>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center gap-2 font-display text-2xl text-fg-primary transition-colors hover:text-accent md:text-3xl"
        >
          Message us <span aria-hidden="true">→</span>
        </a>
      </div>

      <div>
        <span className="font-mono text-xs uppercase tracking-[0.08em] text-fg-muted">
          Email
        </span>
        <a
          href={`mailto:${siteConfig.contact.email}`}
          className="mt-2 block break-words text-fg-primary transition-colors hover:text-accent"
        >
          {siteConfig.contact.email}
        </a>
      </div>

      <div>
        <span className="font-mono text-xs uppercase tracking-[0.08em] text-fg-muted">
          Office
        </span>
        <p className="mt-2 text-fg-primary">
          {siteConfig.contact.address.city}
          <br />
          {siteConfig.contact.address.country}
        </p>
      </div>
    </aside>
  );
}
