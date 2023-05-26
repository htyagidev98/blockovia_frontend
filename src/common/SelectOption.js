import React  from 'react';
import './SelectOption.css';

const SelectOption = (props) => {
  console.log('props', props)
  

  return (
    <div className="selectWrapper">
      {props.showSelect  && (
        <div>
          <select name="" id="" onChange={props.optionChange}>
            <option>Select </option>
            {props.data?.map((curElm) => (
              <option value={curElm._id} key={curElm._id}>
                {curElm.title}
              </option>
            ))}
          </select>
        </div>
      )}
     
    </div>
  );
};

export default SelectOption;











