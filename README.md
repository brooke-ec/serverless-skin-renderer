# Serverless Skin Renderer

A serverless 3D Minecraft skin previewer, designed for [Deno Deploy](https://deno.com/deploy). Inspired by [Crafatar](https://github.com/crafatar/crafatar), built using [deno-canvas](https://deno.land/x/canvas@v1.4.2). It supports multiple different url rendering modes, shown below.

## URL Parameters

- `uuid` - The UUID of the player to render the skin of.
- `url` - The url to the skin file to render
- `slim` - If `true` the skin will be rendered with 3 pixel wide arms.
- `scale` - The scale at which to render the skin.

## Fullbody Examples

Endpoint `/full`

![Dr_ec_'s Skin](examples/full_f677f07471b04e2b8344e5e8b2b1b2ad.png) ![sectum_sempra's Skin](examples/full_153f70efa7fc4b3da54470bc28ab4f5a.png) ![Aefar's Skin](examples/full_286725ceb9e64de1a78401ff65bb6de8.png) ![jeb_'s Skin](examples/full_853c80ef3c3749fdaa49938b674adae6.png)

## Head Examples

Endpoint `/head`

![Dr_ec_'s Skin](examples/head_f677f07471b04e2b8344e5e8b2b1b2ad.png) ![sectum_sempra's Skin](examples/head_153f70efa7fc4b3da54470bc28ab4f5a.png) ![Aefar's Skin](examples/head_286725ceb9e64de1a78401ff65bb6de8.png) ![jeb_'s Skin](examples/head_853c80ef3c3749fdaa49938b674adae6.png)

## Avatar Examples

Endpoint `/avatar`

![Dr_ec_'s Skin](examples/avatar_f677f07471b04e2b8344e5e8b2b1b2ad.png) ![sectum_sempra's Skin](examples/avatar_153f70efa7fc4b3da54470bc28ab4f5a.png) ![Aefar's Skin](examples/avatar_286725ceb9e64de1a78401ff65bb6de8.png) ![jeb_'s Skin](examples/avatar_853c80ef3c3749fdaa49938b674adae6.png)
