import React from 'react';
import { Table } from 'react-bootstrap';

import img1 from '../images/chrimmas.png';
import img2 from '../images/quicklist.png';
import img3 from '../images/skitrip.png';

const Product = () =>
(
    <div id="productText">
        <div id="desc1">
            <h1 className="tagline3 productDesc">A complete checklist suite, engineered for ease.</h1>
            <h4 className="productDesc" >Accomplish more with flourish’s powerful tools. You can add tasks, check them off, even edit or delete them.</h4>
        </div>
        <Table>
            <tr>
                <td><img className="taskImg" src={img1} alt="To do list filled with items to get for gifts" width="30%"/></td>
                <td><img className="taskImg" src={img2} alt="List of things to do before work" width="30%"/></td>
                <td><img className="taskImg" src={img3} alt="List of things to do to prepare for a trip" width="30%"/></td>
            </tr>
        </Table>
    </div>
)

export default Product;
