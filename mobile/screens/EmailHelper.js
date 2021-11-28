export default function (email) {
    const rexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!rexp.test(email))
        return false;

    const addrParts = email.split("@");

    if(addrParts[0].length > 64)
        return false;

    const domainParts = addrParts[1].split(".");
    if(domainParts.some(part => { return part.length > 63; }))
        return false;    
    
    return true;
}
