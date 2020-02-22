
import React from 'react';

const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}
export default function DisplayErrors(props) {
    var message = null;
    if(props.errors){
        message = capitalize(props.errors.message);
    }
    return message?<p className="error">{message}</p>: null;
}