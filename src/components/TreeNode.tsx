import { useState } from 'react';
import { ChevronDown, ChevronUp, MapPin, Box, PackageOpen } from 'lucide-react';
import { ITreeNode } from '../types';
import ElipseGreen from '../assets/ElipseGreen.svg'
import ElipseRed from '../assets/ElipseRed.svg'

import BoltGreen from '../assets/BoltGreen.svg'
import BoltRed from '../assets/BoltRed.svg'

import Location from '../assets/Location.svg'
import Cube from '../assets/Cube.svg'
import Codepen from '../assets/Codepen.svg'

interface ITreeNodeProps {
  node: ITreeNode;
  onNodeSelect: (node: ITreeNode) => void
}

const TreeNode: React.FC<ITreeNodeProps> = ({ node, onNodeSelect }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  const getIcon = (node: ITreeNode) => {

  switch (true) {
    case node.type.includes('location'):
      return <img src={Location} alt="Location" />;
    case node.type.includes('asset'):
      return <img src={Cube} alt="Location" />;
    case node.type.includes('component'):
      return <img src={Codepen} alt="Codepn" />;
    default:
      return null;
  }
};

  return (
    <div className="ml-4">
      <div className="flex flex-row items-center space-x-2 py-2">
        {node.children && node.children.length > 0 && (
          <span onClick={toggleOpen} className="cursor-pointer">
            {isOpen ? <ChevronDown /> : <ChevronUp />}
          </span>
        )}

          <span>{getIcon(node)}</span>
          <span onClick={() => onNodeSelect(node)} className="cursor-pointer">
            {node.name}
          </span>
            {node.sensorType === 'energy' &&  node.status === 'operating'?
              <img className='mt-1' src={BoltGreen} alt=""/> :
              node.sensorType === 'energy' && node.status === 'alert' ?
              <img className='mt-1' src={BoltRed} alt=""/> : 
              node.sensorType === 'vibration' &&  node.status === 'operating'?
              <img className='mt-1' src={ElipseGreen} alt=""/> :
              node.sensorType === 'vibration' && node.status === 'alert' ?
              <img className='mt-1' src={ElipseRed} alt=""/> :
              null
            }
      </div>
      {isOpen && node.children && (
        <div className="ml-4">
          {node.children.map(childNode => (
            <TreeNode key={childNode.id} node={childNode} onNodeSelect={onNodeSelect} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeNode;