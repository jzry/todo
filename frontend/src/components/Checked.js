import React from 'react';
import { IoMdCheckmarkCircleOutline } from'react-icons/io';
import { MdOutlineRadioButtonUnchecked } from 'react-icons/md';

function Checked(props)
{
    if(props.checked === 'checked'){
        return(
            <IoMdCheckmarkCircleOutline />
        );
    }
    else {
        return (
            <MdOutlineRadioButtonUnchecked />
        )

    }
}
export default Checked;