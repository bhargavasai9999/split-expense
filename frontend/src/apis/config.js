let token=localStorage.getItem('jwtToken');
let config = {
  headers: {
    authorization: `Bearer ${token}`,
  },
};
export default config;
