import logging
import sys

def configure_logger(app, custom_logger):
    logger = logging.getLogger(custom_logger)
    logger.setLevel(logging.DEBUG)  # Set the logging level (DEBUG, INFO, WARNING, ERROR, CRITICAL)
    formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')

    console_handler = logging.StreamHandler()
    console_handler.setLevel(logging.INFO)
    console_handler.setFormatter(formatter)
    
    logger.addHandler(console_handler)

    app.logger = logger

def eprint(*args, **kwargs):
    print(*args, file=sys.stderr, **kwargs)
