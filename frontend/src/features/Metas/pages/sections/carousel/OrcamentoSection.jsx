import React from 'react'
import CarouselOrcamento from './CarouselOrcamento'
import CardAndamentoMetas from './CardAndamentoMetas'

export default function OrcamentoSection() {
  return (
    <div className='flex flex-col justify-center items-center gap-8 lg:flex-row'>
        <CarouselOrcamento/>
        <CardAndamentoMetas/>
    </div>
  )
}
