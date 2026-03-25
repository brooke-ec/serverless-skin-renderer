import Canvas, { EmulatedCanvas2D, Image } from "https://deno.land/x/canvas@v1.4.2/mod.ts";
import render_bodypart from "../helpers/bodypart.ts";

export default function head(src: Image, scale: number): EmulatedCanvas2D {
	const head_width = Math.round(19 * scale);
	const head_height = Math.round(19 * scale);
	const canvas = Canvas.MakeCanvas(head_width, head_height);
	const ctx = canvas.getContext("2d")!;

	ctx.imageSmoothingEnabled = false;

	// Render head with optional hat overlay
	render_bodypart(ctx, src, {
		scale,
		size: [8, 8, 8],
		position: [1.5 * scale, 3.25 * scale],
		texture_origin: [0, 0],
		overlay_origin: [32, 0],
		rendered_faces: ["f", "l", "u"],
	});

	return canvas;
}
