const API_URL = "http://localhost:3000/api/compose";

export async function composeContext(
  userId,
  patientId,
  budget
) {
  const response = await fetch(
    API_URL,
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json"
      },
      body: JSON.stringify({
        userId,
        patientId,
        budget
      })
    }
  );

  if (!response) {
    throw new Error(
      "Failed to compose context"
    );
  }

  return response.json();
}