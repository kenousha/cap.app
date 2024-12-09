import React, { useState } from "react";

function Feedback ({onSubmit}) {
 const [name, setName] = useState("");
 const [review, setReview] = useState("");
 const [rating, setRating] = useState("");
 const [showWarning, setShowWarning] = useState(false);

const handleNameChange = (e) => {
    const value = e.target.value;
    e.preventDefault();
    setName(value);
}

const handleReviewChange = (e) => {
    const value = e.target.value;
    e.preventDefault();
    setReview(value);
}

const handleFormSubmit = (e) => {
      e.preventDefault();
      if (name && review && rating ) { 
        setShowWarning(false);
        onSubmit({review});
      } else {
        setShowWarning(true);
      }
    };

return (
<form className="feedbackForm" onSubmit={handleFormSubmit} style={{overflow:'auto'}}>
{showWarning && <p className="warning">Please fill out all fields.</p>}
<h2 style={{fontSize:'20px'}} >Give Your Feedback</h2>
    <div className="form-group">
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" value={name} onChange={handleNameChange}/>
    </div>
                                    
    <div>
        <label htmlFor="review">Review:</label>
        <textarea type="text" id="review" value={review} onChange={handleReviewChange}/>
    </div>

    <div className='rating'>
        <label >Rating:</label>
        <div className='starrating'>
        {[5, 4, 3, 2, 1].map((star) => (
            <React.Fragment key={star}>
              <input
                type="radio"
                name="rating"
                id={`star${star}`}
                value={star}
                onChange={(e) => setRating(e.target.value)}
              />
              <label htmlFor={`star${star}`} className="fa fa-star star" />
            </React.Fragment>
          ))}
        </div>
    </div>
    <button className="feedback-btn" type="submit" >Submit</button>
</form>
)};
 export default Feedback;