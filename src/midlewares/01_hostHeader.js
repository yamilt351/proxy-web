function hostHeader(req, res, next) {
  // Obtiene el nombre de host del encabezado "Host" de la solicitud
  const hostHeader = req.headers.host;
  // Establece el encabezado "Host" en la solicitud al nombre de host obtenido anteriormente
  req.headers.host = hostHeader;
  console.log(hostHeader);
  next();
}
export default hostHeader;
