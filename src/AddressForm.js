import React from 'react';

const Addressform = (addressType, firstName, lastName, addressLine1, addressLine2, zip, state, city) => (
    <form onSubmit={(e) => onSaveAddress(addressType, e)}>
            <label htmlFor={`firstName`}>FirstName</label>
            <input type="text" name={`firstName`} value={firstName} onChange = {onChange}/>
            <br/>
            <label htmlFor={`lastName`}>LastName</label>
            <input type="text" name={`lastName`} value={lastName} onChange = {onChange}/>
            <br/>
            <label htmlFor={`addressLine1`}>address Line1</label>
            <input type="text" name={`addressLine1`} value = {addressLine1} onChange = {onChange}/>
            <br/>
            <label htmlFor={`addressLine2`}>address Line2 Optional</label>
            <input type="text" name={`addressLine2`} value = {addressLine2} onChange = {onChange}/>
            <br/>
            <label htmlFor={`zip`}>Zip Code</label>
            <input type="text" name={`zip`} value = {zip} onChange = {onChange}/>
            <br/>
            <label htmlFor={`state`}>State</label>
            <input type="text" name={`state`} value = {state} onChange = {onChange}/>
            <br/>
            <label htmlFor={`city`}>City</label>
            <input type="text" name={`city`} value = {city} onChange = {onChange}/>
            <br/>
            <button type='submit'>{`Save ${addressType}`}</button>
    </form>
)

export default Addressform;