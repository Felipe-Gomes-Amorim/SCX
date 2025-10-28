import { useState } from "react";

export function NotificationItem({ item, navigate }) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => setExpanded(prev => !prev);

  return (
    <div style={{ marginBottom: "5px" }}>
      <p
        style={{ cursor: "pointer", margin: 0 }}
        onClick={toggleExpand}
      >
        {item.title || item.message || "Sem título"}
      </p>
      {expanded && (
        <div style={{ padding: "5px 10px", backgroundColor: "#f0f0f0", borderRadius: "5px", marginTop: "2px" }}>
          {item.description || item.message || "Sem descrição"}
          <br />
          
        </div>
      )}
    </div>
  );
}
