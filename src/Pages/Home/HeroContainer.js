import React from 'react'
import Hero from './Hero'
import FeatureSection from './FeatureSection'
import CTA from './CTA'
import Testimonial from './Testimonial'

function HeroContainer() {
    return (
        <div className='py-0 my-0 space-y-0'>
            <Hero />
            <CTA />
            <FeatureSection />
            <Testimonial />
        </div>
    )
}

export default HeroContainer
