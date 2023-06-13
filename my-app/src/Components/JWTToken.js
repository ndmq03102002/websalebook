export const IsLogged = () => GetToken() !== null;
export const GetToken = () => localStorage.getItem("jwt_token");
export const SetToken = (account) => {
    localStorage.setItem("user_role",account.role); 
    localStorage.setItem("jwt_token", account.jwt);
}
export const ClearToken = () => {
    localStorage.clear();
}
export const GetRole=()=> localStorage.getItem("user_role")
