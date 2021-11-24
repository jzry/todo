exports.storeToken = function ( tok )
{
    try
    {
      localStorage.setItem('token_data', tok);
    }
    catch(e)
    {
      console.log(e.message);
    }
}
exports.retrieveToken = function ()
{
    let ud;
    try
    {
      ud = localStorage.getItem('token_data');
    }
    catch(e)
    {
      console.log(e.message);
    }
    return ud;
}
