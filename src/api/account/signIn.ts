import axios from 'axios';

const signInApi = async (username: string, password: string) => {
  const authMsUrl = process.env.NEXT_PUBLIC_AUTH_MS_URL;
  const acceptHeader = process.env.NEXT_PUBLIC_AUTH_MS_ACCEPT_HEADER;

  const url = `${authMsUrl}/account/signin`;
  const data = { username, password };
  const headers = { Accept: acceptHeader };

  return axios.post(url, data, { headers });
};

export default signInApi;
