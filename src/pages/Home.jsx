import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Hero from '../sections/Hero'
import Features from '../sections/Features'
import HowItWorks from '../sections/HowItWorks'
import Testimonials from '../sections/Testimonials'
import FooterCTA from '../components/FooterCTA'

const Home = () => {
  return (
    <div>
        <div>
            <section className='p-3'>
                <div>
                    <Navbar/>
                </div>
                <div>
                    <Hero/>
                </div>
                <div>
                    <Features/>
                </div>
                <div>
                    <HowItWorks/>
                </div>
                <div>
                    <Testimonials/>
                </div>
                <div>
                    <FooterCTA/>
                </div>
            </section>
        </div>
    </div>
  )
}

export default Home