# CSS Extras Function Reference

Complete reference for all CSS custom functions in css-extras.

**Total functions:** 43

---

## `--negate()` [↗︎](../index.css#L19)

Negates a value (returns the negative).

### Parameters

- **`--value`** (`Number`): The value to negate.

### Returns

`Number`: The negated value.

### Example

```css
padding: --negate(1em);
/* Output: padding: -1em; */
```

---

## `--lerp()` [↗︎](../index.css#L32)

Linear interpolation between two values.

### Parameters

- **`--from`** (`Number`): Start value.
- **`--to`** (`Number`): End value.
- **`--progress`** (`Number`): Progress between 0 and 1.

### Returns

`Number`: Interpolated value.

### Example

```css
width: --lerp(100px, 200px, 0.5);
/* Output: width: 150px; */
```

---

## `--map-range()` [↗︎](../index.css#L47)

Maps a value from one range to another.

### Parameters

- **`--value`** (`Number`): Input value.
- **`--in-min`** (`Number`): Input range minimum.
- **`--in-max`** (`Number`): Input range maximum.
- **`--out-min`** (`Number`): Output range minimum.
- **`--out-max`** (`Number`): Output range maximum.

### Returns

`Number`: Mapped value.

### Example

```css
font-size: --map-range(50vw, 320px, 1920px, 14px, 24px);
/* Output: Scales font from 14px at 320px viewport to 24px at 1920px viewport */
```

---

## `--ratio()` [↗︎](../index.css#L60)

Returns the ratio of two values. Supports values with different units, unlike regular division.

### Parameters

- **`--value`** (`CalcSum`): Input value.
- **`--to-value`** (`CalcSum`): Another input value.

### Returns

`Number`: The ratio between two values.

### Example

```css
scale: --ratio(16px, 1em);
/* Output: scale: 1; (assuming 1em = 16px) */
```

---

## `--opacity()` [↗︎](../index.css#L76)

Returns a semi-transparent version of any color.

### Parameters

- **`--color`** (`Color`): The base color.
- **`--opacity`** (`Number`): Opacity value (0-100% or 0-1).

### Returns

`Color`: Color with opacity.

### Example

```css
background: --opacity(blue, 50%);
/* Output: background: rgb(0 0 255 / 0.5); */
```

---

## `--tint()` [↗︎](../index.css#L90)

Lightens a color by mixing with white.
Uses OKLab color space for perceptually uniform mixing.

### Parameters

- **`--color`** (`Color`): The base color.
- **`--amount`** (`Number`): Amount to lighten (0-100%). Default: `10%`

### Returns

`Color`: Lightened color.

### Example

```css
background: --tint(blue, 20%);
/* Output: background: oklab(0.532 -0.08 -0.192); (lighter blue) */
```

---

## `--shade()` [↗︎](../index.css#L104)

Darkens a color by mixing with black.
Uses OKLab color space for perceptually uniform mixing.

### Parameters

- **`--color`** (`Color`): The base color.
- **`--amount`** (`Number`): Amount to darken (0-100%). Default: `10%`

### Returns

`Color`: Darkened color.

### Example

```css
background: --shade(blue, 20%);
/* Output: background: oklab(0.372 -0.08 -0.192); (darker blue) */
```

---

## `--saturate()` [↗︎](../index.css#L118)

Adjusts color saturation.
Uses OKLCH color space for perceptually uniform chroma adjustment. Chroma is clamped to 0.4 for safe display.

### Parameters

- **`--color`** (`Color`): The base color.
- **`--amount`** (`Number`): Chroma multiplier. Default: `1.2`

### Returns

`Color`: Adjusted color.

### Example

```css
color: --saturate(red, 1.5);
/* Output: color: oklch(0.628 0.4 29.234); (more saturated red) */
```

---

## `--lighten()` [↗︎](../index.css#L132)

Adjusts color lightness.
Uses OKLCH color space for perceptually uniform lightness adjustment. Maintains chroma independently.

### Parameters

- **`--color`** (`Color`): The base color.
- **`--amount`** (`Number`): Lightness adjustment (-100% to 100%). Default: `10%`

### Returns

`Color`: Adjusted color.

### Example

```css
background: --lighten(blue, 20%);
/* Output: background: oklch(0.652 0.24 264.052); (lighter blue) */
```

---

## `--darken()` [↗︎](../index.css#L146)

