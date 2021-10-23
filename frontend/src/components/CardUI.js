import React, { useState } from 'react';
import { Button, Card } from 'react-bootstrap';

function CardUI()
{
    var card = '';
    var search = '';

    const [message,setMessage] = useState('');
    const [searchResults,setResults] = useState('');
    const [cardList,setCardList] = useState('');

    var _ud = localStorage.getItem('user_data');    
    var ud = JSON.parse(_ud);    
    var userId = 0; // ud.id;
    var firstName = ""; // ud.firstName;    
    var lastName = ""; // ud.lastName;

    const addCard = async event =>
    {
        event.preventDefault();

        var obj = {userId:userId,card:card.value};        
        var js = JSON.stringify(obj);        

        try        
        {            
            const response = await fetch('http://localhost:5000/api/addcard',            
            {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
            var txt = await response.text();            
            var res = JSON.parse(txt);            
            
            if( res.error.length > 0 )            
            {                
                setMessage( "API Error:" + res.error );            
            }            
            else            
            {                
                setMessage('Card has been added');            
            }        
        }        
        catch(e)        
        {            
            setMessage(e.toString());        
        }
    };

    const searchCard = async event =>
    {
        event.preventDefault();
        var obj = 
        {
            userId:userId,
            search:search.value
        };

        var js = JSON.stringify(obj);        
        try        
        {            
            const response = await fetch('http://localhost:5000/api/searchcards',            
            {
                method:'POST',
                body:js,
                headers:
                {
                    'Content-Type': 'application/json'
                }
            });

            var txt = await response.text();            
            var res = JSON.parse(txt);            
            var _results = res.results;            
            var resultText = '';            
            for( var i = 0; i < _results.length; i++ )            
            {                
                resultText += _results[i];                
                if( i < _results.length - 1 )                
                {                    
                    resultText += ', ';                
                }            
            }            
            setResults('Card(s) have been retrieved');            
            setCardList(resultText);        
        }        
        catch(e)        
        {            
            alert(e.toString());            
            setResults(e.toString());        
        }    
    };

    return(
        <div id="accessUIDiv" className="app">
            <Card className="canvasCards cardItem">
                <Card.Body>
                    <input type="text" id="searchText" className="inFields" placeholder="Card To Search For" 
                        ref={(c) => search = c}/><br/>
                    <Button type="button" id="searchCardButton" className="buttonScheme"
                        onClick={searchCard}> Search Card </Button><br />
                    <span id="cardSearchResult"> {searchResults} </span>
                    <p id="cardList">{cardList}</p>
                    <input type="text" id="cardText" className="inFields" placeholder="Card To Add" 
                        ref={(c) => card = c}/><br />
                    <Button type="button" id="addCardButton" className="buttonScheme"
                        onClick={addCard}> Add Card </Button><br />
                    <span id="cardAddResult">{message}</span>
                </Card.Body>
            </Card>
        </div>
    );
}

export default CardUI;
