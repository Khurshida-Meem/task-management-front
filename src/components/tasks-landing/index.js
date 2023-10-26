import React, { useState } from 'react';

const Landing = () => {

    const [tasks, setTasks] = useState([]);
    const [showingData, setShowingData] = useState([]);

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
      };
      const onDragEnd = (result) => {
        if (!result.destination) return;
        if (result.destination.index === result.source.index) return;
        const data = reorder(tasks, result.source.index, result.destination.index);
        //store reordered state.
        setTasks(data);
        setShowingData(data);
      };

    return (
        <div>
            
        </div>
    );
};

export default Landing;