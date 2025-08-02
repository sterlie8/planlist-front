import React, { useState } from "react";
import AddExercisePopup from "./AddExercisePopup";

const WorkoutPage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedExercises, setSelectedExercises] = useState([]);

  const exerciseList = [
    { id: 1, name: "Push Ups" },
    { id: 2, name: "Squats" },
    { id: 3, name: "Plank" },
    { id: 4, name: "Jumping Jacks" }
  ];

  const handleSave = (exercise) => {
    setSelectedExercises((prev) => [...prev, exercise]);
    console.log("Added:", exercise);
  };

  return (
    <div>
        {showPopup && (
        <AddExercisePopup
          exercises={exerciseList}
          onSave={handleSave}
          onClose={() => setShowPopup(false)}
        />
      )}
      <h2>Workout Plan</h2>

      

      <ul>
        {selectedExercises.map((ex, index) => (
          <li key={index}>
            {ex.name} – {ex.sets} sets, {ex.time} min
          </li>
        ))}
      </ul>
      <button onClick={() => setShowPopup(true)}>+ Add Sets</button>
    </div>
  );
};

export default WorkoutPage;
