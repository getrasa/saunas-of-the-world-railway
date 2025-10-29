import { Footer } from "./footer";
import { getFooterData } from "~/lib/data/footer";

export const FooterWrapper = async () => {
  try {
    const footerData = await getFooterData();
    return <Footer data={footerData} />;
  } catch (error) {
    console.error('Error in FooterWrapper:', error);
    // Return Footer with null data to use fallback defaults
    return <Footer data={null} />;
  }
};

