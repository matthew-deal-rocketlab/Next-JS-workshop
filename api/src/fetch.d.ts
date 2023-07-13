// This file is only required because @types/node does not yet support the nodejs built-in fetch available since v17

declare function fetch(url: string, options: object);
