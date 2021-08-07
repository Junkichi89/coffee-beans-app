import axios from 'axios';

const register = async (req, res) => {
  const headers = {
    'Content-Type': 'application/json; charset=utf-8',
    'X-WRITE-API-KEY': process.env.NEXT_PUBLIC_WRITE_API_KEY
  }

  await axios
    .post(`https://post-app.microcms.io/api/v1/recipe/`, req.body, { headers })
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
};

export default register;
