import { useReveal } from "../hooks/use-reveal";
import { Nav } from "../components/site/nav";
import { Hero } from "../components/site/hero";
import { About } from "../components/site/about";
import { Classes } from "../components/site/classes";
import { Online } from "../components/site/online";
import { Journey } from "../components/site/journey";
import { Certificate } from "../components/site/certificate";
import { SunSalutation } from "../components/site/sun-salutation";
import { Band, Stats } from "../components/site/stats";
import { Reviews } from "../components/site/reviews";
import { Gallery } from "../components/site/gallery";
import { Schedule } from "../components/site/schedule";
import { Faq } from "../components/site/faq";
import { DemoBooking } from "../components/site/demo-booking";
import { Booking } from "../components/site/booking";
import { Attendance } from "../components/site/attendance";
import { Footer, StickyBar } from "../components/site/footer";
import { ChatWidget } from "../components/site/chat-widget";

function Index() {
  useReveal();
  return (
    <div className="overflow-x-clip">
      <Nav />
      <main>
        <Hero />
        <About />
        <Journey />
        <Certificate />
        <Classes />
        <Online />
        <Band />
        <Stats />
        <Reviews />
        <SunSalutation />
        <Gallery />
        <Schedule />
        <DemoBooking />
        <Faq />
        <Booking />
        <Attendance />
      </main>
      <Footer />
      <StickyBar />
      <ChatWidget />
    </div>
  );
}

export default Index;
