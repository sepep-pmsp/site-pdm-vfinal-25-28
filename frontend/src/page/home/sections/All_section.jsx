import React from 'react'
import Introduction from './section-introdution/Introduction'
import NewsCarousel from './section-introdution/news/NewsCarousel'
import About from './section-about/About'
import Eixos from './section-eixos/Eixos'
import More_Info from './section-info/More_Info'
import Pdms from './pdms-anteriores/Pdms'

export default function All_section() {
  return (
    <div>
      <div>
        <Introduction />
        <NewsCarousel />
        <About />
        <Eixos />
        <More_Info />
        <Pdms />
      </div>
    </div>
  )
}
