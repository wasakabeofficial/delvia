import {
  About,
  FeaturesBenefits,
  Gallery,
  Header,
  Services,
  ContactoSection,
  TestimoniosSection,
} from "../sections";

export default function Home() {
  return (
    <main>
      <Header />
      <About />
      <Services />
      <FeaturesBenefits />
      <Gallery />
      <TestimoniosSection />
      <ContactoSection />
    </main>
  );
}
