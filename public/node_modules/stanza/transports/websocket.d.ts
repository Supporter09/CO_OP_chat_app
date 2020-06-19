import { Duplex } from 'readable-stream';
import { Agent, Transport, TransportConfig } from '../';
import StreamManagement from '../helpers/StreamManagement';
import { Registry } from '../jxt';
import { Stream } from '../protocol';
export default class WSConnection extends Duplex implements Transport {
    hasStream?: boolean;
    stream?: Stream;
    private client;
    private config;
    private sm;
    private stanzas;
    private closing;
    private parser?;
    private socket?;
    constructor(client: Agent, sm: StreamManagement, stanzas: Registry);
    _read(): void;
    _write(chunk: any, encoding: any, done: (err?: Error) => void): void;
    connect(opts: TransportConfig): void;
    disconnect(): void;
    send(dataOrName: string, data?: object): Promise<void>;
    restart(): void;
    private startHeader;
    private closeHeader;
}
