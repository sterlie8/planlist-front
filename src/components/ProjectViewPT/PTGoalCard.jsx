import React, { useState } from "react";

const PTGoalCard = ({ initialGoal = "Enter your PT goal here." }) => {
  const [goal, setGoal] = useState(initialGoal);
  const [isEditing, setIsEditing] = useState(false);
  const [tempGoal, setTempGoal] = useState(goal);

  const handleSave = () => {
    setGoal(tempGoal);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempGoal(goal);
    setIsEditing(false);
  };

  return (
    <div>
      <h3>Today's Goal</h3>
      {isEditing ? (
        <div>
          <input
            value={tempGoal}
            onChange={(e) => setTempGoal(e.target.value)}
            rows={3}
            cols={40}
          />
          <div>
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      ) : (
        <div>
          <p>{goal}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default PTGoalCard;
