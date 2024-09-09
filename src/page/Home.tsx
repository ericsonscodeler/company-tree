import { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { ICompany } from "../types";

export const Home = () => {
    const navigate = useNavigate();
    const [selectedCompany, setSelectedCompany] = useState<ICompany | null>(null);

    const { isLoading, error, data } = useQuery<ICompany[], Error>('companies', () =>
    fetch('http://fake-api.tractian.com/companies').then(res => res.json()))

    const handleSelect = (company: ICompany) => {
        setSelectedCompany({
      id: company.id,
      name: company.name
    });
        navigate(`/companies/${company.id}`, { state: { name: company.name } });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-2xl font-semibold mb-6">Selecione uma Empresa</h1>
        <div className='flex flex-row space-x-4'>
            {data && data.slice(0, 3).map((company) => (
            <div 
                key={company.id} 
                className={`flex items-center justify-center w-28 h-10 ${selectedCompany?.id === company.id ? 'bg-[#2188FF]' : 'bg-[#023B78]'}`}
            >
                <button
                    type='button'
                    className='flex items-center justify-center w-20 text-white font-inter text-base font-semibold text-center'
                    onClick={() => handleSelect(company)}
                >
                <span>{company.name}</span>
                </button>
            </div>
            ))}
        </div>
        </div>
    );
}