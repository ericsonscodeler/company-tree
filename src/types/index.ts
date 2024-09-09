export interface ICompany {
  id: string;
  name: string;
}
export interface ILocation {
  id: string;
  name: string;
  parentId?: string; 
}

export interface IAsset {
  id: string;
  name: string;
  parentId?: string; 
  locationId?: string; 
  sensorType?: string;
  sensorId?: string;
  status?: 'alert' | 'operating' ;
  gatewayId?: string;
}

export interface ITreeNode {
  id: string;
  name: string;
  type: 'location' | 'asset' | 'component';
  children?: ITreeNode[];
  status?: string; 
  sensorType?: string;
  sensorId?: string;
  gatewayId?: string; 
}