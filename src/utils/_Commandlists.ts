import { Command } from "../interfaces/Command";
import { ping } from "../commands/ping";
import { refreshroles } from "../commands/refreshroles";

export const CommandList: Command[] = [ping, refreshroles];
