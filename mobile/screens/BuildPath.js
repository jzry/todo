const hostname = 'cop4331-test123.herokuapp.com';

function BuildPath(route) {
    if (process.env.NODE_ENV === 'production') {
        return `https://${hostname}/${route}`;
    }      
    
    return `http://localhost:8090/${route}`;
}

export default {
    BuildPath: BuildPath
}