import { Image, dataURLtoFile, loadImage } from "https://deno.land/x/canvas@v1.4.1/mod.ts";
import { serve } from "https://deno.land/std@0.184.0/http/server.ts";
import render from "./renderer/mod.ts";

const BASE_TEXTURE_URL = "https://textures.minecraft.net/texture/";
const RE_HASH = /^[a-f\d]+$/;

const base_headers = {
	"Cache-Control": "max-age=31536000, immutable, public",
	"Access-Control-Allow-Origin": "*",
};

function error(status: number, reason: string) {
	return new Response(JSON.stringify({ error: reason }), {
		status: status,
		headers: { ...base_headers, "Content-Type": "application/json" },
	});
}

serve(async (request) => {
	const url = new URL(request.url);
	const hash = url.searchParams.get("hash");
	const slim = url.searchParams.get("slim") == "true";
	const scale = Number(url.searchParams.get("scale") ?? 10);

	if (isNaN(scale)) return error(400, "Search parameter 'scale' must be a valid number.");

	if (scale > 10) return error(400, "Value of 'scale' must not be greater than 10.");

	if (!hash) return error(400, "Required search parameter 'hash' was not found.");

	if (!RE_HASH.test(hash)) return error(400, "The provided hash is invalid.");

	let src: Image | undefined = undefined;
	try {
		src = await loadImage(BASE_TEXTURE_URL + hash);
	} catch {
		return error(500, "Could not fetch texture.");
	}

	// render to canvas
	const canvas = render(src, slim, scale);
	const data = dataURLtoFile(canvas.toDataURL());
	return new Response(data, {
		status: 200,
		headers: {
			...base_headers,
			"Content-Type": "image/png",
		},
	});
});
