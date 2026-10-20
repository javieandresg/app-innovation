import * as z from "zod";

export const formSchema = z.object({
	prompt: z.string().min(1, {
		message: "Image Prompt is required.",
	}),
	amount: z.string().min(1),
	resolution: z.string().min(1),
});

export const amountOptions = [
	{
		value: "1",
		label: "1 Photo",
	},
	{
		value: "2",
		label: "2 Photos",
	},
	{
		value: "3",
		label: "3 Photos",
	},
	{
		value: "4",
		label: "4 Photos",
	},
	{
		value: "5",
		label: "5 Photos",
	},
];

export const resolutionOptions = [
	{
		value: "512x512",
		label: "512x512 — Standard",
	},
	{
		value: "1024x1024",
		label: "1024x1024 — Instagram Post",
	},
	{
		value: "1280x720",
		label: "1280x720 — YouTube Thumbnail",
	},
	{
		value: "1080x1920",
		label: "1080x1920 — TikTok / Reels",
	},
	{
		value: "1200x628",
		label: "1200x628 — Facebook / Twitter",
	},
];
