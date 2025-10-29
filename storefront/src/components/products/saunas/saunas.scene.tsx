import ProductHero from "../shared/product-hero";
import { ProductShowcase } from "../shared/product-showcase";
import { HealthWellbeing } from "../shared/health-wellbeing";
import { KeyConsiderations } from "../shared/key-considerations";
import ContactUs from "~/components/ui/contact-us/contact-us";
import { getSaunasPageData } from "~/lib/data/saunas-page";

export const SaunasScene = async () => {
  const { hero, showcases, healthWellbeing, keyConsiderations } = await getSaunasPageData();

  return (
    <>
      {hero && (
        <ProductHero 
          title={hero.title} 
          imagePath={hero.imageUrl}
        />
      )}
      
      <div className="h-[50px]" />
      
      {showcases.map((showcase, index) => (
        <ProductShowcase
          key={index}
          variant={showcase.variant}
          title={showcase.title}
          description={showcase.description}
          imagePath={showcase.imageUrl}
          imageAlt={showcase.title}
          showButton={showcase.showButton}
          buttonText={showcase.buttonText}
          buttonHref={showcase.buttonHref}
          openInNewTab={showcase.openInNewTab}
        />
      ))}
      
      <div className="h-[50px]" />
      
      {healthWellbeing && (
        <HealthWellbeing
          title={healthWellbeing.title}
          points={healthWellbeing.benefits}
        />
      )}
      
      <div className="h-[100px]" />
      
      {keyConsiderations && (
        <KeyConsiderations 
          introText={keyConsiderations.introText}
          hydration={keyConsiderations.hydration}
          listenToBody={keyConsiderations.listenToBody}
          healthConditions={keyConsiderations.healthConditions}
        />
      )}
      
      <div className="h-[120px]" />
      
      <ContactUs />
    </>
  );
};
