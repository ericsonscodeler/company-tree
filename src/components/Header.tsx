import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.svg'

import Gold from '../assets/Gold.svg'
import { useState } from 'react';

interface ICompany {
  id: string;
  name: string;
}

export default function Header() {
  const navigate = useNavigate();
  const [selectedCompany, setSelectedCompany] = useState<ICompany>({
    id: '',
    name: ''
  });

  const handleSelect = (company: ICompany) => {
    setSelectedCompany({
      id: company.id,
      name: company.name
    });
    navigate(`/companies/${company.id}`, { state: { name: company.name } });
  };

  const { isLoading, error, data } = useQuery<ICompany[], Error>('companies', () =>
    fetch('http://fake-api.tractian.com/companies').then(res =>
      res.json()
    )
  )
  return (
    <div className="flex content-center w-full max-h-24 py-6 bg-[#17192D]">
      <div className='flex flex-row justify-between w-full px-6'>
        <img src={Logo} alt="logo tractian" />
      {isLoading ? (
        <p className='text-white font-bold'>Carregando...</p>
      ) : data ? (
        <div className='flex flex-row space-x-4'>
          {data.map((company) => (
            <div key={company.id} className={`flex items-center justify-center w-28 h-10 ${selectedCompany.id === company.id ? 'bg-[#2188FF]' : 'bg-[#023B78]'}`}>
              <button 
                type='button' 
                className='flex items-center justify-between w-20 text-white font-inter text-base font-semibold text-center'
                onClick={() => handleSelect(company)}>
                <img key={company.id} src={Gold} />
                <span>{company.name}</span>
              </button>
            </div>
          ))}
        </div>
      ) : error ? (
        <p className='text-white font-bold'>Não foi possível carregar os dados das empresas.</p>
      ): null}
    </div>
    </div>
  )
}
