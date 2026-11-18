import HeroCardHand from "@/components/sections/hero/HeroCardHand";
import FeaturesToolStackList from "@/components/sections/features/FeaturesToolStackList";
import GalleryCardHandGrid from "@/components/sections/gallery/GalleryCardHandGrid";
import ProcessPillSteps from "@/components/sections/features/ProcessPillSteps";
import PricingTiltedCard from "@/components/sections/pricing/PricingTiltedCard";
import TestimonialQuoteGrid from "@/components/sections/testimonial/TestimonialQuoteGrid";
import ContactBookingCard from "@/components/sections/contact/ContactBookingCard";
import LaunchfolioLoader from "@/components/kit/LaunchfolioLoader";

export default function HomePage() {
  return (
    <>
      <LaunchfolioLoader
        name="Jacob Morales"
        role="Creative Director"
      />

      <div id="home" data-webild-section="HeroCardHand" data-webild-section-id="HeroCardHand-1" data-section="home" data-scene>
        <HeroCardHand
          introDelay={0.25}
          availability="Available for select projects"
          titleQuiet="Beautifully designed."
          title="Thoughtfully built."
          descriptionLead="Custom digital experiences for modern brands."
          description="We craft elegant, functional websites for entrepreneurs and small businesses seeking quiet luxury and editorial distinction."
          primaryButton={{
            text: "Start Your Project",
            href: "#contact-booking-card",
            avatarSrc: "https://img.b2bpic.net/free-photo/young-slim-sensual-girl-gray-dress-holds-cup-coffee_613910-8711.jpg",
            youText: "Imogen Hayes, Studio Lead"
          }}
          images={[
            {
              src: "https://img.b2bpic.net/free-photo/top-view-office-stationery-with-laptop-paper-clips_23-2148524862.jpg",
              alt: "office stationery with laptop and paper clips"
            },
            {
              src: "https://img.b2bpic.net/free-photo/minimal-modern-vases-books_23-2149681086.jpg",
              alt: "minimal modern vases and books"
            },
            {
              src: "https://img.b2bpic.net/free-photo/nice-wooden-chair-with-comfy-cushions_181624-30169.jpg",
              alt: "nice wooden chair with comfy cushions"
            },
            {
              src: "https://img.b2bpic.net/free-photo/white-business-center-with-beautiful-textures-unique-design-with-interior-staircases_181624-5365.jpg",
              alt: "white business center with interior staircases"
            }
          ]}
        />
      </div>

      <div id="services" data-webild-section="FeaturesToolStackList" data-webild-section-id="FeaturesToolStackList-1" data-section="services">
        <FeaturesToolStackList
          titleQuiet="Studio Vale"
          title="Digital design with editorial poise"
          toolsLabel="Studio design stack"
          tools={[
            {
              name: "Figma",
              icon: "Figma"
            },
            {
              name: "Typography",
              icon: "Type"
            },
            {
              name: "Code",
              icon: "Code2"
            },
            {
              name: "Grid Systems",
              icon: "Grid"
            },
            {
              name: "Color",
              icon: "Palette"
            },
            {
              name: "Performance",
              icon: "Gauge"
            }
          ]}
          items={[
            {
              title: "Custom Website Design",
              description: "Bespoke visual layouts tailored to your brand identity.",
              icon: "Layout",
              href: "#contact-booking-card"
            },
            {
              title: "Website Development",
              description: "Clean, performance-focused code with fine typographic detail.",
              icon: "Code2",
              href: "#contact-booking-card"
            },
            {
              title: "Website Hosting & Care",
              description: "Managed infrastructure ensuring your site remains secure and fast.",
              icon: "Server",
              href: "#pricing"
            },
            {
              title: "Digital Publications & Media",
              description: "Editorial projects and digital publications designed for screen.",
              icon: "BookOpen",
              href: "#work"
            }
          ]}
        />
      </div>

      <div id="work" data-webild-section="GalleryCardHandGrid" data-webild-section-id="GalleryCardHandGrid-1" data-section="work" data-scene data-gallery>
        <GalleryCardHandGrid
          titleQuiet="Our work"
          title="Selected concepts"
          items={[
            {
              title: "Architectural Studio",
              category: "Architecture Design",
              imageSrc: "https://img.b2bpic.net/free-photo/rendering-elegant-neoclassical-interior_23-2151059663.jpg",
              imageAlt: "Rendering of elegant neoclassical interior",
              href: "#contact-booking-card"
            },
            {
              title: "Editorial Magazine",
              category: "Editorial Publication",
              imageSrc: "https://img.b2bpic.net/free-photo/elegant-desk-composition-flat-lay_23-2148975801.jpg",
              imageAlt: "elegant desk stationery composition",
              href: "#contact-booking-card"
            },
            {
              title: "Artisan Goods",
              category: "Artisan E-Commerce",
              imageSrc: "https://img.b2bpic.net/free-photo/modern-entranceway-with-furniture-home-decor_23-2150831957.jpg",
              imageAlt: "Modern entranceway with furniture and home decor",
              href: "#contact-booking-card"
            },
            {
              title: "Boutique Advisory",
              category: "Consulting Services",
              imageSrc: "https://img.b2bpic.net/free-photo/desktop-with-laptop-mobile-phone_23-2148128807.jpg",
              imageAlt: "Desktop with laptop and mobile phone",
              href: "#contact-booking-card"
            },
            {
              title: "Design Atelier",
              category: "Spatial Atelier",
              imageSrc: "https://img.b2bpic.net/free-photo/ai-generated-modern-styled-entryway_23-2150692187.jpg",
              imageAlt: "Ai generated of modern styled entryway",
              href: "#contact-booking-card"
            },
            {
              title: "Digital Gallery",
              category: "Digital Portfolio",
              imageSrc: "https://img.b2bpic.net/free-photo/high-angle-desk-concept-with-copy-space_23-2148459729.jpg",
              imageAlt: "desk with laptop and decor",
              href: "#contact-booking-card"
            }
          ]}
          viewAll={{
            text: "Explore all work",
            href: "#contact-booking-card"
          }}
        />
      </div>

      <div id="process-pill-steps" data-webild-section="ProcessPillSteps" data-webild-section-id="ProcessPillSteps-1" data-section="process-pill-steps">
        <ProcessPillSteps
          titleQuiet="The journey"
          title="From vision to launch"
          descriptionLead="A clear four-phase progression"
          description="Focused on strategic alignment, refined editorial design, and seamless execution for your brand's digital presence."
          items={[
            {
              title: "Discover",
              description: "We define strategic goals, content structure, and visual direction through an initial deep-dive discussion.",
              icon: "Compass"
            },
            {
              title: "Design",
              description: "We craft custom editorial layouts and typography systems tailored specifically to your brand identity.",
              icon: "Palette"
            },
            {
              title: "Refine",
              description: "Collaborative feedback rounds ensure every page, interaction, and mobile view meets our shared standard.",
              icon: "Sliders"
            },
            {
              title: "Launch",
              description: "We deploy your completed website, establish domain connections, and initialize managed hosting and care.",
              icon: "Rocket"
            }
          ]}
          ariaLabel="Our four-step process"
        />
      </div>

      <div id="pricing" data-webild-section="PricingTiltedCard" data-webild-section-id="PricingTiltedCard-1" data-section="pricing">
        <PricingTiltedCard
          titleQuiet="Investment."
          title="Transparent project rates."
          noteLead="Clear upfront pricing."
          note="Project scopes confirmed before any design work begins. No hidden charges."
          pitch={{
            badge: "Studio Care",
            quiet: "Ongoing support,",
            text: "managed hosting and maintenance.",
            status: "Available for all projects",
            title: "Managed care plan",
            description: "Ongoing managed hosting and maintenance at $50/month after your first 30 complimentary days."
          }}
          plan={{
            name: "Design & Setup",
            descriptionLead: "Custom website build.",
            description: "Complete initial website design and development with the first 30 days of hosting included.",
            price: "$500",
            period: "one-time setup",
            features: [
              "Custom website design",
              "Mobile responsive build",
              "Search engine setup",
              "30 days hosting included"
            ],
            cta: {
              text: "Start a project",
              href: "#contact-booking-card"
            }
          }}
          altPlan={{
            name: "Ongoing Care",
            descriptionLead: "Managed monthly care.",
            description: "Required ongoing managed hosting and maintenance following the complimentary setup period.",
            features: [
              "$50 per month rate",
              "Managed hosting & care",
              "Security monitoring",
              "Cancelable per agreement"
            ],
            cta: {
              text: "Inquire now",
              href: "#contact-booking-card"
            }
          }}
        />
      </div>

      <div id="testimonial-quote-grid-1" data-webild-section="TestimonialQuoteGrid" data-webild-section-id="TestimonialQuoteGrid-1" data-section="testimonial-quote-grid-1">
        <TestimonialQuoteGrid
          titleQuiet="Client perspectives"
          title="on studio design."
          proofLabel="Client feedback"
          items={[
            {
              quote: "Studio Vale transformed our digital identity with incredible poise. The generous spacing and quiet aesthetic allowed our work to truly shine.",
              highlight: "allowed our work to truly shine.",
              name: "Chloe Brooks",
              role: "Boutique Owner",
              imageSrc: "https://img.b2bpic.net/free-photo/high-angle-modern-woman-talking-mobile_23-2148415912.jpg",
              imageAlt: "High angle modern woman talking at mobile"
            },
            {
              quote: "Working with Studio Vale felt like collaborating with a high-end design magazine. Every layout decision was intentional and refined.",
              highlight: "intentional and refined.",
              name: "Jordan Walsh",
              role: "Creative Director",
              imageSrc: "https://img.b2bpic.net/free-photo/freaky-guy-sunglasses-white-shirt-holds-film-camera-grey-background_613910-9405.jpg",
              imageAlt: "Freaky guy in sunglasses and white shirt holds film camera over grey background."
            },
            {
              quote: "Their focus on essential typography and uncluttered structure gave our publication the calm authority we had been searching for.",
              highlight: "calm authority",
              name: "Holly Turner",
              role: "Independent Publisher",
              imageSrc: "https://img.b2bpic.net/free-photo/happy-pretty-woman-cafe-talking-phone_1262-14968.jpg",
              imageAlt: "Happy pretty woman in cafe talking on phone"
            },
            {
              quote: "The seamless process from discovery to launch was refreshingly clear. Our site now feels both contemporary and timeless.",
              highlight: "contemporary and timeless.",
              name: "Connor Shaw",
              role: "Founder, Modern Atelier",
              imageSrc: "https://img.b2bpic.net/free-photo/young-executive-working-with-his-laptop_23-2147577258.jpg",
              imageAlt: "Young executive working with his laptop"
            },
            {
              quote: "Studio Vale captured our vision effortlessly. The editorial aesthetic creates an engaging experience without unnecessary distractions.",
              highlight: "engaging experience",
              name: "Imogen Hayes",
              role: "Gallery Owner",
              imageSrc: "https://img.b2bpic.net/free-photo/young-woman-organizing-live-shop_23-2149947439.jpg",
              imageAlt: "Young woman organizing live shop"
            },
            {
              quote: "The balance of negative space and crisp typography elevated our online presence beyond expectations.",
              highlight: "elevated our online presence",
              name: "Jacob Morales",
              role: "Architectural Designer",
              imageSrc: "https://img.b2bpic.net/free-photo/young-designer-looking-sheet-holding-it-his-hand-while-sitting-table-front-laptop-caucasian-creativ-artist_482257-30712.jpg",
              imageAlt: "Young designer looking at a sheet holding it in his hand while sitting at the table in front of a laptop. Caucasian creativ artist"
            }
          ]}
        />
      </div>

      <div id="contact-booking-card" data-webild-section="ContactBookingCard" data-webild-section-id="ContactBookingCard-1" data-section="contact-booking-card">
        <ContactBookingCard
          title="Let's Build Something Elegant"
          fields={{
            name: "Full Name",
            email: "Email Address",
            message: "Tell us about your project"
          }}
          submitText="Send Inquiry"
          successText="Thank you. We will respond within 24 business hours."
          cardTitle="Schedule a Creative Call"
          cta={{
            text: "Email Us Directly",
            href: "mailto:hello@studiovale.com"
          }}
        />
      </div>
    </>
  );
}
