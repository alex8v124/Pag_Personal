'use server';

/**
 * @fileOverview AI flow to generate a profile picture based on an image or text prompt.
 *
 * - generateProfilePicture - A function that handles the profile picture generation process.
 * - GenerateProfilePictureInput - The input type for the generateProfilePicture function.
 * - GenerateProfilePictureOutput - The return type for the generateProfilePicture function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProfilePictureInputSchema = z.object({
  imageUri: z
    .string()
    .optional()
    .describe(
      "An optional image data URI (must include MIME type and use Base64 encoding, e.g., 'data:<mimetype>;base64,<encoded_data>') to use as a base for generating the profile picture."
    ),
  textPrompt: z
    .string()
    .optional()
    .describe('An optional text prompt to guide the AI in generating the profile picture.'),
});
export type GenerateProfilePictureInput = z.infer<typeof GenerateProfilePictureInputSchema>;

const GenerateProfilePictureOutputSchema = z.object({
  profilePictureUri: z
    .string()
    .describe('The generated profile picture as a data URI (PNG format).'),
});
export type GenerateProfilePictureOutput = z.infer<typeof GenerateProfilePictureOutputSchema>;

export async function generateProfilePicture(
  input: GenerateProfilePictureInput
): Promise<GenerateProfilePictureOutput> {
  return generateProfilePictureFlow(input);
}

const generateProfilePictureFlow = ai.defineFlow(
  {
    name: 'generateProfilePictureFlow',
    inputSchema: GenerateProfilePictureInputSchema,
    outputSchema: GenerateProfilePictureOutputSchema,
  },
  async input => {
    if (input.imageUri) {
      const {media} = await ai.generate({
        model: 'googleai/gemini-2.5-flash-image-preview',
        prompt: [
          {media: {url: input.imageUri}},
          {
            text: `Generate a professional-looking profile picture from this image. Enforce square dimensions, remove background, and enhance the subject.`,
          },
        ],
        config: {
          responseModalities: ['TEXT', 'IMAGE'],
        },
      });
      return {profilePictureUri: media!.url};
    } else if (input.textPrompt) {
      const {media} = await ai.generate({
        model: 'googleai/imagen-4.0-fast-generate-001',
        prompt: `${input.textPrompt}. Generate a professional-looking profile picture. Enforce square dimensions, remove background, and enhance the subject.`,
      });
      return {profilePictureUri: media!.url};
    } else {
      throw new Error('Either imageUri or textPrompt must be provided.');
    }
  }
);
