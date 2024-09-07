import { useParams, useLocation } from "react-router-dom";
import { useQuery } from 'react-query';
import Input from "../Components/Input";
import { ILocation } from "../types";
import { buildTree } from "../utils/functionBuildTree";
import Tree from "../components/Tree";

export const Company = () => {
  const { id } = useParams();
  const location = useLocation();
  const name = location.state?.name;

  const { isLoading, error, data: dataLocations } = useQuery<ILocation[]>(
    `treeDataLocation${name}`, 
    () =>
      fetch(`http://fake-api.tractian.com/companies/${id}/locations`).then(res =>
        res.json()
      )
  );

  const treeData = dataLocations ? buildTree(dataLocations) : [];

  return (
    <div>
      <div className="flex flex-row p-5 items-center">
        <span className="text-2xl">Ativos /</span>
        <span className="text-base ml-2 mt-1">{name}</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full h-full p-4 bg-gray-300">
        <div className="w-full h-full p-4 bg-white border border-sky-500">
          <>
            <Input />
            {isLoading && <p>Loading...</p>}
            {error && <p>Error loading data</p>}
            {dataLocations && <Tree nodes={treeData} />}
          </>
        </div>
        <div className="w-full h-full p-4 bg-white border border-sky-500">
          <p>conteúdo</p>
        </div>
      </div>
    </div>
  );
};
