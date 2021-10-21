import React from 'react';
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import UserNavi from '../components/UserNavi';
import PageTitle from '../components/PageTitle';
import LoggedInName from '../components/LoggedInName';
import CardUI from '../components/CardUI';

const CanvasPage = () =>
{
    return(
        <div id="canvas" className="pageSolid">
            <UserNavi />
                <PageTitle />
                <LoggedInName />
                <Container fluid id="cardCont">
                    <Row>
                        <Col>
                            <Card id="searchCard" className="canvasCards">
                                <Card.Body>
                                    
                                    <CardUI />
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card id="todolistCard" className="canvasCards">
                                <Card.Body>

                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card id="otherCard" className="canvasCards">
                                <Card.Body>

                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
        </div>
    );
}

export default CanvasPage;
