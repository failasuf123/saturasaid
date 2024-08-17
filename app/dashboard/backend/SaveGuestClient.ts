export const saveGuestClient = async (guestData) => {
  try {
    console.log("Sending guest data to the server:", guestData);
    
    const response = await fetch('/api/saveInvitationData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(guestData),
    });

    if (!response.ok) {
      const errorDetail = await response.text();
      console.error(`Failed to save guest data: ${errorDetail}`);
      throw new Error(`Failed to save guest data: ${errorDetail}`);
    }

    const result = await response.json();
    console.log("Guest data successfully saved to the database.", result);
    return result;
  } catch (error) {
    console.error("Error saving guest data to the database:", error);
    throw error;
  }
};
