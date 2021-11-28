const hostname = 'cop4331-test123.herokuapp.com';

function BuildPath(route) {
    return `https://${hostname}/${route}`;
}

export default {
    BuildPath: BuildPath
}