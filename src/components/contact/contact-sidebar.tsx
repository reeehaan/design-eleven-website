import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

type Channel = {
  label: string;
  value: string;
  href: string;
  note?: string;
  external?: boolean;
  /**
   * Set the value in the mono face rather than the display face. An email
   * address is a string you copy, not a number you read — at the display
   * step it wrapped across two lines and still looked like a headline.
   */
  code?: boolean;
};

/**
 * The three ways to reach us that are not the form, plus where we are.
 *
 * Deliberately quieter than it was. The phone number was set at text-4xl,
 * which put it in direct competition with the form's own question — on a page
 * whose job is to get the form filled in, the alternative to the form should
 * not be the loudest thing on screen.
 */
export function ContactSidebar() {
  const { contact } = siteConfig;

  const channels: Channel[] = [
    {
      label: "Phone",
      value: contact.phoneDisplay,
      href: `tel:${contact.phone.replace(/\s/g, "")}`,
      note: contact.hours,
    },
    {
      label: "WhatsApp",
      value: "Message us",
      href: `https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, "")}`,
      note: "Usually the fastest",
      external: true,
    },
    {
      label: "Email",
      value: contact.email,
      href: `mailto:${contact.email}`,
      code: true,
    },
  ];

  return (
    <aside aria-labelledby="direct-contact-heading">
      <h2 id="direct-contact-heading" className="sr-only">
        Contact us directly
      </h2>

      <p className="font-meta text-meta-sm uppercase text-zinc">
        Rather not fill in a form?
      </p>

      <ul className="mt-6 border-t border-concrete">
        {channels.map((c) => (
          <li key={c.label} className="border-b border-concrete">
            <a
              href={c.href}
              {...(c.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="group block py-5"
            >
              <span className="block font-meta text-meta-sm uppercase text-zinc">
                {c.label}
              </span>
              {/* block, not inline-flex: as an inline element this sat on the
                  same line as its own label while every sibling stacked. */}
              <span
                className={cn(
                  "mt-2 block break-words text-ink transition-colors group-hover:text-verdigris",
                  c.code
                    ? "font-meta text-meta"
                    : "font-title text-d4 font-medium",
                )}
              >
                {c.value}
                {c.external && <span aria-hidden="true"> →</span>}
              </span>
              {c.note && (
                <span className="mt-1.5 block text-fine text-zinc">
                  {c.note}
                </span>
              )}
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <span className="block font-meta text-meta-sm uppercase text-zinc">
          Office
        </span>
        <p className="mt-2 text-copy text-graphite">
          {contact.address.street}
          <br />
          {contact.address.city}, {contact.address.country}
        </p>
      </div>
    </aside>
  );
}
