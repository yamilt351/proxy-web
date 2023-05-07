function HeaderXForwardedFor(req, res, next) {
  const xForwardedFor = req.headers['x-forwarded-for'];
  const clientIp = req.ip;
  console.log(clientIp);
  // Si no hay encabezado "X-Forwarded-For", agrega la dirección IP del cliente
  if (!xForwardedFor) {
    console.log('xForwardedFor false');
    req.headers['x-forwarded-for'] = clientIp;
  } else {
    console.log('xForwardedFor true');
    // Si ya hay un encabezado "X-Forwarded-For", agrega la dirección IP del cliente al final
    req.headers['x-forwarded-for'] = `${xForwardedFor}, ${clientIp}`;
  }

  next();
}
export default HeaderXForwardedFor;
