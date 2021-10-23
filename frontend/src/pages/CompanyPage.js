import React from 'react';
import Navigation from '../components/Navigation';
import Company from '../components/Company';

function CompanyPage()
{
    return(
        <div id='home' className="pageSolid">
            <Navigation />
            <Company />
        </div>
    );
}
export default CompanyPage;