export function Log(stack, level, pkg, message) {
  const logPayload = {
    stack,
    level,
    package: pkg,
    message
  };

  fetch('http://20.244.56.144/evaluation-service/logs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(logPayload)
  }).catch(err => {
    console.warn('Logging failed:', err);
  });
}
