"use server";

export const saveWedding = async (formData:FormData) => {
    const data = Object.fromEntries(formData.entries())
    console.log("ACTION")
    console.log(`${data} Save from action`)
}