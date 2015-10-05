// Configs that shouldn't be in source control.
import privateConfig from './config.private';

export default {
  port: 8080,
  basePath: __dirname,
  ...privateConfig,
  maasApi: {
    baseUrl: 'http://marsweather.ingenology.com/v1'
  },
  tasks: {
    dataSynchronization: {
      period: 24 * 60 * 60 * 1000 // 24 Hours.
    }
  }
};
