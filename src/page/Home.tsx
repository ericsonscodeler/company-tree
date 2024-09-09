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
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-2xl font-semibold mb-6">Selecione uma Empresa</h1>
            <div className="w-full max-w-md">
                {isLoading ? (
                    <p className="text-gray-500 text-lg text-center">Carregando...</p>
                ) : error ? (
                    <p className="text-red-500 text-lg text-center">Não foi possível carregar as empresas. Tente novamente mais tarde.</p>
                ) : data && data.length > 0 ? (
                    <div className='flex flex-row flex-wrap gap-4 justify-center'>
                        {data.slice(0, 3).map((company) => (
                            <div
                                key={company.id}
                                className={`flex items-center justify-center w-28 h-10 rounded-md ${selectedCompany?.id === company.id ? 'bg-[#2188FF]' : 'bg-[#023B78]'} transition-colors duration-300`}
                            >
                                <button
                                    type='button'
                                    className='flex items-center justify-center w-full h-full text-white font-inter text-base font-semibold'
                                    onClick={() => handleSelect(company)}
                                >
                                    <span>{company.name}</span>
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 text-lg text-center">Nenhuma empresa disponível.</p>
                )}
            </div>
        </div>
    );
}