varying vec3 normal;

void main()
{

	normal = gl_NormalMatrix;
	gl_Position = ftransform();

}
