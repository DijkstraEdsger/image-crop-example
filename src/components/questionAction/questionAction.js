import React from "react";
import PropTypes from "prop-types";
import "./questionAction.scss";

const QuestionAction = (props) => {

  return (
    <div className="QuestionActionWrapper">
      <h2 className="HeadTitle">{props.headTitle}</h2>
      {props.image && <img className="ImageQuestionAction" src={props.image}/>}

      <span className="TextQuestion">{props.question}</span>

      <div className="ButtonsQuestionActionWrapper">
        <button className="Button Secondary P-0" onClick={props.onCancel}>
          Cancel
        </button>
        <button className="Button P-0" onClick={props.onOk}>
          Ok
        </button>
      </div>
    </div>
  );
};

QuestionAction.propTypes = {
  headTitle: PropTypes.string,
  question: PropTypes.string,
  onCancel: PropTypes.func,
  onOk: PropTypes.func,
  image: PropTypes.string
};

export default QuestionAction;
