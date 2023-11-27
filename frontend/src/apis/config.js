const token=localStorage.getItem('jwtToken');
const config = {
  headers: {
    authorization: `Bearer ${token}`,
  },
};
export default config;