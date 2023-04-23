import { Vector2, Vector3, all_faces, backfaces, frontfaces, FaceReference } from "./mod.ts";
import render_cube, { RenderCubeSettings } from "./cube.ts";
import {
	CanvasImageSource,
	CanvasRenderingContext2D,
} from "https://deno.land/x/canvas@v1.4.1/mod.ts";

const OVERLAY_SIZE = 0.5;

export type RenderBodypartSettings = {
	scale: number;
	size: Vector3;
	position: Vector2;
	texture_origin: Vector2;
	overlay_origin?: Vector2;
	rendered_faces?: FaceReference[];
	flipped?: boolean;
};

export default function render_bodypart(
	ctx: CanvasRenderingContext2D,
	src: CanvasImageSource,
	{
		size,
		scale,
		position,
		texture_origin,
		overlay_origin,
		rendered_faces = all_faces,
		flipped = false,
	}: RenderBodypartSettings,
) {
	const [width, height, depth] = size;
	const [x, y] = position;

	const rendered_frontfaces = rendered_faces.filter((face) => frontfaces.includes(face));

	const overlay_options: RenderCubeSettings | undefined = overlay_origin
		? {
				scale,
				position: [x - OVERLAY_SIZE * scale, y],
				size: [width + OVERLAY_SIZE, height + OVERLAY_SIZE, depth + OVERLAY_SIZE],
				texture_origin: overlay_origin,
				flipped: flipped,
				uv_size: size,
		  }
		: undefined;

	// Overlay Backfaces
	if (overlay_options)
		render_cube(ctx, src, {
			...overlay_options,
			rendered_faces: rendered_faces.filter((face) => backfaces.includes(face)),
		});
	// Base Layer
	render_cube(ctx, src, {
		size,
		scale,
		position,
		texture_origin,
		flipped: flipped,
		rendered_faces: rendered_frontfaces,
	});
	// Overlay Frontfaces
	if (overlay_options)
		render_cube(ctx, src, {
			...overlay_options,
			rendered_faces: rendered_frontfaces,
		});
}