Darkens a color by reducing lightness.
Uses OKLCH color space for perceptually uniform lightness adjustment. Unlike `--shade()` which mixes with black, this directly reduces the lightness value.

### Parameters

- **`--color`** (`Color`): The base color.
- **`--amount`** (`Number`): Lightness reduction (0-100%). Default: `10%`

### Returns

`Color`: Darkened color.

### Example

```css
background: --darken(blue, 20%);
/* Output: background: oklch(0.252 0.24 264.052); (darker blue) */
```

---

## `--rotate-hue()` [↗︎](../index.css#L160)

Rotates the hue of a color.
Uses OKLCH color space for perceptually uniform hue rotation.

### Parameters

- **`--color`** (`Color`): The base color.
- **`--degrees`** (`Angle`): Degrees to rotate hue. Default: `30deg`

### Returns

`Color`: Color with rotated hue.

### Example

```css
background: --rotate-hue(blue, 180deg);
/* Output: background: oklch(0.452 0.24 84.052); (yellow-green) */
```

---

## `--complement()` [↗︎](../index.css#L173)

Returns the complementary color.
Uses OKLCH color space for perceptually accurate complementary colors.

### Parameters

- **`--color`** (`Color`): The base color.

### Returns

`Color`: Complementary color.

### Example

```css
border-color: --complement(blue);
/* Output: border-color: oklch(0.452 0.24 84.052); (yellow-orange complement) */
```

---

## `--invert()` [↗︎](../index.css#L184)

Inverts a color.

### Parameters

- **`--color`** (`Color`): The color to invert.

### Returns

`Color`: Inverted color.

### Example

```css
background: --invert(white);
/* Output: background: rgb(0 0 0); (black) */
```

---

## `--grayscale()` [↗︎](../index.css#L197)

Converts a color to grayscale.
Uses OKLCH color space by setting chroma to 0.

### Parameters

- **`--color`** (`Color`): The color to convert.

### Returns

`Color`: Grayscale color.

### Example

```css
filter: --grayscale(var(--brand-color));
/* Output: filter: oklch(0.452 0 264.052); (gray with same lightness) */
```

---

## `--text-on()` [↗︎](../index.css#L211)

Returns black or white text color for optimal contrast on a background.

### Parameters

- **`--bg`** (`Color`): Background color.

### Returns

`Color`: Black or white for optimal readability.

### Example

```css
color: --text-on(var(--bg-color));
/* Output: color: black; (or white, depending on background lightness) */
```

---

## `--opaque()` [↗︎](../index.css#L222)

Removes transparency from a color, making it fully opaque.

### Parameters

- **`--color`** (`Color`): Color with alpha channel.

### Returns

`Color`: Fully opaque version of the color.

### Example

```css
background: --opaque(var(--semi-transparent-bg));
/* Output: background: rgb(0 0 255); (removes alpha channel) */
```

---

## `--mix()` [↗︎](../index.css#L237)

Mixes two colors in OKLab color space.
Uses perceptually uniform OKLab color space for natural-looking color mixing.

### Parameters

- **`--color1`** (`Color`): First color.
- **`--color2`** (`Color`): Second color.
- **`--amount`** (`Number`): Amount of second color to mix (0-100%). Default: `50%`

### Returns

`Color`: Mixed color.

### Example

```css
background: --mix(red, blue, 30%);
/* Output: background: oklab(0.537 0.126 -0.058); (reddish-purple) */
```

---

## `--triadic()` [↗︎](../index.css#L251)

Returns a triadic color harmony.
Triadic colors are evenly spaced around the color wheel (120° apart).

### Parameters

- **`--color`** (`Color`): Base color.
- **`--index`** (`Number`): Which triadic color (1 or 2). Default: `1`

### Returns

`Color`: Triadic color.

### Example

```css
color: --triadic(blue, 1);
/* Output: color: oklch(0.452 0.24 144.052); (120° rotation, green) */
```

---

## `--tetradic()` [↗︎](../index.css#L265)

Returns a tetradic (square) color harmony.
Tetradic colors are evenly spaced around the color wheel (90° apart).

### Parameters

- **`--color`** (`Color`): Base color.
- **`--index`** (`Number`): Which tetradic color (1, 2, or 3). Default: `1`

### Returns

`Color`: Tetradic color.

### Example

