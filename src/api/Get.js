import { Axios } from './Axios';

export const AxiosGet = (callbackFunction) => {
  const { getData } = callbackFunction;

  Axios.get(`/api/map`)
    .then((res) => {
      console.log(res);
      getData(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
};
