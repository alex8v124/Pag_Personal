"use server";

import { generateProfilePicture, GenerateProfilePictureInput } from "@/ai/flows/generate-profile-picture";

export async function generateImageAction(input: GenerateProfilePictureInput): Promise<{ profilePictureUri?: string; error?: string; }> {
  try {
    const result = await generateProfilePicture(input);
    return { profilePictureUri: result.profilePictureUri };
  } catch (e) {
    console.error(e);
    const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
    return { error: `Failed to generate image: ${errorMessage}` };
  }
}
