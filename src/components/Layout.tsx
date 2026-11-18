import { Outlet } from "react-router-dom";
import NavbarPillCollapse from "@/components/navbars/NavbarPillCollapse";
import FooterCycleWordmark from "@/components/sections/footer/FooterCycleWordmark";

export default function Layout() {
  return (
    <div className="relative isolate min-h-svh flex flex-col bg-background text-foreground" data-button="square" data-card="outline" data-pattern="none">
      <header data-webild-section="Header">
        <NavbarPillCollapse
          brand="Studio Vale"
          avatarSrc="https://images.pexels.com/photos/8727530/pexels-photo-8727530.jpeg?auto=compress&w=400"
          navItems={[
            {
              name: "Services",
              href: "#services"
            },
            {
              name: "Work",
              href: "#work"
            },
            {
              name: "Process",
              href: "#process-pill-steps"
            },
            {
              name: "Pricing",
              href: "#pricing"
            }
          ]}
          cta={{
            text: "Start Project",
            href: "#contact-booking-card"
          }}
        />
      </header>
      <main className="flex-grow" data-button="square" data-card="outline" data-pattern="none">
        <Outlet />
      </main>
      <footer data-webild-section="Footer" data-section="footer">
        <FooterCycleWordmark
          brand="Studio Vale"
          titleLead="Let's"
          cycleWords={[
            "design",
            "develop",
            "launch"
          ]}
          titleQuiet="your digital presence together."
          contacts={[
            {
              label: "Email",
              text: "hello@studiovale.com",
              href: "mailto:hello@studiovale.com"
            },
            {
              label: "Call",
              text: "+1 (415) 890-1234",
              href: "tel:+14158901234"
            }
          ]}
          socials={[
            {
              text: "Instagram",
              href: "#"
            },
            {
              text: "Behance",
              href: "#"
            },
            {
              text: "Dribbble",
              href: "#"
            }
          ]}
          links={[
            {
              text: "Services",
              href: "#services"
            },
            {
              text: "Portfolio",
              href: "#work"
            },
            {
              text: "Process",
              href: "#process-pill-steps"
            },
            {
              text: "Pricing",
              href: "#pricing"
            },
            {
              text: "Contact",
              href: "#contact-booking-card"
            }
          ]}
          copyright="© 2026 Studio Vale. All rights reserved."
          socialsLabel="Connect"
          menuTitle="Navigation"
        />
      </footer>
    </div>
  );
}
