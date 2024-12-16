export const PARTICLE_CONFIG = {
  particleCount: Math.pow(2, 16),
  attractorCount: 3,
  attractorMass: 5e7,
  particleMass: 5e4,
  maxSpeed: 12,
  spinningStrength: 3.5,
  boundSize: 10,
  particleSize: 0.2, // Adjusted for better logo visibility
  damping: 0.992,
  colors: {
    start: '#00ffff',
    end: '#0000ff'
  }
};