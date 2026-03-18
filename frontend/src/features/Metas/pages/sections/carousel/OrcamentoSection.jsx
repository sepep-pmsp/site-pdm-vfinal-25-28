import React from 'react'
import CarouselOrcamento from './CarouselOrcamento'
import CardAndamentoMetas from './CardAndamentoMetas'

export default function OrcamentoSection() {
  return (
    <div className='flex flex-col justify-center items-center gap-8 lg:flex-row relative lg:bottom-20'>
        <CarouselOrcamento/>
        <CardAndamentoMetas/>
    </div>
  )
}
