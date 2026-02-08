import morgan from "morgan";

function requestLogger() {
  const logger = morgan(
    ":method :url :status :res[content-length] - :response-time ms",
  );
  //   const logger = morgan("combined");
  //   const logger = morgan("tiny");
  return logger;
}
export default requestLogger;
