import { Util } from '@dra2020/baseclient';
import { Memsqs } from '@dra2020/baseserver';

const Port: number = Number(process.env.PORT) || 14141;
const Interval: number = Number(process.env.SQS_REPORTING_INTERVAL) || (1000 * 60 * 60);
let server = new Memsqs.SQSServer(Port);
console.log('======================');
console.log('======================');
console.log(`SQS Server listening on port ${Port}`);

reportStats();
setInterval(reportStats, Interval);

function fmt(n: number): string
{
  let s = String(n);
  let rgx = /(\d+)(\d{3})/;
  while (rgx.test(s))
    s = s.replace(rgx, '$1' + ',' + '$2');
  return s;
}

function reportStats(): void
{
  if (! server.running)
  {
    console.log('Server not running. Exiting');
    process.exit(1);
  }

  let qm = server.queuemanager;
  let mem: any = process.memoryUsage();
  console.log('-------------------------');
  console.log(Util.Now());
  console.log(`INFO: ${qm.nSent} messages sent`);
  console.log(`INFO: ${qm.nReceived} messages received`);
  console.log(`INFO: ${qm.nRemoved} messages removed`);
  console.log(`INFO: ${qm.nCulled} messages culled`);
  if (mem && mem.rss)
    console.log(`INFO: rss memory: ${fmt(mem.rss)}`);
  qm.dumpLog();
}
