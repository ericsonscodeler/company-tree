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
  status?: string;
  gatewayId?: string;
}

export interface ITreeNode {
  id: string;
  name: string;
  type: 'location' | 'asset' | 'component';
  children?: ITreeNode[];
  status?: string; 
  sensorType?: string;
  gatewayId?: string; 
}