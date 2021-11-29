const hostname = 'cop4331-test123.herokuapp.com';

function buildPath(route) {
   
    
    return `http://localhost:8080/${route}`;
}

export default {
    buildPath: buildPath
}