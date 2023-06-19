export function authUse(token: string | null) {
  if(typeof token as string){
    return true
  } else {
    return false
  }
}
