// import { tasks } from '../../config';

import dataSynchronization from './data-synchronizer';

export default function setupTasks() {
  setTimeout(dataSynchronization, 0);

  console.log('Successfully set-up the tasks.');
}
