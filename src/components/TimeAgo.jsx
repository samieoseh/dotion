import React, { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";

function TimeAgo({ date, className }) {
  const [timeAgo, setTimeAgo] = useState("");

  useEffect(() => {
    setTimeout(() => {
      const ago = formatDistanceToNow(new Date(date), {
        addSuffix: false,
        includeSeconds: false,
      });
      setTimeAgo(ago);
    }, 0);

    const intervalId = setInterval(() => {
      const ago = formatDistanceToNow(new Date(date), {
        addSuffix: false,
        includeSeconds: false,
      });
      setTimeAgo(ago);
    }, 60000); // Update every minute

    return () => clearInterval(intervalId);
  }, [date]);

  return <span className={className}>{timeAgo}</span>;
}

export default TimeAgo;