```css
color: --tetradic(blue, 2);
/* Output: color: oklch(0.452 0.24 174.052); (180° rotation, yellow-orange) */
```

---

## `--black()` [↗︎](../index.css#L276)

Creates a semi-transparent black.

### Parameters

- **`--opacity`** (`Number`): Opacity value (0-100% or 0-1). Default: `50%`

### Returns

`Color`: Semi-transparent black.

### Example

```css
box-shadow: 0 2px 4px --black(20%);
/* Output: box-shadow: 0 2px 4px rgb(0 0 0 / 0.2); */
```

---

## `--white()` [↗︎](../index.css#L287)

Creates a semi-transparent white.

### Parameters

- **`--opacity`** (`Number`): Opacity value (0-100% or 0-1). Default: `50%`

### Returns

`Color`: Semi-transparent white.

### Example

```css
background: --white(90%);
/* Output: background: rgb(255 255 255 / 0.9); */
```

---

## `--fluid-type()` [↗︎](../index.css#L307)

Creates fluid typography that scales with viewport.
NOTE: This function is mathematically equivalent to `--responsive-value()` but optimized for typography. Use this for `font-size`, `--responsive-value()` for other properties.

### Parameters

- **`--min`** (`Length`): Minimum font size.
- **`--max`** (`Length`): Maximum font size.
- **`--min-viewport`** (`Length`): Minimum viewport width. Default: `320px`
- **`--max-viewport`** (`Length`): Maximum viewport width. Default: `1280px`

### Returns

`Length`: Fluid font size.

### Example

```css
font-size: --fluid-type(16px, 24px, 320px, 1280px);
/* Output: Scales from 16px at 320px viewport to 24px at 1280px viewport */
```

---

## `--modular-scale()` [↗︎](../index.css#L322)

Creates a modular scale value.

### Parameters

- **`--base`** (`Number`): Base size. Default: `1rem`
- **`--ratio`** (`Number`): Scale ratio. Default: `1.25`
- **`--step`** (`Number`): Step in the scale. Default: `0`

### Returns

`Length`: Scaled value.

### Example

```css
font-size: --modular-scale(1rem, 1.25, 3);
/* Output: font-size: 1.953rem; (1rem × 1.25³) */
```

---

## `--line-height-length()` [↗︎](../index.css#L336)

Calculates line height as a length value based on font size.
Returns a length (e.g., 24px) rather than a unitless ratio. Use this when you need an absolute line height value.

### Parameters

- **`--font-size`** (`Length`): The font size.
- **`--multiplier`** (`Number`): Line height multiplier. Default: `1.5`

### Returns

`Length`: Line height as a length.

### Example

```css
line-height: --line-height-length(16px, 1.6);
/* Output: line-height: 25.6px; */
```

---

## `--line-height-ratio()` [↗︎](../index.css#L350)

Calculates line height as a unitless ratio.
Returns a number (e.g., 1.5) which is recommended for better inheritance in CSS.

### Parameters

- **`--line-height`** (`Length`): The desired line height as a length.
- **`--font-size`** (`Length`): The font size.

### Returns

`Number`: Unitless line height ratio.

### Example

```css
line-height: --line-height-ratio(24px, 16px);
/* Output: line-height: 1.5; */
```

---

## `--line-height-unitless()` [↗︎](../index.css#L364)

Creates unitless line height from font size (recommended for better inheritance).
NOTE: Only works correctly with pixel font sizes. For rem/em values, use `--line-height-length()` or `--line-height-ratio()` instead.

### Parameters

- **`--font-size`** (`Length`): Font size in pixels. Default: `16px`
- **`--multiplier`** (`Number`): Line height multiplier. Default: `1.5`

### Returns

`Number`: Unitless line height.

### Example

```css
line-height: --line-height-unitless(16px, 1.5);
/* Output: line-height: 1.5; */
```

---

## `--sidebar-layout()` [↗︎](../index.css#L380)

Creates responsive sidebar layout columns.

### Parameters

- **`--sidebar-width`** (`Length`): Width of sidebar. Default: `20ch`
- **`--content-min`** (`Length`): Minimum width of content area. Default: `20ch`

### Returns

`Length`: Grid template columns value.

### Example

```css
grid-template-columns: --sidebar-layout(250px, 20ch);
/* Output: grid-template-columns: 250px 1fr; (or stacks when content < 20ch) */
```

