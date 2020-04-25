import os from 'os';
import winston from 'winston';
import LogdnaWinston from 'logdna-winston';

const {
  combine, timestamp, label, prettyPrint
} = winston.format;

const ifaces = os.networkInterfaces();
let ipname, macname;

// Looping through network interfaces to get Mac and Ip address.
Object.keys(ifaces).forEach((ifname) => {
  let alias = 0;
  ifaces[ifname].forEach((iface) => {
    if (iface.family !== 'IPv4' || iface.internal !== false) {
      return;
    }
    if (alias >= 1) {
      ipname = iface.address;
      macname = iface.mac;
    } else {
      ipname = iface.address;
      macname = iface.mac;
    }
    alias += 1;
  });
});

// Setting up options required by Winston.
const options = {
  fileHttp: {
    level: 'http',
    filename: 'server/logs/http.logs',
    colorize: false,
    format: combine(
      label({ label: 'Http' }),
    ),
  },
  fileInfo: {
    level: 'info',
    filename: 'server/logs/info.logs',
    colorize: false,
    format: combine(
      label({ label: 'Info' }),
    ),
  },
  fileErr: {
    level: 'error',
    filename: 'server/logs/error.logs',
    colorize: false,
    format: combine(
      label({ label: 'Error' }),
    )
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
  logdna: {
    key: '006e982ec80199d38816b7405e8f9cb2',
    hostname: os.hostname(),
    ip: ipname,
    mac: macname,
    app: 'barefoot-nomad',
    handleExceptions: true,
    index_meta: true
  }
};

// Initialising a Winston object.
const logger = winston.createLogger({
  colorize: false,
  handleExceptions: true,
  maxsize: 5242880,
  format: combine(
    timestamp(),
    prettyPrint()
  ),
  transports: [
    new winston.transports.File(options.fileHttp),
    new winston.transports.File(options.fileInfo),
    new winston.transports.File(options.fileErr),
    new LogdnaWinston(options.logdna)
  ],
  exitOnError: false
});

// Ignore logging in Production.
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console(options.console));
}

export default logger;
