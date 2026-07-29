import Hero from '../components/Hero.jsx'
import Marquee from '../components/Marquee.jsx'
import Showcase from '../components/Showcase.jsx'
import Categories from '../components/Categories.jsx'
import Reels from '../components/Reels.jsx'
import House from '../components/House.jsx'
import Testimonials from '../components/Testimonials.jsx'
import Trousseau from '../components/Trousseau.jsx'
import Faq from '../components/Faq.jsx'
import Spotlight from '../components/Spotlight.jsx'
import Bestsellers from '../components/Bestsellers.jsx'
import CraftStory from '../components/CraftStory.jsx'
import Journal from '../components/Journal.jsx'
import ShopCta from '../components/ShopCta.jsx'

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Spotlight />
      <Bestsellers />
      <Categories />
      <Showcase />
      <Reels />
      <House />
      <CraftStory />
      <Trousseau />
      <Testimonials />
      <Journal />
      <Faq />
      <ShopCta />
    </>
  )
}
