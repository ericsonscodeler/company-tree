import { useParams, useLocation } from "react-router-dom";
import { useQuery } from 'react-query';
import { Input } from "../Components/Input";
import { IAsset, ILocation, ITreeNode } from "../types";
import { buildTree } from "../utils/buildTree";
import { Tree } from "../components/Tree";
import { useEffect, useState } from "react";
import { Details } from "../components/Details";

import Bolt from '../assets/Bolt.svg';
import Critice from '../assets/Critice.svg';
import { filterByName } from "../utils/filterByName";

export const Company = () => {
  const { id } = useParams();
  const location = useLocation();
  const name = location.state?.name;

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [treeData, setTreeData] = useState<ITreeNode[]>([]);
  const [selectedNode, setSelectedNode] = useState<ITreeNode | undefined>(undefined);
  const [filterType, setFilterType] = useState<string | null>(null);

  const applyFilters = (nodes: ITreeNode[]): ITreeNode[] => {
    const filterTree = (node: ITreeNode): ITreeNode | null => {
    const passesFilter = !filterType || 
                         (filterType === 'energySensors' && node.sensorType === 'energy') || 
                         (filterType === 'criticalStatus' && node.status === 'alert');
    const filteredChildren = node.children ? node.children.map(filterTree).filter(child => child !== null) : [];

    if (passesFilter || filteredChildren.length > 0) {
      return {
        ...node,
        children: filteredChildren as ITreeNode[],
      };
    }
    return null;
  };

  return nodes.map(filterTree).filter(node => node !== null) as ITreeNode[];
};

  const handleNodeSelect = (node: ITreeNode) => {
    setSelectedNode(node);
  };

  const { isLoading: loadingLocations, error: errorLocations, data: dataLocations } = useQuery<ILocation[]>(
    `treeDataLocation${name}`, 
    () => fetch(`http://fake-api.tractian.com/companies/${id}/locations`).then(res => res.json())
  );

  const { isLoading: loadingAssets, error: errorAssets, data: dataAssets } = useQuery<IAsset[]>(
    `treeDataAssets${name}`,
    () => fetch(`http://fake-api.tractian.com/companies/${id}/assets`).then(res => res.json())
  );

  useEffect(() => {
    if (dataLocations && dataAssets) {
      const allTreeData = buildTree(dataLocations, dataAssets);
      const filteredByName = filterByName(allTreeData, searchTerm);
      const filteredTreeData = applyFilters(filteredByName);

      setTreeData(filteredTreeData);
    }
  }, [searchTerm, filterType, dataLocations, dataAssets]);

  const handleFilterChange = (type: string) => {
    setFilterType(prevType => prevType === type ? null : type);
  };

  const handleSearchTermChange = (term: string) => {
    setSearchTerm(term);
  };

  const FilterButton = ({ icon, label, filterKey }: { icon: string, label: string, filterKey: string }) => (
      <div className={`flex w-40 h-10 border ${filterType === filterKey ? 'border-blue-700 bg-blue-200' : 'border-gray-200'} rounded-md items-center`}>
        <img src={icon} alt={label} className="ml-3" />
        <button 
          type="button"
          className="flex-1 font-inter text-sm font-semibold leading-5 text-center"
          onClick={() => handleFilterChange(filterKey)}
        >
          {label}
        </button>
    </div>
  );

  return (
    <div>
      <div className="flex flex-row p-5 items-center justify-between w-full">
        <div>
          <span className="text-2xl">Ativos /</span>
          <span className="text-base ml-2 mt-1">{name}</span>
        </div>
        <div className="flex flex-row space-x-2">
          <FilterButton icon={Bolt} label="Sensor de Energia" filterKey="energySensors" />
          <FilterButton icon={Critice} label="Crítico" filterKey="criticalStatus" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full h-full p-4 bg-gray-300">
        <div className="w-full h-full p-4 bg-white border border-sky-500">
          <Input searchTerm={searchTerm} setSearchTerm={handleSearchTermChange} />
          {loadingLocations || loadingAssets ? 
            <p>Loading...</p> : errorLocations || errorAssets ? 
            <p>Erro ao carregar dados</p> : 
            <Tree nodes={treeData} onNodeSelect={handleNodeSelect} />}
        </div>
        <div className="w-full h-full bg-white border border-sky-500">
          {selectedNode ? <Details node={selectedNode} /> : 
          <div className="flex justify-center items-center w-full h-full">
            <p>Selecione um componente para ver os detalhes</p>
          </div>}
        </div>
      </div>
    </div>
  );
};
