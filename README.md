# memsqs-server
Server for running in-memory simple queue service.

This program simply starts an SQSServer object listening on the port specified by the SQS_PORT environment variable (or 14141).

It reports metrics every SQS_REPORTING_INTERVAL milliseconds (default 30000).
