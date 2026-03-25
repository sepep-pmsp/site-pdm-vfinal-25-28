import React from 'react'
import Manutencao from '@/shared/assets/EmManutenção.jpg'

export default function EmManutenção() {
  return (
    <div className='h-full lg:h-screen'>
      <img className='w-screen' src={Manutencao} alt="Pagina em Manutenção"/>
    </div>
  )
}
