import { factorial } from "../src/spherical_harmonics"
import { associatedLegendre } from "../src/spherical_harmonics"
import { sphericalHarmonics } from "../src/spherical_harmonics"

test("factorial 0!", () => {
  expect(factorial(0)).toBe(1)
})

test("factorial 1!", () => {
  expect(factorial(1)).toBe(1)
})

test("factorial 10!", () => {
  expect(factorial(10)).toBe(3628800)
})

test("associatedLegendre_0^0", () => {
  // P_0^0(t) = 1
  expect(associatedLegendre(0,0,0)).toBe(1)
  expect(associatedLegendre(0,0,1)).toBe(1)
  expect(associatedLegendre(0,0,-1)).toBe(1)
})

test("associatedLegendre_1^0", () => {
  // P_1^0(t) = t
  expect(associatedLegendre(1,0,0)).toBe(0)
  expect(associatedLegendre(1,0,1)).toBe(1)
  expect(associatedLegendre(1,0,-1)).toBe(-1)
  expect(associatedLegendre(1,0,2)).toBe(2)
  expect(associatedLegendre(1,0,-2)).toBe(-2)
})

test("associatedLegendre_2^0", () => {
  // P_1^0(t) = 1/2*(3*t**2-1)
  expect(associatedLegendre(2,0,0)).toBe(1/2*(3*0**2-1))
  expect(associatedLegendre(2,0,1)).toBe(1/2*(3*1**2-1))
  expect(associatedLegendre(2,0,-1)).toBe(1/2*(3*(-1)**2-1))
  expect(associatedLegendre(2,0,2)).toBe(1/2*(3*2**2-1))
  expect(associatedLegendre(2,0,-2)).toBe(1/2*(3*(-2)**2-1))
})

test("associatedLegendre_3^0", () => {
  // P_1^0(t) = 1/2*(5*t**3-3*t)
  expect(associatedLegendre(3,0,0)).toBe(1/2*(5*(0)**3-3*(0)))
  expect(associatedLegendre(3,0,1)).toBe(1/2*(5*(1)**3-3*(1)))
  expect(associatedLegendre(3,0,-1)).toBe(1/2*(5*(-1)**3-3*(-1)))
  expect(associatedLegendre(3,0,2)).toBe(1/2*(5*(2)**3-3*(2)))
  expect(associatedLegendre(3,0,-2)).toBe(1/2*(5*(-2)**3-3*(-2)))
})

test("sphericalHarmonics_0^0", () => {
  // Y_0^0(t) = 1/Math.sqrt(4*Math.PI)
  expect(sphericalHarmonics(0,0,0,0)).toBe(1/Math.sqrt(4*Math.PI))
  expect(sphericalHarmonics(0,0,45/180*Math.PI,45/180*Math.PI)).toBe(1/Math.sqrt(4*Math.PI))
})

test("sphericalHarmonics_1^0", () => {
  // Y_1^0(t) = Math.sqrt(3/(4*Math.PI)*Math.cos(theta)
  let theta:number 
  theta = 0
  expect(sphericalHarmonics(1,0,theta,0)).toBe(Math.sqrt(3/(4*Math.PI))*Math.cos(theta))
  theta = 30/180*Math.PI
  expect(sphericalHarmonics(1,0,theta,0)).toBe(Math.sqrt(3/(4*Math.PI))*Math.cos(theta))
  theta = -30/180*Math.PI
  expect(sphericalHarmonics(1,0,theta,0)).toBe(Math.sqrt(3/(4*Math.PI))*Math.cos(theta))
})

test("sphericalHarmonics_2^0", () => {
  // Y_2^0(t) = Math.sqrt(5/(16*Math.PI))*(3*Math.cos(theta)**2-1)
  let theta:number
  theta = 0
  expect(sphericalHarmonics(2,0,theta,0)).toBe(Math.sqrt(5/(16*Math.PI))*(3*Math.cos(theta)**2-1))
  console.log(Math.sqrt(5/(16*Math.PI))*(3*Math.cos(theta)**2-1))
  theta = 30/180*Math.PI
  expect(sphericalHarmonics(2,0,theta,0)).toBe(Math.sqrt(5/(16*Math.PI))*(3*Math.cos(theta)**2-1))
  console.log(Math.sqrt(5/(16*Math.PI))*(3*Math.cos(theta)**2-1))
  theta = -30/180*Math.PI
  expect(sphericalHarmonics(2,0,theta,0)).toBe(Math.sqrt(5/(16*Math.PI))*(3*Math.cos(theta)**2-1))
  console.log(Math.sqrt(5/(16*Math.PI))*(3*Math.cos(theta)**2-1))
})

test("sphericalHarmonics_3^0", () => {
  // Y_3^0(t) = Math.sqrt(7/(16*Math.PI))*(5*Math.cos(theta)**3-3*Math.cos(theta))
  let theta:number
  theta = 0
  expect(sphericalHarmonics(3,0,theta,0)).toBe(Math.sqrt(7/(16*Math.PI))*(5*Math.cos(theta)**3-3*Math.cos(theta)))
  console.log(Math.sqrt(7/(16*Math.PI))*(5*Math.cos(theta)**3-3*Math.cos(theta)))
  theta = 30/180*Math.PI
  expect(sphericalHarmonics(3,0,theta,0)).toBe(Math.sqrt(7/(16*Math.PI))*(5*Math.cos(theta)**3-3*Math.cos(theta)))
  console.log(Math.sqrt(7/(16*Math.PI))*(5*Math.cos(theta)**3-3*Math.cos(theta)))
  theta = -30/180*Math.PI
  expect(sphericalHarmonics(3,0,theta,0)).toBe(Math.sqrt(7/(16*Math.PI))*(5*Math.cos(theta)**3-3*Math.cos(theta)))
  console.log(Math.sqrt(7/(16*Math.PI))*(5*Math.cos(theta)**3-3*Math.cos(theta)))
})