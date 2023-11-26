const getToken = () => {
    let token = document.cookie.split(";").find((c) => c.includes("Token"));
  token = token.split("=");
    let key = token[0]
    token = token[1]
    
    return {token, key}
}

module.exports = getToken;
