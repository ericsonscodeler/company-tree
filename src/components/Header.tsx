import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.svg'

import {Server} from 'lucide-react'


interface ICompany {
  id: string;
  name: string;
}

export default function Header() {
  const navigate = useNavigate();

  const { isLoading, error, data } = useQuery<ICompany[], Error>('companies', () =>
    fetch('http://fake-api.tractian.com/companies').then(res =>
      res.json()
    )
  )
  return (
    <div className="flex content-center w-full max-h-24 py-6 bg-[#17192D]">
      <div className='flex flex-row justify-between w-full'>
        <div>
          <img src={Logo} alt="logo tractian"/>
        </div>
          {isLoading ? (
            <p>Loading</p>
          ) : data ? (
            <div className='flex flex-row space-x-4'>
              {data.map((company) => (
                <div key={company.id} className='flex items-center justify-center w-24 h-10 bg-[#023B78]'>
                  <button 
                    type='button' 
                    className='flex items-center justify-between w-full text-white text-xs px-6'
                    onClick={() => navigate(`/companies/${company.id}`, { state: { name: company.name } })}>
                    <Server width={8} height={8}/>
                      {company.name}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p>Error</p>
          )}
      </div>
    </div>
  )
}