---

## `--conditional-radius()` [↗︎](../index.css#L392)

Conditional border radius that removes at viewport edges.

### Parameters

- **`--radius`** (`Length`): Border radius value.
- **`--edge-dist`** (`Length`): Distance from viewport edge. Default: `4px`

### Returns

`Length`: Computed border radius.

### Example

```css
border-radius: --conditional-radius(1rem, 8px);
/* Output: border-radius: 1rem; (0 when within 8px of viewport edge) */
```

---

## `--responsive-value()` [↗︎](../index.css#L409)

Creates a responsive value that scales between two sizes.
NOTE: This function is mathematically equivalent to `--fluid-type()` but uses a simpler lerp-based approach. Use this for spacing/sizing, `--fluid-type()` for typography.

### Parameters

- **`--small`** (`Length`): Minimum value.
- **`--large`** (`Length`): Maximum value.
- **`--viewport-min`** (`Length`): Minimum viewport width. Default: `320px`
- **`--viewport-max`** (`Length`): Maximum viewport width. Default: `1200px`

### Returns

`Length`: Responsive value.

### Example

```css
padding: --responsive-value(1rem, 2rem, 320px, 1200px);
/* Output: Scales from 1rem at 320px viewport to 2rem at 1200px viewport */
```

---

## `--aspect-height()` [↗︎](../index.css#L424)

Calculates height from aspect ratio and maximum constraints.

### Parameters

- **`--ratio`** (`Number`): Aspect ratio (e.g., 16/9). Default: `1`
- **`--max-width`** (`Length`): Maximum width. Default: `100%`
- **`--max-height`** (`Length`): Maximum height. Default: `100%`

### Returns

`Length`: Computed height.

### Example

```css
height: --aspect-height(16/9, 100vw, 100vh);
/* Output: height: 56.25vw; (maintains 16:9 ratio within constraints) */
```

---

## `--aspect-width()` [↗︎](../index.css#L438)

Calculates width from aspect ratio and maximum constraints.

### Parameters

- **`--ratio`** (`Number`): Aspect ratio (e.g., 16/9). Default: `1`
- **`--max-height`** (`Length`): Maximum height. Default: `100%`
- **`--max-width`** (`Length`): Maximum width. Default: `100%`

### Returns

`Length`: Computed width.

### Example

```css
width: --aspect-width(16/9, 100vh, 100vw);
/* Output: width: 177.78vh; (maintains 16:9 ratio within constraints) */
```

---

## `--spacing()` [↗︎](../index.css#L457)

Creates consistent spacing based on a scale.
Recommended range: 0-10. Higher values create exponentially larger spacing.

### Parameters

- **`--level`** (`Number`): Spacing level (0-10). Default: `1`
- **`--base`** (`Length`): Base spacing unit. Default: `0.25rem`

### Returns

`Length`: Computed spacing.

### Example

```css
margin: --spacing(3);
/* Output: margin: 0.75rem; (0.25rem × 3) */
```

---

## `--container-padding()` [↗︎](../index.css#L469)

Creates inset spacing for containers.

### Parameters

- **`--padding`** (`Length`): Base padding. Default: `1rem`
- **`--max-width`** (`Length`): Maximum container width. Default: `1200px`

### Returns

`Length`: Responsive padding.

### Example

```css
padding: --container-padding(2rem, 1200px);
/* Output: padding: calc((100% - 1200px) / 2 + 2rem); (responsive padding) */
```

---

## `--ease-out()` [↗︎](../index.css#L486)

Creates a simple easing curve value.

### Parameters

- **`--progress`** (`Number`): Animation progress (0-1).

### Returns

`Number`: Eased value.

### Example

```css
transform: translateY(--ease-out(var(--progress)));
/* Output: Eased value between 0 and 1 with ease-out timing */
```

---

## `--elastic-ease()` [↗︎](../index.css#L499)

Creates elastic easing.

### Parameters

- **`--progress`** (`Number`): Animation progress (0-1).
- **`--amplitude`** (`Number`): Amplitude of elasticity. Default: `1`

### Returns

`Number`: Eased value.

### Example

```css
transform: scale(--elastic-ease(var(--progress), 1.2));
/* Output: Eased value with elastic bounce effect */
```

---

## `--px-to-rem()` [↗︎](../index.css#L516)

Converts pixels to rem.

### Parameters

