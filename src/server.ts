import { SimpleSQS } from '@dra2020/baseserver';

const Port: number = Number(process.env.PORT) || Number(process.env.SQSSERVER_PORT);
let server = new SimpleSQS.SimpleSQSServer(Port);
console.log('======================');
console.log('======================');
console.log(`Simple SQS Server listening on port ${Port}`);
