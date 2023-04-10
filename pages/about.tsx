import { MainLayout } from '@/components/layout';
import { NextPageWithLayout } from '@/models';

const AboutPage: NextPageWithLayout = () => {
  return (
    <div>
      This is AboutPage
    </div>
  );
}

// Muốn sử dụng MainLayout cho AboutPage
AboutPage.Layout = MainLayout

export default AboutPage;
