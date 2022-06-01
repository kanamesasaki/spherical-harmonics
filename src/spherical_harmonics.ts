export function sphericalHarmonics(l:number ,m:number ,theta:number, phi:number) :number {
	// check parameters
	if (!Number.isInteger(l) || l < 0) {
		throw Error("l shall be a positive integer")
	}
	if (!Number.isInteger(m)) {
		throw Error("m shall be an integer")
	}
	if (Math.abs(m) > l && m > 0) {
		m = l
	}
	if (Math.abs(m) > l && m < 0) {
		m = -l
	}
	let coeff:number = (-1)**((m+Math.abs(m))/2) * Math.sqrt((2*l+1)/(4*Math.PI)*factorial(l-Math.abs(m))/factorial(l+Math.abs(m)))
	let elevation:number = associatedLegendre(l ,Math.abs(m) ,Math.cos(theta))
	let azimuth:number
	if (m === 0) {
		azimuth = 1.0
	}
	else if(m > 0) {
		azimuth = Math.sqrt(2) * Math.cos(m*phi)
	}
	else {
		azimuth = Math.sqrt(2) * Math.sin(m*phi)
	}
	console.log(l,m,coeff,elevation,azimuth,coeff*elevation*azimuth)
	return coeff*elevation*azimuth
}

export function associatedLegendre(l:number ,m:number ,t:number): number {
	// check parameters
	if (!Number.isInteger(l) || l < 0) {
		throw Error("l shall be a positive integer")
	}
	if (!Number.isInteger(m)) {
		throw Error("m shall be an integer")
	}
	if (Math.abs(m) > l) {
		throw Error ("|m| shall be equal or smaller than l")
	}

	let val = 0.0
	let n: number = Math.floor((l-m)/2)
	if (l === 0) {
		val = 1.0
	}
	else {
		for (let j=0; j<=n; j++) {
			val += (-1)**j * factorial(2*l-2*j) / (factorial(j) * factorial(l-j) * factorial(l-2*j-m)) * t**(l-2*j-m)
		}
		val *= 1/(2**l) * (1-t*t)**(m/2)
	}
	return val
}

export function factorial(num:number) : number {
	if (!Number.isInteger(num) || num < 0) {
		throw Error("num shall be a positive integer")
	}
	if (num === 0) {return 1}
	return num * factorial(num-1)
}
