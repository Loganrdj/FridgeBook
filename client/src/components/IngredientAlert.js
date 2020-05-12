import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';

function IngredientAlert(props) {
  const [show, setShow] = useState(true);
  const remain = props.remain;
  let variant = "info";
  let msg = " will expire in "+props.remain+" day(s)!";
  if (remain >= 1 && remain <= 2) variant = "info";
  if (remain === 0) {variant = "warning"; msg="will expire today!"}
  if (remain < 0) {variant = "danger"; msg="is expired!";}
  if (show && remain<=2) {
    return (
      <Alert variant={variant} onClose={() => setShow(false)} dismissible>
        {/* <Alert.Heading>Oh snap! You got an error!</Alert.Heading> */}
    <p>{props.item.name} {msg}</p>
      </Alert>
    );
  }
  return null;
}

export default IngredientAlert;