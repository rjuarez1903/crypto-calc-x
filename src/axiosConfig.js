import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3/', // URL base de CoinGecko API
  timeout: 5000, // Ajusta el tiempo límite según tus necesidades
});

instance.interceptors.request.use(
  (config) => {
    // Aquí puedes modificar la configuración de la solicitud si es necesario
    // Por ejemplo, añadir headers de autenticación si los necesitas en el futuro
    return config;
  },
  (error) => {
    // Maneja los errores de solicitud
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    // Manipula respuestas aquí si es necesario, por ejemplo, para manejar errores específicos del API
    return response;
  },
  (error) => {
    // Maneja los errores de respuesta
    return Promise.reject(error);
  }
);

export default instance;
