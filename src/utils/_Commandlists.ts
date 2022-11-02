import { Command } from "../interfaces/Command";
import { ping } from "../commands/ping";
import { purgeMemberRoles } from "../commands/purgeMemberRoles";

export const CommandList: Command[] = [ping, purgeMemberRoles];
