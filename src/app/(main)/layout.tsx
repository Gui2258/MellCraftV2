import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import MobileTabBar from '@/components/layout/mobile-tab-bar'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main style={{ flex: 1 }}>{children}</main>
      <Footer />
      <MobileTabBar />
    </>
  )
}
