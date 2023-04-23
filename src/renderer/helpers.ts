import Canvas, {
	CanvasImageSource,
	EmulatedCanvas2D,
} from "https://deno.land/x/canvas@v1.4.1/mod.ts";

export function has_transparency(src: EmulatedCanvas2D): boolean {
	const ctx = src.getContext("2d")!;
	const data = ctx.getImageData(0, 0, src.width, src.height);
	for (const pixel of data.data.filter((_, i) => (i + 1) % 4 == 0))
		if (pixel < 255) return true;
	return false;
}

function flip(src: EmulatedCanvas2D): EmulatedCanvas2D {
	const canvas = Canvas.MakeCanvas(src.width, src.height);
	const ctx = canvas.getContext("2d")!;
	ctx.scale(-1, 1);
	ctx.drawImage(src, -src.width, 0);
	return canvas;
}

export function cutout(
	src: CanvasImageSource,
	x: number,
	y: number,
	width: number,
	height: number,
	flipped?: boolean,
): EmulatedCanvas2D {
	const canvas = Canvas.MakeCanvas(width, height);
	const ctx = canvas.getContext("2d")!;
	ctx.drawImage(src, x, y, width, height, 0, 0, width, height);
	if (flipped) return flip(canvas);
	return canvas;
}
