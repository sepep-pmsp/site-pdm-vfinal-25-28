import React from 'react'
import LocalizacaoIcon from '@/assets/svg/localizacao.svg'
import TelefoneIcon from '@/assets/svg/telefone.svg'

export default function ContatosFooter() {
  return (
    <div className='flex flex-col gap-4'>
      <div>
        <p className='text-[23px]'>Contatos:</p>
      </div>
      <div className='flex flex-col gap-4'>
        <div className='flex items-center gap-4 w-80'>
            <img src={LocalizacaoIcon} alt="" />
            <p>Viaduto do Chá, 15 - Centro Histórico de São Paulo - SP, 01007-040</p>
        </div>
        <div className='flex items-center gap-4 w-80'>
            <img src={TelefoneIcon} alt="" />
            <p>0800-123456</p>
        </div>
      </div>
    </div>
  )
}