- **`--pixels`** (`Length`): Pixel value.
- **`--base`** (`Length`): Base font size. Default: `16px`

### Returns

`Length`: Rem value.

### Example

```css
font-size: --px-to-rem(24px);
/* Output: font-size: 1.5rem; (assuming 16px base) */
```

---

## `--rem-to-px()` [↗︎](../index.css#L528)

Converts rem to pixels.

### Parameters

- **`--rems`** (`Length`): Rem value.
- **`--base`** (`Length`): Base font size. Default: `16px`

### Returns

`Length`: Pixel value.

### Example

```css
width: --rem-to-px(2rem);
/* Output: width: 32px; (assuming 16px base) */
```

---

## `--auto-grid()` [↗︎](../index.css#L544)

Creates responsive grid columns.

### Parameters

- **`--min-width`** (`Number`): Minimum column width. Default: `250px`
- **`--max-cols`** (`Number`): Maximum number of columns. Default: `4`

### Returns

`Grid`: Grid template columns value.

### Example

```css
grid-template-columns: --auto-grid(250px, 4);
/* Output: grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); */
```

---

## `--grid-span()` [↗︎](../index.css#L561)

Creates a CSS grid span value.
Ensures the span is an integer value.

### Parameters

- **`--columns`** (`Number`): Number of columns to span. Default: `1`
- **`--total`** (`Number`): Total columns in grid. Default: `12`

### Returns

`Span`: Grid column span (rounded to integer).

### Example

```css
grid-column: --grid-span(3, 12);
/* Output: grid-column: span 3; */
```

---

## `--smooth-shadow()` [↗︎](../index.css#L580)

Creates a smooth shadow.
Generates three shadow layers. The spread-factor controls how distributed the shadows are.

### Parameters

- **`--color`** (`Color`): Shadow color. Default: `rgb(0 0 0 / 0.2)`
- **`--size`** (`Length`): Shadow size. Default: `12px`
- **`--spread-factor`** (`Number`): Controls shadow distribution (higher = tighter shadows). Default: `3`

### Returns

`Shadow`: Layered box shadow.

### Example

```css
box-shadow: --smooth-shadow(black, 20px, 3);
/* Output: Multi-layered shadow with smooth depth effect */
```

---

## `--glow()` [↗︎](../index.css#L597)

Creates a glow effect.

### Parameters

- **`--color`** (`Color`): Glow color. Default: `white`
- **`--size`** (`Length`): Glow size. Default: `10px`
- **`--intensity`** (`Number`): Glow intensity (0-1). Default: `0.5`

### Returns

`Shadow`: Glow shadow.

### Example

```css
box-shadow: --glow(cyan, 10px, 0.5);
/* Output: box-shadow: 0 0 10px rgb(0 255 255 / 0.5); */
```

---

## `--light-dark()` [↗︎](../index.css#L621)

Theme-aware value switcher for light/dark mode.
Uses CSS `if()` with color-scheme query. Requires `color-scheme: light dark` on `:root`.
Works with ANY value type (colors, lengths, etc.), not just colors.
> [!NOTE]
> CSS has a native [`light-dark()`](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/light-dark) function for colors. The custom `--light-dark()` function is more powerful as it works with any value type, not just colors.

### Parameters

- **`--light`** (`Any`): Value for light mode.
- **`--dark`** (`Any`): Value for dark mode.

### Returns

`Any`: Theme-appropriate value.

### Example

```css
padding: --light-dark(0.75rem, 1rem);
/* Output: padding: 0.75rem; (in light mode) or padding: 1rem; (in dark mode) */
```

---

## `--theme-color()` [↗︎](../index.css#L639)

Creates a theme-aware color with automatic adjustment.
Uses CSS `if()` with color-scheme query. Requires `color-scheme: light dark` on `:root`.
In light mode, mixes the base color with white (default 85% white).
In dark mode, mixes the base color with black (default 15% black).

### Parameters

- **`--base`** (`Color`): Base color.
- **`--light-mix`** (`Number`): Percentage of white to mix in light mode. Default: `85%`
- **`--dark-mix`** (`Number`): Percentage of black to mix in dark mode. Default: `15%`

### Returns

`Color`: Theme-adjusted color.

### Example

```css
background: --theme-color(blue, 80%, 20%);
/* Output: Lighter blue in light mode, darker blue in dark mode */
```

---

