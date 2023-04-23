import { FaceReference, Vector2, Vector3, all_faces } from "./mod.ts";
import { cutout } from "./helpers.ts";
import {
	CanvasImageSource,
	CanvasRenderingContext2D,
} from "https://deno.land/x/canvas@v1.4.1/mod.ts";

const skew_a = 26 / 45;
const skew_b = skew_a * 2;

export type RenderCubeSettings = {
	rendered_faces?: FaceReference[];
	texture_origin: Vector2;
	position: Vector2;
	uv_size?: Vector3;
	flipped?: boolean;
	scale: number;
	size: Vector3;
};

export default function render_cube(
	ctx: CanvasRenderingContext2D,
	src: CanvasImageSource,
	{
		scale,
		position: [x, y],
		size: [width, height, depth],
		texture_origin: [texture_x, texture_y],
		uv_size: [uv_width, uv_height, uv_depth] = [width, height, depth],
		rendered_faces = all_faces,
		flipped = false,
	}: RenderCubeSettings,
) {
	// right
	if (rendered_faces.includes("r")) {
		ctx.setTransform(1, skew_a, 0, skew_b, 0, 0);
		ctx.drawImage(
			cutout(src, texture_x, texture_y + uv_depth, uv_depth, uv_height, flipped),
			x + scale * width,
			y - scale * width,
			depth * scale,
			height * scale,
		);
	}

	// back
	if (rendered_faces.includes("b")) {
		ctx.setTransform(1, -skew_a, 0, skew_b, 0, 0);
		ctx.drawImage(
			cutout(
				src,
				texture_x + uv_depth * 2 + uv_width,
				texture_y + uv_depth,
				uv_width,
				uv_height,
				true !== flipped,
			),
			x,
			x + y,
			width * scale,
			height * scale,
		);
	}

	// down
	if (rendered_faces.includes("d")) {
		ctx.setTransform(1, -skew_a, 1, skew_a, 0, 0);
		ctx.drawImage(
			cutout(src, texture_x + uv_depth + uv_width, texture_y, uv_width, uv_depth, flipped),
			-0.5 - y - height * scale + 0.5,
			x + y + height * scale - 0.5,
			width * scale + 1,
			depth * scale + 0.5,
		);
	}

	// left
	if (rendered_faces.includes("l")) {
		ctx.setTransform(1, skew_a, 0, skew_b, 0, 0);
		ctx.drawImage(
			cutout(src, texture_x, texture_y + uv_depth, uv_depth, uv_height, flipped),
			x,
			y,
			depth * scale,
			height * scale,
		);
	}

	// up
	if (rendered_faces.includes("u")) {
		ctx.setTransform(1, -skew_a, 1, skew_a, 0, 0);
		ctx.drawImage(
			cutout(src, texture_x + uv_depth, texture_y, uv_width, uv_depth, flipped),
			-0.5 - y,
			x + y,
			width * scale - 0.3,
			depth * scale,
		);
	}

	// front
	if (rendered_faces.includes("f")) {
		ctx.setTransform(1, -skew_a, 0, skew_b, 0, 0);
		ctx.drawImage(
			cutout(src, texture_x + uv_depth, texture_y + uv_depth, uv_width, uv_height, flipped),
			x + depth * scale - 1,
			x + depth * scale + y - 1,
			width * scale + 0.4,
			height * scale + 0.8,
		);
	}
}
