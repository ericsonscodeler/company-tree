import ElipseGreen from '../assets/ElipseGreen.svg'
import ElipseRed from '../assets/ElipseRed.svg'

import BoltGreen from '../assets/BoltGreen.svg'
import BoltRed from '../assets/BoltRed.svg'

export const getSensorIcon = (sensorType: string, status: string) => {
  if (sensorType === 'energy') {
    if (status === 'operating') {
      return BoltGreen;
    } else if (status === 'alert') {
      return BoltRed;
    }
  } else if (sensorType === 'vibration') {
    if (status === 'operating') {
      return ElipseGreen;
    } else if (status === 'alert') {
      return ElipseRed;
    }
  }
  
  return null;
}