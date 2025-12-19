import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../AddJob.css';

const AddJob = () =>{


  return(
    <div className="url-input">
      <form>
        <label>Paste the Job Links
          <input type='url' />
        </label>
      </form>
    </div>
  ) 
}

export default AddJob;