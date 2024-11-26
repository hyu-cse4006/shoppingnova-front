uniform vec3 uColor;
uniform sampler2D uTexture;
varying vec3 vColor;

in vec2 vUv;          // Vertex Shader에서 전달된 UV 좌표
in vec3 vPosition;    // Vertex Shader에서 전달된 Vertex Position

out vec4 fragColor;   // GLSL3의 출력 변수

void main() {
  // 텍스처 샘플링 및 색상 계산
  vec4 texColor = texture(uTexture, vUv);
  // vec3 finalColor = uColor * texColor.rgb;

  fragColor = vec4(vColor, texColor.r);
}