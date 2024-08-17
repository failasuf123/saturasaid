import { formSchema } from "./FormSchema";

const saveWeddingClient = async (formData: FormData) => {
  const data = Object.fromEntries(formData.entries());
  console.log("ACTION");
  console.log(data, "Save from action");

  const convertedData = {
    ...data,
    id: data.id as string, // Ensure id is passed as a string
    time: new Date(data.time as string),
    time2: new Date(data.time as string),
    introductionType: parseInt(data.introductionType as string, 10),
    greetingType: parseInt(data.greetingType as string, 10),
    hookMiddleType: parseInt(data.hookMiddleType as string, 10),
    storyType: parseInt(data.storyType as string, 10),
    closingType: parseInt(data.closingType as string, 10),
    songType: parseInt(data.songType as string, 10),
    isEvent2: data.isEvent2 === 'true' ? true : data.isEvent2 === 'false' ? false : undefined

  };

  const validatedFields = formSchema.safeParse(convertedData);

  if (!validatedFields.success) {
    console.log("Validation failed:", validatedFields.error.flatten().fieldErrors);
    return {
      error: validatedFields.error.flatten().fieldErrors
    };
  }

  try {
    console.log("Validation succeeded, saving to database...");
    const response = await fetch('/api/saveWeddingData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validatedFields.data),
    });

    if (!response.ok) {
      console.log('failed to save data');
      throw new Error('Failed to save data');
    }

    const result = await response.json();
    console.log("Data successfully saved to the database.", result);
    return result; // Ensure the result is returned to use the saved id
  } catch (error) {
    console.error("Error saving data to the database:", error);
  }

  console.log("Validated Data:", validatedFields.data);
};

export { saveWeddingClient };
