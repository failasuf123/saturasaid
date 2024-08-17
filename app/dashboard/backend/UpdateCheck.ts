// UpdateCheck.js

const updateCheckStatus = async (guestId, newCheckStatus) => {
    try {
      const response = await fetch(`/api/UpdateCheck/${guestId}/updateCheck`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ check: newCheckStatus }),
      });
  
      const data = await response.json();
      if (data.success) {
        console.log("Guest check status updated:", data.invitation);
      } else {
        console.error("Error updating guest check status:", data.error);
      }
    } catch (error) {
      console.error("Network error updating guest check status:", error);
    }
  };
  