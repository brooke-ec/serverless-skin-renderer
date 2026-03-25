import Canvas, { EmulatedCanvas2D, Image } from "https://deno.land/x/canvas@v1.4.2/mod.ts";

export default function avatar(src: Image, scale: number): EmulatedCanvas2D {
	const size = Math.round(8 * scale);
	const canvas = Canvas.MakeCanvas(size, size);
	const ctx = canvas.getContext("2d")!;

	ctx.imageSmoothingEnabled = false;

	// Base head front face (8x8 at x:8, y:8) scaled to output size.
	ctx.drawImage(src, 8, 8, 8, 8, 0, 0, size, size);
	// Hat front face overlay (8x8 at x:40, y:8) composited on top.
	ctx.drawImage(src, 40, 8, 8, 8, 0, 0, size, size);

	return canvas;
}
