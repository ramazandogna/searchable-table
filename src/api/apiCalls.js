import axios from 'axios';
import apiConfig from './apiConfig';

export const fetchUserData = async (API, USERS) => {
   try {
      const apiUrl = `${apiConfig.API}/${apiConfig.USERS}`;
      if (!apiUrl) {
         throw new Error('Geçersiz..');
      }

      const res = await axios.get(apiUrl);
      return res.data;
   } catch (error) {
      console.log('API isteği başarısız!!');
      throw Error;
   }
};

export default { fetchUserData };
