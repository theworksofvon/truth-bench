export type ModelAdapter = (messages: Message[]) => Promise<string>;

import type { Message } from "./execution";
