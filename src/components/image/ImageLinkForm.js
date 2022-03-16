import React from "react";
import "./ImageLinkForm.css";

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div>
      <p className="f3 pv4">
        {
          "This Smart Ape will detect faces in your pictures, so give it a try! All you need to do is paste an URL of a picture, that has a human face."
        }
      </p>
      <div className="center">
        <div className="form center pa2 ba b--black-20 br3 shadow-5">
          <input
            className="f4 pa1 bn br2 w-70 center"
            type="text"
            placeholder="Enter URL"
            onChange={onInputChange}
          />
          <button
            className="w-20 mh3 grow f4 b bn br2 link ph3 pv2 dib light-purple bg-light-yellow"
            onClick={onButtonSubmit}
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
