import React, { useCallback, useState } from "react";
import { DateInput } from "@blueprintjs/datetime";
  
function Date() {
    const [dateVal, setDateVal] = useState(null);
    const handleChange = useCallback(setDateVal, []);
    const formatDate = useCallback((Date) => 
        Date.toLocaleString(), []);
  
    return (
        <center>
            <div style={{ textAlign: "center", color: "green" }}>
                <h1>GeeksforGeeks</h1>
                <h2>ReactJs Blueprint DateInput Date Formatting</h2>
            </div>
            <div style={{ width: 500 }}>
                <DateInput
                    formatDate={formatDate}
                    onChange={handleChange}
                    placeholder="mm/dd/yyyy"
                    value={dateVal}
                />
            </div>
        </center>
    );
}
  
export default Date;