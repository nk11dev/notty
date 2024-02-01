import colors from 'ansi-colors';

import app from '@/server/app';

const PORT = process.env.PORT || process.env.PORT_SERVER;

const listener = app.listen(PORT, function () {
  console.log(colors.magenta('\n--- Express app started111'), listener.address(), '\n');
});