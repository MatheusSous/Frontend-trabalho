// Data exemple
//{
//   "message": "Você está autenticado",
//   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRlJBTkNJU0NPIEJSVU5PIEFMRVhBTkRSRSBHT01FUyIsImlkIjoiNjQ2Mjg2ZmRkNzBmZGZmMjUwYWM4MDZkIiwiaWF0IjoxNjg0MTc4Njg1fQ.e-eMno0vsw1FA7oneuen_kzYI2FnVDCAWmqVlz_dpvk",
//   "userId": "646286fdd70fdff250ac806d"
// }
// import { useRouter } from 'next/navigation';



// import { redirect } from 'next/navigation'
export async function authUser(
  data: any,
) {
  // const router = useRouter()
  localStorage.setItem("token", JSON.stringify(data.token));
  // redirect('/')
  // router.replace('/')
  window.location.replace('/')
  
}
