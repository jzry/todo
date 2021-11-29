const hostname = 'cop4331-test123.herokuapp.com';

function buildPath(route) {
    if (process.env.NODE_ENV === "production") {
        return `https://${hostname}/${route}`;
    }   

    return `http://localhost:8080/${route}`;
}

export default {
    buildPath: buildPath
}