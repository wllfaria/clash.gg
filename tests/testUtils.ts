export function getRgbValues(stringColor: string) {
	const [r, g, b] = stringColor.replace('rgb(', '').replace(')', '').replace(' ', '').replace(' ', '').split(',')
	return [+r, +g, +b]
}

export function componentToHex(colorValue: number) {
	return colorValue.toString(16).padStart(2, '0')
}

export function rgbToHex([r, g, b]: number[]) {
	return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`
}
