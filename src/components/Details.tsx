import { ITreeNode } from '../types';
import ElipseGreen from '../assets/ElipseGreen.svg'
import ElipseRed from '../assets/ElipseRed.svg'

import Receptor from '../assets/Receptor.svg'
import Sensor from '../assets/Sensor.svg'
import Motor from '../assets/Motor.png'


interface DetailsProps {
  node: ITreeNode;
}

export const Details: React.FC<DetailsProps> = ({ node }) => {
  return (
   <div>
    <div className='flex flex-row items-center border w-full h-full p-5'>      
        <h1>{node.name.toUpperCase()}</h1>
        {node.status === 'operating' ? 
        <img 
        className="ml-2"
        alt='operating' src={ElipseGreen} height={8} width={8}/> 
        : node.status === 'alert' ? <img alt='alert' src={ElipseRed} height={8} width={8} className="ml-2"/> : null}
    </div>
    <div className='flex h-full w-full'>
        <img  src={Motor} className='h-56 w-80 m-6'/>
        <div className='flex flex-col m-9 h-full'>
          <div className='pb-10'>
            <h3 className='font-inter text-xl font-semibold leading-6 text-left mb-4'>Tipo de Equipamento</h3>
            <span className="font-inter text-base font-normal leading-6 text-left text-gray-500">
             Motor Eletrico
            </span>
          </div>
          <div className='pt-10'>
            <h3 className='font-inter text-xl font-semibold leading-6 text-left mb-4'>Responsáveis</h3>
            <span className="font-inter text-base font-normal leading-6 text-left text-gray-500">
              Seu texto aqui
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center m-6">
        <div className="w-full border-t border-gray-200 h-[1px]"/>
      </div>

      <div className='flex w-full p-6 space-x-80'>
        <div>
          <h4 className='font-inter text-xl font-semibold leading-6 text-left mb-4'>Sensor</h4>
          <div className='flex flex-row'>
              <img src={Sensor} alt="Sensor" />
              <span className='span className="font-inter text-base font-normal leading-6 text-left text-gray-500" ml-2'>{node.sensorId}</span>
          </div> 
        </div>
        <div>
          <h4 className='font-inter text-xl font-semibold leading-6 text-left mb-4'>Receptor</h4>
          <div className='flex flex-row'>
             <img src={Receptor} alt="Receptor" />
              <span className='span className="font-inter text-base font-normal leading-6 text-left text-gray-500" ml-2'>{node.gatewayId}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
